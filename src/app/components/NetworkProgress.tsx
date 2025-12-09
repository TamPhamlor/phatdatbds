'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type ProgressState = {
  /** 0..100 (đã clamp & floor) */
  percent: number
  /** còn request đang pending không (sau khi đã lọc) */
  active: boolean
}

const NetworkProgressContext = createContext<ProgressState>({
  percent: 0,
  active: false,
})

export function useNetworkProgress(): ProgressState {
  return useContext(NetworkProgressContext)
}

/** Các URL/publisher nên bỏ qua (prefetch, assets, analytics, v.v.) */
const IGNORE_PATTERNS: RegExp[] = [
  /^\/_next\//,
  /^\/favicon\./,
  /^\/fonts?\//,
  /^\/images?\//,
  /^\/img\//,
  /^https?:\/\/(www\.)?googletagmanager\.com/i,
  /^https?:\/\/(www\.)?google-analytics\.com/i,
  /sentry|segment|amplitude|mixpanel|hotjar|plausible|vercel-insights/i,
]

/** Loại content-type nên bỏ qua */
const IGNORE_CONTENT_TYPES = [
  'image/',
  'font/',
  'video/',
  'audio/',
  'text/css',
  'text/javascript',
  'application/javascript',
]

/** Kiểm tra có nên track request không */
function shouldTrack(input: RequestInfo | URL): boolean {
  try {
    let urlStr: string | null = null
    if (typeof input === 'string') urlStr = new URL(input, window.location.origin).toString()
    else if (input instanceof URL) urlStr = input.toString()
    else if (typeof Request !== 'undefined' && input instanceof Request)
      urlStr = new URL(input.url, window.location.origin).toString()

    if (!urlStr) return true
    const url = new URL(urlStr)
    const pathOrFull = url.origin === window.location.origin ? url.pathname : urlStr
    return !IGNORE_PATTERNS.some((re) => re.test(pathOrFull))
  } catch {
    return true
  }
}

export const NetworkProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [percent, setPercent] = useState(0)
  const [active, setActive] = useState(false)

  // Bộ đếm request đang pending (đÃ lọc)
  const pendingCountRef = useRef(0)

  // Tổng/đã nhận bytes cho các request có Content-Length
  const totalBytesRef = useRef(0)
  const loadedBytesRef = useRef(0)

  // Nhịp mạng gần nhất (watchdog)
  const lastBeatRef = useRef<number>(0)

  const bumpActive = useCallback((delta: number) => {
    pendingCountRef.current = Math.max(0, pendingCountRef.current + delta)
    setActive(pendingCountRef.current > 0)
    lastBeatRef.current = Date.now()
  }, [])

  const recalcPercent = useCallback(() => {
    const total = totalBytesRef.current
    const loaded = loadedBytesRef.current
    if (total > 0) {
      const p = Math.min(98, Math.max(2, Math.floor((loaded / total) * 100)))
      setPercent(p)
    } else {
      setPercent((prev) => {
        if (pendingCountRef.current === 0) return prev
        const next = prev + Math.max(1, (80 - prev) * 0.12)
        return Math.min(80, Math.floor(next))
      })
    }
    lastBeatRef.current = Date.now()
  }, [])

  const hardReset = useCallback(() => {
    pendingCountRef.current = 0
    totalBytesRef.current = 0
    loadedBytesRef.current = 0
    setPercent(0)
    setActive(false)
    lastBeatRef.current = Date.now()
  }, [])

  const finishAllSoon = useCallback(() => {
    setPercent(100)
    window.setTimeout(() => {
      hardReset()
    }, 300)
  }, [hardReset])

  // Watchdog: nếu >1500ms không có “nhịp” & vẫn active ⇒ ép hoàn tất
  useEffect(() => {
    const id = window.setInterval(() => {
      const idleMs = Date.now() - (lastBeatRef.current || 0)
      if (pendingCountRef.current > 0 && idleMs > 1500) {
        finishAllSoon()
      }
    }, 500)
    return () => window.clearInterval(id)
  }, [finishAllSoon])

  // Patch fetch
  useEffect(() => {
    if (typeof window === 'undefined' || !window.fetch) return
    const origFetch = window.fetch.bind(window)

    window.fetch = async (...args: Parameters<typeof fetch>): Promise<Response> => {
      const track = shouldTrack(args[0])
      if (track) bumpActive(1)

      const tickId = track ? window.setInterval(recalcPercent, 120) : null

      try {
        const res = await origFetch(...args)

        if (track) {
          const ct = res.headers.get('Content-Type') || ''
          if (IGNORE_CONTENT_TYPES.some((t) => ct.startsWith(t))) {
            return res
          }

          const contentLenHeader = res.headers.get('Content-Length')
          const totalForThis =
            contentLenHeader && !Number.isNaN(Number(contentLenHeader))
              ? Number(contentLenHeader)
              : 0

          if (res.body && totalForThis > 0) {
            const [appStream, progressStream] = res.body.tee()
            const reader = progressStream.getReader()

            totalBytesRef.current += totalForThis
            lastBeatRef.current = Date.now()

            const pump = async (): Promise<void> => {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                if (value) {
                  loadedBytesRef.current += value.byteLength
                  recalcPercent()
                }
              }
            }

            const cloned = new Response(appStream, {
              headers: res.headers,
              status: res.status,
              statusText: res.statusText,
            })

            pump().catch(() => {/* ignore */}).finally(() => {
              recalcPercent()
            })

            return cloned
          }
        }

        return res
      } finally {
        if (tickId !== null) window.clearInterval(tickId)
        if (track) {
          bumpActive(-1)
          if (pendingCountRef.current === 0) finishAllSoon()
        }
      }
    }

    return () => {
      window.fetch = origFetch
    }
  }, [bumpActive, finishAllSoon, recalcPercent])

  // Patch XHR (axios hoặc lib dùng XHR)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const OrigXHR = window.XMLHttpRequest

    class PatchedXHR extends OrigXHR {}
    const open = PatchedXHR.prototype.open

    PatchedXHR.prototype.open = function (
      this: XMLHttpRequest,
      method: string,
      url: string,
      async?: boolean,
      username?: string | null,
      password?: string | null
    ): void {
      const track = shouldTrack(url)
      let tickId: number | null = null

      const onLoadStart = (): void => {
        if (!track) return
        bumpActive(1)
        tickId = window.setInterval(recalcPercent, 120)
      }

      const onLoadEnd = (): void => {
        if (!track) return
        if (tickId !== null) {
          window.clearInterval(tickId)
          tickId = null
        }
        bumpActive(-1)
        if (pendingCountRef.current === 0) finishAllSoon()
      }

      this.addEventListener('loadstart', onLoadStart)
      this.addEventListener('loadend', onLoadEnd)
      this.addEventListener('progress', (evt: ProgressEvent<EventTarget>) => {
        if (!track) return
        if (evt.lengthComputable) {
          totalBytesRef.current += evt.total
          loadedBytesRef.current += evt.loaded
          recalcPercent()
        }
      })

      return open.call(this, method, url, async ?? true, username ?? null, password ?? null)
    }

    window.XMLHttpRequest = PatchedXHR

    return () => {
      window.XMLHttpRequest = OrigXHR
    }
  }, [bumpActive, finishAllSoon, recalcPercent])

  const value = useMemo<ProgressState>(
    () => ({ percent: Math.min(100, Math.max(0, Math.floor(percent))), active }),
    [percent, active]
  )

  return <NetworkProgressContext.Provider value={value}>{children}</NetworkProgressContext.Provider>
}

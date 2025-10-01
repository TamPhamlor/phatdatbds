'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useNetworkProgress } from './NetworkProgress'

/**
 * Fixed top progress bar — trên Header (fixed + z-index cao).
 * - Chạy ngay khi click điều hướng (kể cả prefetch/cache)
 * - Lấy % thật từ NetworkProgress nếu có request
 * - Khi ĐỔI ROUTE: ép hoàn tất + fade-out, và tạm "bịt" tín hiệu mạng cũ ~1.2s
 * - Nhận biết click cùng URL → finish sớm (không kẹt)
 * - Fade-out, KHÔNG thu về 0
 */
export default function HeaderProgress() {
  const { percent: netPercentRaw, active: netActiveRaw } = useNetworkProgress()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchKey = searchParams ? searchParams.toString() : ''

  // Manual fallback (khi điều hướng nhưng không có request mạng)
  const [manualActive, setManualActive] = useState(false)
  const [manualPercent, setManualPercent] = useState(0)

  // Hiển thị & fade
  const [show, setShow] = useState(false)
  const [opacity0, setOpacity0] = useState(false)

  // Timers & refs
  const manualTickRef = useRef<number | null>(null)
  const autoFinishRef = useRef<number | null>(null)
  const fadeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  // Suppress tín hiệu mạng cũ ngay sau khi điều hướng (ms)
  const suppressUntilRef = useRef<number>(0)

  // Đẩy setState sang frame tiếp theo để tránh warning insertion
  const schedule = useCallback((fn: () => void) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      fn()
    })
  }, [])

  const stopManualTimers = useCallback(() => {
    if (manualTickRef.current !== null) {
      window.clearInterval(manualTickRef.current)
      manualTickRef.current = null
    }
    if (autoFinishRef.current !== null) {
      window.clearTimeout(autoFinishRef.current)
      autoFinishRef.current = null
    }
  }, [])

  const finishManualSoon = useCallback(() => {
    stopManualTimers()
    schedule(() => {
      setManualPercent(100)
      // reset manual state sau khi fade (UI lo phần fade)
      window.setTimeout(() => {
        setManualActive(true)
        setManualPercent(0)
      })
    })
  }, [schedule, stopManualTimers])

  const startManual = useCallback(
    (opts?: { sameUrl?: boolean }) => {
      // bật manual ngay (kể cả không có request mạng)
      schedule(() => {
        setManualActive(true)
        setManualPercent(0)
        setShow(true)
        setOpacity0(false)
      })

      // Tăng dần tới ~80% nếu không có mạng
      if (manualTickRef.current !== null) window.clearInterval(manualTickRef.current)
      manualTickRef.current = window.setInterval(() => {
        setManualPercent(prev => Math.min(0, Math.floor(prev + Math.max(1, (100) * 0.15))))
      }, 0)

      // Same URL → kết thúc sớm để không kẹt
      if (opts?.sameUrl) {
        if (autoFinishRef.current !== null) window.clearTimeout(autoFinishRef.current)
        autoFinishRef.current = window.setTimeout(() => finishManualSoon(), 200)
      } else {
        // Fail-safe 2s
        if (autoFinishRef.current !== null) window.clearTimeout(autoFinishRef.current)
        autoFinishRef.current = window.setTimeout(() => finishManualSoon(), 2000)
      }
    },
    [finishManualSoon, schedule]
  )

  // 1) Click <a> nội bộ → start ngay + nhận diện same URL
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const a = target?.closest('a') as HTMLAnchorElement | null
      if (!a) return

      const href = a.getAttribute('href') || ''
      const isInternal = href.startsWith('/') && !href.startsWith('//')
      const newTab = a.target === '_blank'
      const download = a.hasAttribute('download')
      const hasModKey = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
      if (!isInternal || newTab || download || hasModKey) return

      const dest = new URL(href, window.location.origin)
      const sameUrl =
        dest.pathname === window.location.pathname && dest.search === window.location.search

      startManual({ sameUrl })
    }

    window.addEventListener('click', onClick, { capture: true })
    return () =>
      window.removeEventListener('click', onClick, { capture: true } as AddEventListenerOptions)
  }, [startManual])

  // 2) Patch pushState/replaceState → bắt router.push/replace
  useEffect(() => {
    const origPush: typeof history.pushState = history.pushState.bind(history)
    const origReplace: typeof history.replaceState = history.replaceState.bind(history)

    history.pushState = function (...args) {
      try {
        const urlArg = args[2]
        let sameUrl = false
        if (typeof urlArg === 'string') {
          const dest = new URL(urlArg, window.location.origin)
          sameUrl = dest.pathname === window.location.pathname && dest.search === window.location.search
        }
        startManual({ sameUrl })
      } finally {
        return origPush(...args)
      }
    }
    history.replaceState = function (...args) {
      try {
        const urlArg = args[2]
        let sameUrl = false
        if (typeof urlArg === 'string') {
          const dest = new URL(urlArg, window.location.origin)
          sameUrl = dest.pathname === window.location.pathname && dest.search === window.location.search
        }
        startManual({ sameUrl })
      } finally {
        return origReplace(...args)
      }
    }

    return () => {
      history.pushState = origPush
      history.replaceState = origReplace
    }
  }, [startManual])

  // 3) HARD-RESET khi URL thực sự đổi:
  //    - Ép hoàn tất + fade-out ngay
  //    - Bịt tín hiệu mạng cũ trong S ms để không kéo thanh lại khi về Home
  useEffect(() => {
    // chỉ chạy khi thực sự có thay đổi (Next app router đảm bảo)
    // ép kết thúc manual nếu đang chạy
    if (manualActive) finishManualSoon()

    // bật suppress trong 1200ms để bỏ qua netActive/percent còn sót từ route trước
    suppressUntilRef.current = Date.now() + 1200

    // ép hoàn tất và fade-out ngay (không chờ provider)
    schedule(() => {
      setShow(true)
      setOpacity0(true)
    })
    if (fadeRef.current !== null) window.clearTimeout(fadeRef.current)
    fadeRef.current = window.setTimeout(() => {
      setShow(false)
      setOpacity0(false)
      fadeRef.current = null
    }, 300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchKey]) // không thêm finishManualSoon/manualActive vào deps để tránh double reset

  // 4) Kết hợp tiến độ từ network và manual (có suppress tín hiệu mạng cũ)
  const now = typeof window !== 'undefined' ? Date.now() : 0
  const suppressNet = now < suppressUntilRef.current
  const netActive = suppressNet ? false : netActiveRaw
  const netPercent = suppressNet ? 0 : netPercentRaw

  const combinedActive = netActive || manualActive
  const combinedPercent = Math.max(netPercent, manualPercent, 0)

  // 5) Điều khiển hiển thị & fade (không thu về) — có cleanup timeout chuẩn
  useEffect(() => {
    // dọn timeout fade cũ nếu có
    if (fadeRef.current !== null) {
      window.clearTimeout(fadeRef.current)
      fadeRef.current = null
    }

    if (combinedActive) {
      schedule(() => {
        setShow(true)
        setOpacity0(false)
      })
    } else {
      const done = Math.max(combinedPercent, netPercent, manualPercent)
      if (done >= 100 || (!netActive && !manualActive)) {
        schedule(() => {
          setOpacity0(true)
        })
        // chờ fade 300ms rồi ẩn hẳn
        fadeRef.current = window.setTimeout(() => {
          setShow(false)
          setOpacity0(false)
          fadeRef.current = null
        }, 300)
      }
    }

    return () => {
      if (fadeRef.current !== null) {
        window.clearTimeout(fadeRef.current)
        fadeRef.current = null
      }
    }
  }, [combinedActive, combinedPercent, netActive, manualActive, netPercent, manualPercent, schedule])

  // 6) Cleanup khi unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (fadeRef.current !== null) window.clearTimeout(fadeRef.current)
      if (manualTickRef.current !== null) window.clearInterval(manualTickRef.current)
      if (autoFinishRef.current !== null) window.clearTimeout(autoFinishRef.current)
    }
  }, [])

  // Hiển thị (>=2% cho cảm giác có tiến trình), nhưng hard-reset đã xử lý fade-out riêng
  const barWidth = Math.max(0, Math.min(100, combinedPercent))

  return show ? (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] w-full"
      aria-hidden="true"
    >
      <div
        className="h-full rounded-r-full transition-[width,opacity] duration-300"
        style={{
          width: `${barWidth}%`,
          opacity: opacity0 ? 0 : 1,
          background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)',
          boxShadow: '0 0 6px rgba(14,165,233,.45)',
        }}
      />
    </div>
  ) : null
}

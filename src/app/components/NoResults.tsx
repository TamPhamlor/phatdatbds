'use client'

import * as React from 'react'

type NoResultsProps = {
  title?: string
  description?: string
  actionText?: string
  onAction?: () => void
}

export default function NoResults({
  title = 'Không tồn tại',
  description = 'Không tìm thấy bất động sản phù hợp. Hãy thử thay đổi bộ lọc hoặc từ khoá.',
  actionText,
  onAction,
}: NoResultsProps) {
  return (
    <div className="py-12 px-4 flex justify-center">
      <div className="max-w-lg text-center space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-emerald-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
              <line x1="9" y1="9" x2="15" y2="15" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Action Button */}
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-600 font-medium hover:bg-emerald-50 hover:border-emerald-600 transition-all duration-200 hover:shadow-md hover:shadow-emerald-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {actionText}
          </button>
        )}
      </div>
    </div>
  )
}

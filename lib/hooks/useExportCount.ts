'use client'

import { useState, useEffect } from 'react'
import {
  STORAGE_KEYS,
  RATE_LIMITS,
} from '@/lib/config'

const EXPORT_COUNT_KEY = STORAGE_KEYS.EXPORT_COUNT
const SESSION_START_KEY = STORAGE_KEYS.SESSION_START

export interface ExportCountState {
  count: number
  needsVerification: boolean
  incrementCount: () => void
  resetCount: () => void
}

/**
 * Hook to track export count and determine if verification is needed
 * First export is free, subsequent exports require verification
 */
export function useExportCount(): ExportCountState {
  const [count, setCount] = useState<number>(0)

  // Load count from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem(EXPORT_COUNT_KEY)
      const sessionStart = localStorage.getItem(SESSION_START_KEY)
      const now = Date.now()
      
      // Check if this is a new session (24 hours reset)
      if (!sessionStart || (now - parseInt(sessionStart)) > RATE_LIMITS.SESSION_RESET_HOURS * 60 * 60 * 1000) {
        // Reset count for new session
        localStorage.setItem(SESSION_START_KEY, now.toString())
        localStorage.setItem(EXPORT_COUNT_KEY, '0')
        setCount(0)
      } else {
        // Load existing count
        setCount(savedCount ? parseInt(savedCount) : 0)
      }
    }
  }, [])

  const incrementCount = () => {
    const newCount = count + 1
    setCount(newCount)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(EXPORT_COUNT_KEY, newCount.toString())
    }
  }

  const resetCount = () => {
    setCount(0)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(EXPORT_COUNT_KEY, '0')
      localStorage.setItem(SESSION_START_KEY, Date.now().toString())
    }
  }

  // Need verification if exports exceed free limit
  const needsVerification = count >= RATE_LIMITS.FREE_EXPORTS_BEFORE_VERIFICATION

  return {
    count,
    needsVerification,
    incrementCount,
    resetCount
  }
}
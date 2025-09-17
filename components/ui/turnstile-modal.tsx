'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Shield, RefreshCw, AlertCircle } from 'lucide-react'

interface TurnstileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerificationSuccess: (token: string) => void
  onVerificationError?: (error: string) => void
}

export function TurnstileModal({
  open,
  onOpenChange,
  onVerificationSuccess,
  onVerificationError
}: TurnstileModalProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileKey, setTurnstileKey] = useState(0) // For forcing re-render

  const handleTurnstileSuccess = async (token: string) => {
    setIsVerifying(true)
    setError(null)

    try {
      console.log('Turnstile verification started with token:', token.substring(0, 20) + '...')
      
      // Verify token with our API
      const response = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()
      console.log('Turnstile API response:', data)

      if (data.success) {
        console.log('Turnstile verification successful')
        onVerificationSuccess(token)
        onOpenChange(false)
      } else {
        console.error('Turnstile verification failed:', data)
        setError(data.error || 'Verification failed. Please try again.')
        onVerificationError?.(data.error || 'Verification failed')
        // Don't auto-retry on API failure - let user retry manually
      }
    } catch (err) {
      console.error('Turnstile network error:', err)
      const errorMessage = 'Network error. Please check your connection and try again.'
      setError(errorMessage)
      onVerificationError?.(errorMessage)
      // Don't auto-retry on network error - let user retry manually
    } finally {
      setIsVerifying(false)
    }
  }

  const handleTurnstileError = (error: string) => {
    console.error('Turnstile error:', error)
    setError('Verification widget failed to load. Please refresh and try again.')
    onVerificationError?.(error)
  }

  const handleRetry = () => {
    setError(null)
    setIsVerifying(false)
    // Force Turnstile to re-render by changing key
    setTurnstileKey(prev => prev + 1)
  }

  const handleClose = () => {
    setError(null)
    setIsVerifying(false)
    setTurnstileKey(prev => prev + 1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Verification
          </DialogTitle>
          <DialogDescription>
            You've used your 3 free exports. Please complete this security check to continue. This helps us prevent abuse and keep the service free.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center py-4">
            {isVerifying ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              <Turnstile
                key={turnstileKey}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAB1p_0vOu0fdSrwv'}
                onSuccess={handleTurnstileSuccess}
                onError={handleTurnstileError}
                onExpire={() => handleRetry()}
                options={{
                  theme: 'auto',
                  size: 'normal',
                }}
              />
            )}
          </div>

          {error && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                disabled={isVerifying}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Verification
              </Button>
            </div>
          )}

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isVerifying}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
import { useCallback } from 'react'

interface PaystackOptions {
  email: string
  amount: number // in kobo/pesewas (multiply GHS by 100)
  currency?: 'GHS' | 'NGN' | 'USD'
  reference?: string
  metadata?: Record<string, unknown>
  onSuccess: (reference: string) => void
  onClose?: () => void
}

export function usePaystack() {
  const initializePayment = useCallback((options: PaystackOptions) => {
    const reference = options.reference || `ww_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: options.email,
      amount: options.amount * 100, // convert to pesewas
      currency: options.currency ?? 'GHS',
      ref: reference,
      metadata: options.metadata ?? {},
      callback: (response: { reference: string }) => {
        options.onSuccess(response.reference)
      },
      onClose: () => {
        options.onClose?.()
      },
    })

    handler.openIframe()
  }, [])

  return { initializePayment }
}
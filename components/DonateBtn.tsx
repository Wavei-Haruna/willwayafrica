'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Script from 'next/script'

// ─── Types ───────────────────────────────────────────────────────────────────

interface DonateBtnProps {
  className?: string
}

type Currency = 'GHS' | 'USD' | 'NGN'

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GHS: '₵',
  USD: '$',
  NGN: '₦',
}

const PRESET_AMOUNTS: Record<Currency, number[]> = {
  GHS: [50, 100, 250, 500],
  USD: [10, 25, 50, 100],
  NGN: [5000, 10000, 25000, 50000],
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

function usePaystack() {
  const initializePayment = ({
    email,
    amount,
    currency,
    metadata,
    onSuccess,
    onClose,
  }: {
    email: string
    amount: number
    currency: Currency
    metadata?: Record<string, unknown>
    onSuccess: (reference: string) => void
    onClose?: () => void
  }) => {
    const reference = `ww_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      currency,
      ref: reference,
      metadata: metadata ?? {},
      callback: (response: { reference: string }) => {
        onSuccess(response.reference)
      },
      onClose: () => onClose?.(),
    })

    handler.openIframe()
  }

  return { initializePayment }
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function DonateModal({ onClose }: { onClose: () => void }) {
  const { initializePayment } = usePaystack()

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form')
  const [email, setEmail] = useState('')
  const [currency, setCurrency] = useState<Currency>('GHS')
  const [amount, setAmount] = useState<number | ''>('')
  const [customAmount, setCustomAmount] = useState(false)
  const [error, setError] = useState('')
  const [successRef, setSuccessRef] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handlePreset = (val: number) => {
    setAmount(val)
    setCustomAmount(false)
    setError('')
  }

  const handleCustom = () => {
    setAmount('')
    setCustomAmount(true)
  }

  const validate = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return false
    }
    if (!amount || Number(amount) <= 0) {
      setError('Enter a donation amount.')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (!validate()) return
    setError('')
    setStep('processing')

    initializePayment({
      email,
      amount: Number(amount),
      currency,
      metadata: { source: 'willway_donate_btn', currency },
      onSuccess: (ref) => {
        setSuccessRef(ref)
        setStep('success')
      },
      onClose: () => {
        setStep('form')
      },
    })
  }

  const symbol = CURRENCY_SYMBOLS[currency]
  const presets = PRESET_AMOUNTS[currency]

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(13,13,13,0.55)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '448px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#ffffff',
          border: '1px solid #D9EEFC',
          boxShadow: '0 24px 64px rgba(108,199,254,0.18)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #6CC7FE 0%, #4db8fe 100%)',
          }}
        >
          <div>
            <p style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '2px',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              WillWay Africa
            </p>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              fontFamily: "'Syne', sans-serif",
            }}>
              Make a Donation
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>

          {/* ── FORM STEP ── */}
          {step === 'form' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Currency */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#5F6B7A',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Currency
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['GHS', 'USD', 'NGN'] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => { setCurrency(c); setAmount(''); setCustomAmount(false) }}
                      style={{
                        flex: 1,
                        padding: '8px 0',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        border: `1px solid ${currency === c ? '#6CC7FE' : '#D9EEFC'}`,
                        background: currency === c ? '#6CC7FE' : '#F7FBFF',
                        color: currency === c ? '#ffffff' : '#5F6B7A',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset amounts */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#5F6B7A',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Amount
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '8px' }}>
                  {presets.map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePreset(p)}
                      style={{
                        padding: '10px 0',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 700,
                        border: `1px solid ${amount === p && !customAmount ? '#F4B942' : '#D9EEFC'}`,
                        background: amount === p && !customAmount ? '#FFF6DF' : '#F7FBFF',
                        color: amount === p && !customAmount ? '#0d0d0d' : '#5F6B7A',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {symbol}{p.toLocaleString()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCustom}
                  style={{
                    width: '100%',
                    padding: '8px 0',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#6CC7FE',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {customAmount ? '↓ Enter custom amount' : '+ Custom amount'}
                </button>

                {customAmount && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '8px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid #D9EEFC',
                    background: '#F7FBFF',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0d0d0d' }}>{symbol}</span>
                    <input
                      type="number"
                      min={1}
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value === '' ? '' : Number(e.target.value))
                        setError('')
                      }}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0d0d0d',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#5F6B7A',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#6CC7FE')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#D9EEFC')}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    border: '1px solid #D9EEFC',
                    background: '#F7FBFF',
                    color: '#0d0d0d',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                    fontFamily: "'DM Sans', sans-serif",
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Error */}
              {error && (
                <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 500, margin: 0 }}>
                  {error}
                </p>
              )}

              {/* Donate CTA */}
              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #6CC7FE 0%, #4db8fe 100%)',
                  boxShadow: '0 8px 24px rgba(108,199,254,0.35)',
                  transition: 'opacity 0.2s, transform 0.1s',
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Donate {amount ? `${symbol}${Number(amount).toLocaleString()}` : ''} →
              </button>

              <p style={{
                textAlign: 'center',
                fontSize: '11px',
                color: '#5F6B7A',
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Secured by Paystack · Your data is safe
              </p>
            </div>
          )}

          {/* ── PROCESSING STEP ── */}
          {step === 'processing' && (
            <div style={{
              padding: '40px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              textAlign: 'center',
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '4px solid #D9EEFC',
                borderTopColor: '#6CC7FE',
                animation: 'spin 0.8s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#0d0d0d', margin: 0, fontFamily: "'Syne', sans-serif" }}>
                Opening payment...
              </p>
              <p style={{ fontSize: '12px', color: '#5F6B7A', margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                Complete the payment in the Paystack window.
              </p>
            </div>
          )}

          {/* ── SUCCESS STEP ── */}
          {step === 'success' && (
            <div style={{
              padding: '32px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              textAlign: 'center',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#FFF6DF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6L22 8" stroke="#F4B942" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#0d0d0d',
                  margin: '0 0 4px',
                  fontFamily: "'Syne', sans-serif",
                }}>
                  Thank you! 🙏
                </h3>
                <p style={{ fontSize: '13px', color: '#5F6B7A', margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                  Your donation is making a real difference.
                </p>
              </div>
              <div style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#5F6B7A',
                wordBreak: 'break-all',
                background: '#F7FBFF',
                border: '1px solid #D9EEFC',
                boxSizing: 'border-box',
              }}>
                Ref: {successRef}
              </div>
              <button
                onClick={onClose}
                style={{
                  marginTop: '8px',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #6CC7FE 0%, #4db8fe 100%)',
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── DonateBtn ────────────────────────────────────────────────────────────────

export function DonateBtn({ className }: DonateBtnProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" />

      <button
        onClick={() => setOpen(true)}
        className={
          className ??
          `px-5 py-2.5 rounded-full font-bold text-sm text-white transition-all duration-200
           hover:opacity-90 active:scale-[0.97]`
        }
        style={{
          background: 'linear-gradient(135deg, #6CC7FE 0%, #4db8fe 100%)',
          boxShadow: '0 4px 16px rgba(108,199,254,0.3)',
        }}
      >
        DONATE
      </button>

      {mounted && open && createPortal(
        <DonateModal onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  )
}
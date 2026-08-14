'use client'

import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'
import {
  HandCoins,
  Users,
  Handshake,
  ChevronRight,
  CheckCircle,
  Heart,
  GraduationCap,
  Stethoscope,
  Landmark,
  Sprout,
  ArrowRight,
  Globe,
  Star,
  Send,
} from 'lucide-react'

// ── Types (mirrored from DonateBtn) ────────────────────────────────
type Currency = 'GHS' | 'USD' | 'NGN'

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GHS: '₵',
  USD: '$',
  NGN: '₦',
}

// ── Paystack hook ───────────────────────────────────────────────────
function usePaystack() {
  const initializePayment = ({
    email, amount, currency, metadata, onSuccess, onClose,
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
      callback: (response: { reference: string }) => { onSuccess(response.reference) },
      onClose: () => onClose?.(),
    })
    handler.openIframe()
  }
  return { initializePayment }
}

// ── Inline Donate Modal ─────────────────────────────────────────────
// Accepts prefilled amount + currency from the page's own selector
function DonateModal({
  onClose,
  prefilledAmount,
  prefilledCurrency,
}: {
  onClose: () => void
  prefilledAmount?: number
  prefilledCurrency?: Currency
}) {
  const { initializePayment } = usePaystack()

  const [step, setStep]               = useState<'form' | 'processing' | 'success'>('form')
  const [email, setEmail]             = useState('')
  const [currency, setCurrency]       = useState<Currency>(prefilledCurrency ?? 'GHS')
  const [amount, setAmount]           = useState<number | ''>(prefilledAmount ?? '')
  const [customAmount, setCustomAmount] = useState(!prefilledAmount)
  const [error, setError]             = useState('')
  const [successRef, setSuccessRef]   = useState('')
  const overlayRef                    = useRef<HTMLDivElement>(null)

  const PRESET_AMOUNTS: Record<Currency, number[]> = {
    GHS: [50, 100, 250, 500],
    USD: [10, 25, 50, 100],
    NGN: [5000, 10000, 25000, 50000],
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
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
      metadata: { source: 'willway_get_involved', currency },
      onSuccess: (ref) => { setSuccessRef(ref); setStep('success') },
      onClose: () => setStep('form'),
    })
  }

  const symbol  = CURRENCY_SYMBOLS[currency]
  const presets = PRESET_AMOUNTS[currency]

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(13,13,13,0.55)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{
        position: 'relative', width: '100%', maxWidth: '448px',
        borderRadius: '16px', overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid #D9EEFC',
        boxShadow: '0 24px 64px rgba(108,199,254,0.18)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #6CC7FE 0%, #4db8fe 100%)',
        }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
              marginBottom: '2px', fontFamily: "'DM Sans', sans-serif" }}>
              WillWay Africa
            </p>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff',
              margin: 0, fontFamily: "'Syne', sans-serif" }}>
              Make a Donation
            </h2>
          </div>
          <button onClick={onClose} style={{
            width: '32px', height: '32px', borderRadius: '50%',
            border: 'none', background: 'rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.85)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>

          {step === 'form' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Currency */}
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600,
                  color: '#5F6B7A', letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginBottom: '8px', fontFamily: "'DM Sans', sans-serif" }}>
                  Currency
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['GHS', 'USD', 'NGN'] as Currency[]).map((c) => (
                    <button key={c}
                      onClick={() => { setCurrency(c); setAmount(''); setCustomAmount(true) }}
                      style={{
                        flex: 1, padding: '8px 0', borderRadius: '12px',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                        border: `1px solid ${currency === c ? '#6CC7FE' : '#D9EEFC'}`,
                        background: currency === c ? '#6CC7FE' : '#F7FBFF',
                        color: currency === c ? '#ffffff' : '#5F6B7A',
                        transition: 'all 0.15s',
                        fontFamily: "'DM Sans', sans-serif",
                      }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600,
                  color: '#5F6B7A', letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginBottom: '8px', fontFamily: "'DM Sans', sans-serif" }}>
                  Amount
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '8px', marginBottom: '8px' }}>
                  {presets.map((p) => (
                    <button key={p}
                      onClick={() => { setAmount(p); setCustomAmount(false); setError('') }}
                      style={{
                        padding: '10px 0', borderRadius: '12px',
                        fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                        border: `1px solid ${amount === p && !customAmount ? '#F4B942' : '#D9EEFC'}`,
                        background: amount === p && !customAmount ? '#FFF6DF' : '#F7FBFF',
                        color: amount === p && !customAmount ? '#0d0d0d' : '#5F6B7A',
                        transition: 'all 0.15s',
                        fontFamily: "'DM Sans', sans-serif",
                      }}>
                      {symbol}{p.toLocaleString()}
                    </button>
                  ))}
                </div>
                <button onClick={() => { setCustomAmount(true); setAmount('') }} style={{
                  width: '100%', padding: '8px 0', fontSize: '12px', fontWeight: 600,
                  color: '#6CC7FE', background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {customAmount ? '↓ Enter custom amount' : '+ Custom amount'}
                </button>
                {customAmount && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    marginTop: '8px', padding: '12px 16px',
                    borderRadius: '12px', border: '1px solid #D9EEFC', background: '#F7FBFF',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0d0d0d' }}>{symbol}</span>
                    <input
                      type="number" min={1} placeholder="0.00"
                      value={amount}
                      onChange={(e) => { setAmount(e.target.value === '' ? '' : Number(e.target.value)); setError('') }}
                      style={{
                        flex: 1, background: 'transparent', border: 'none', outline: 'none',
                        fontSize: '14px', fontWeight: 600, color: '#0d0d0d',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600,
                  color: '#5F6B7A', letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginBottom: '8px', fontFamily: "'DM Sans', sans-serif" }}>
                  Your Email
                </label>
                <input
                  type="email" placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#6CC7FE')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#D9EEFC')}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '12px',
                    fontSize: '14px', border: '1px solid #D9EEFC',
                    background: '#F7FBFF', color: '#0d0d0d', outline: 'none',
                    transition: 'border-color 0.15s', fontFamily: "'DM Sans', sans-serif",
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {error && (
                <p style={{ fontSize: '12px', color: '#ef4444', fontWeight: 500, margin: 0 }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                style={{
                  width: '100%', padding: '14px', borderRadius: '12px',
                  fontSize: '14px', fontWeight: 700, color: '#ffffff',
                  border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #6CC7FE 0%, #4db8fe 100%)',
                  boxShadow: '0 8px 24px rgba(108,199,254,0.35)',
                  fontFamily: "'Syne', sans-serif", letterSpacing: '0.04em',
                }}
              >
                Donate {amount ? `${symbol}${Number(amount).toLocaleString()}` : ''} →
              </button>

              <p style={{ textAlign: 'center', fontSize: '11px', color: '#5F6B7A',
                margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                Secured by Paystack · Your data is safe
              </p>
            </div>
          )}

          {step === 'processing' && (
            <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '16px', textAlign: 'center' }}>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                border: '4px solid #D9EEFC', borderTopColor: '#6CC7FE',
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#0d0d0d',
                margin: 0, fontFamily: "'Syne', sans-serif" }}>
                Opening payment...
              </p>
              <p style={{ fontSize: '12px', color: '#5F6B7A', margin: 0,
                fontFamily: "'DM Sans', sans-serif" }}>
                Complete the payment in the Paystack window.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div style={{ padding: '32px 0', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '16px', textAlign: 'center' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: '#FFF6DF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6L22 8" stroke="#F4B942" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0d0d0d',
                  margin: '0 0 4px', fontFamily: "'Syne', sans-serif" }}>
                  Thank you! 🙏
                </h3>
                <p style={{ fontSize: '13px', color: '#5F6B7A', margin: 0,
                  fontFamily: "'DM Sans', sans-serif" }}>
                  Your donation is making a real difference.
                </p>
              </div>
              <div style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                fontSize: '11px', fontFamily: 'monospace', color: '#5F6B7A',
                wordBreak: 'break-all', background: '#F7FBFF',
                border: '1px solid #D9EEFC', boxSizing: 'border-box',
              }}>
                Ref: {successRef}
              </div>
              <button onClick={onClose} style={{
                marginTop: '8px', padding: '10px 24px', borderRadius: '12px',
                fontSize: '14px', fontWeight: 700, color: '#ffffff',
                border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #6CC7FE 0%, #4db8fe 100%)',
                fontFamily: "'Syne', sans-serif",
              }}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Scroll reveal ───────────────────────────────────────────────────
function Reveal({
  children, className = '', delay = 0, direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const initial =
    direction === 'left'  ? { opacity: 0, x: -50 }
    : direction === 'right' ? { opacity: 0, x: 50 }
    : { opacity: 0, y: 44 }
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Section label ───────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
      <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {text}
      </span>
    </div>
  )
}

// ── Floating label input ────────────────────────────────────────────
function FloatingInput({
  id, label, type = 'text', value, onChange,
}: {
  id: string; label: string; type?: string; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  return (
    <div className="relative">
      <input
        id={id} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-[#F8FBFF] border border-gray-200 rounded-xl
          px-4 pt-6 pb-2.5 text-[14px] text-[#0D0D0D] outline-none
          focus:border-[#6CC7FE] focus:shadow-[0_0_0_3px_rgba(108,199,254,0.15)]
          transition-all duration-200"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        placeholder=" "
      />
      <label htmlFor={id}
        className={`absolute left-4 pointer-events-none font-medium transition-all duration-200
          ${active ? 'top-2 text-[10px] text-[#6CC7FE] tracking-[0.08em] uppercase'
                   : 'top-1/2 -translate-y-1/2 text-[14px] text-[#9CA3AF]'}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </label>
    </div>
  )
}

// ── Data ────────────────────────────────────────────────────────────
const DONATE_AMOUNTS: { label: string; value: number | null; currency: Currency }[] = [
  { label: 'GH₵ 50',    value: 50,   currency: 'GHS' },
  { label: 'GH₵ 100',   value: 100,  currency: 'GHS' },
  { label: 'GH₵ 250',   value: 250,  currency: 'GHS' },
  { label: 'GH₵ 500',   value: 500,  currency: 'GHS' },
  { label: 'GH₵ 1,000', value: 1000, currency: 'GHS' },
  { label: 'Custom',    value: null,  currency: 'GHS' },
]

const IMPACT_MAP = [
  { label: 'GH₵ 50',    value: 50,   icon: <GraduationCap className="w-5 h-5" />, impact: 'Buys school supplies for one child for a term' },
  { label: 'GH₵ 100',   value: 100,  icon: <Stethoscope   className="w-5 h-5" />, impact: 'Provides health screening for 5 young people' },
  { label: 'GH₵ 250',   value: 250,  icon: <Sprout        className="w-5 h-5" />, impact: 'Seeds a small business for one rural woman' },
  { label: 'GH₵ 500',   value: 500,  icon: <Landmark      className="w-5 h-5" />, impact: 'Funds a community governance workshop' },
  { label: 'GH₵ 1,000', value: 1000, icon: <Globe         className="w-5 h-5" />, impact: 'Supports an ICT lab for 10 rural students' },
]

const VOLUNTEER_ROLES = [
  { icon: <GraduationCap className="w-5 h-5" />, title: 'Education Mentor',       desc: 'Coach and mentor students from primary school through university.' },
  { icon: <Stethoscope   className="w-5 h-5" />, title: 'Health Educator',        desc: 'Deliver reproductive health & HIV/AIDS awareness in communities.' },
  { icon: <HandCoins     className="w-5 h-5" />, title: 'Business Trainer',       desc: 'Train rural women in entrepreneurship and financial management.' },
  { icon: <Globe         className="w-5 h-5" />, title: 'Digital Skills Coach',   desc: 'Teach ICT literacy in our solar-powered community resource centres.' },
  { icon: <Landmark      className="w-5 h-5" />, title: 'Governance Facilitator', desc: 'Lead civic education and community empowerment workshops.' },
  { icon: <Star          className="w-5 h-5" />, title: 'General Support',        desc: 'Help wherever needed — research, communications, events & more.' },
]

const PARTNER_TYPES = [
  {
    icon: <Handshake className="w-6 h-6" />,
    title: 'Corporate Partners',
    desc: 'Align your CSR goals with real community impact. Co-fund programmes, sponsor ICT labs, or support girl-child education.',
    cta: 'Become a Corporate Partner',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'NGO & Government',
    desc: 'Join our coalition of change-makers. We welcome co-implementation partnerships on health, education, and governance.',
    cta: 'Explore Joint Programmes',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Individual Champions',
    desc: 'Become an ambassador. Share our story, fundraise in your community, or connect us with networks that share our mission.',
    cta: 'Become an Ambassador',
  },
]

const VOLUNTEER_IMAGES = [
  '/Get-Involved-1.jpg',
  '/Get-Involved-2.jpg',
  '/Get-Involved-3.jpg',
]

// ════════════════════════════════════════════════════════════════════
export default function Page() {
  const [selectedAmount, setSelectedAmount] = useState(DONATE_AMOUNTS[1]) // GH₵ 100 default
  const [customAmountValue, setCustomAmountValue] = useState('')
  const [activeTab, setActiveTab]           = useState<'donate' | 'volunteer' | 'partner'>('donate')
  const [volForm, setVolForm]               = useState({ name: '', email: '', role: '', message: '' })
  const [volSubmitted, setVolSubmitted]     = useState(false)
  const [volLoading, setVolLoading]         = useState(false)

  // Modal state
  const [modalOpen, setModalOpen]           = useState(false)
  const [mounted, setMounted]               = useState(false)

  // Mount guard for portal
  useState(() => { setMounted(true) })

  const setVol = (k: string) => (v: string) => setVolForm(f => ({ ...f, [k]: v }))

  const handleVolSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setVolLoading(true)
    await new Promise(r => setTimeout(r, 1600))
    setVolLoading(false)
    setVolSubmitted(true)
  }

  // Derive prefilled amount for modal
  const modalAmount = selectedAmount.value !== null
    ? selectedAmount.value
    : customAmountValue ? Number(customAmountValue) : undefined

  const currentImpact = IMPACT_MAP.find(m => m.value === selectedAmount.value)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* Portal: modal renders into document.body, outside all transforms */}
      {typeof window !== 'undefined' && modalOpen && createPortal(
        <DonateModal
          onClose={() => setModalOpen(false)}
          prefilledAmount={modalAmount}
          prefilledCurrency="GHS"
        />,
        document.body
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/* HERO                                                   */}
      {/* ══════════════════════════════════════════════════════ */}
      <section className="relative bg-white pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px]
          rounded-full bg-[#6CC7FE]/08 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px]
          rounded-full bg-[#6CC7FE]/05 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
                <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase">
                  Join the Movement
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-extrabold tracking-[-0.03em] leading-[1.06] mb-6"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}
              >
                You Have More{' '}
                <span className="text-[#6CC7FE]">Power</span>
                <br />Than You Think.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#9CA3AF] text-[15px] leading-[1.85] max-w-lg mb-10"
              >
                Whether you give, volunteer your skills, or partner with us —
                every action creates ripples that transform young lives across
                rural Africa. Choose how you want to show up.
              </motion.p>

              {/* Tab switcher */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex gap-2 flex-wrap"
              >
                {[
                  { key: 'donate',    icon: <HandCoins className="w-4 h-4" />, label: 'Donate' },
                  { key: 'volunteer', icon: <Users     className="w-4 h-4" />, label: 'Volunteer' },
                  { key: 'partner',   icon: <Handshake className="w-4 h-4" />, label: 'Partner' },
                ].map(tab => (
                  <motion.button
                    key={tab.key}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-[13px]
                      font-bold tracking-wide transition-all duration-200 border-2
                      ${activeTab === tab.key
                        ? 'bg-[#6CC7FE] text-white border-[#6CC7FE] shadow-[0_4px_20px_rgba(108,199,254,0.4)]'
                        : 'bg-white text-[#374151] border-gray-200 hover:border-[#6CC7FE]'
                      }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {tab.icon} {tab.label}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Right — photo collage */}
            <motion.div
              initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:flex items-center justify-center h-[420px]"
            >
              <motion.div
                animate={{ borderRadius: [
                  '60% 40% 55% 45% / 50% 60% 40% 50%',
                  '45% 55% 40% 60% / 60% 40% 55% 45%',
                  '60% 40% 55% 45% / 50% 60% 40% 50%',
                ]}}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[#6CC7FE]/08"
              />
              <div className="relative z-10 w-[260px] h-[340px] rounded-3xl overflow-hidden
                shadow-[0_20px_60px_rgba(108,199,254,0.25)] border-4 border-white">
                <Image src={VOLUNTEER_IMAGES[0]} alt="Volunteer" fill className="object-cover" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-4 w-[150px] h-[160px] rounded-2xl overflow-hidden
                  shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-4 border-white z-20"
              >
                <Image src={VOLUNTEER_IMAGES[1]} alt="Community" fill className="object-cover" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-4 right-12 w-[130px] h-[140px] rounded-2xl overflow-hidden
                  shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-4 border-white z-20"
              >
                <Image src={VOLUNTEER_IMAGES[2]} alt="Health" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute bottom-6 left-4 z-30 bg-white rounded-2xl px-4 py-3
                  shadow-[0_8px_30px_rgba(108,199,254,0.2)] border border-[#6CC7FE]/15"
              >
                <p className="text-[#6CC7FE] text-xl font-extrabold leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}>20,000+</p>
                <p className="text-[#9CA3AF] text-[10px] mt-0.5">lives impacted</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* TAB CONTENT                                            */}
      {/* ══════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">

        {/* ── DONATE TAB ────────────────────────────────────── */}
        {activeTab === 'donate' && (
          <motion.div key="donate"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <section className="py-20 bg-[#F8FBFF]">
              <div className="max-w-7xl mx-auto px-6 lg:px-14">
                <Reveal className="text-center max-w-xl mx-auto mb-14">
                  <SectionLabel text="Make a Donation" />
                  <h2 className="font-extrabold tracking-[-0.03em] leading-[1.08] mb-3"
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
                    Every Cedi <span className="text-[#6CC7FE]">Changes a Life.</span>
                  </h2>
                  <p className="text-[#9CA3AF] text-[14px] leading-relaxed">
                    100% of your donation goes directly to programmes on the ground.
                    No admin cuts. No child left behind.
                  </p>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                  {/* Amount selector card */}
                  <Reveal direction="left">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100
                      shadow-[0_8px_40px_rgba(108,199,254,0.1)]">
                      <h3 className="font-extrabold text-[#0D0D0D] text-[1.1rem] mb-6"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        Choose an Amount
                      </h3>

                      {/* Amount grid */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {DONATE_AMOUNTS.map(amt => (
                          <motion.button
                            key={amt.label}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => { setSelectedAmount(amt); setCustomAmountValue('') }}
                            className={`py-3.5 rounded-xl text-[13px] font-bold
                              border-2 transition-all duration-200
                              ${selectedAmount.label === amt.label
                                ? 'bg-[#6CC7FE] text-white border-[#6CC7FE] shadow-[0_4px_16px_rgba(108,199,254,0.4)]'
                                : 'bg-white text-[#374151] border-gray-200 hover:border-[#6CC7FE]'
                              }`}
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {amt.label}
                          </motion.button>
                        ))}
                      </div>

                      {/* Custom amount input */}
                      {selectedAmount.value === null && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mb-6"
                        >
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2
                              text-[#9CA3AF] text-[14px] font-bold">GH₵</span>
                            <input
                              type="number"
                              placeholder="Enter amount"
                              value={customAmountValue}
                              onChange={e => setCustomAmountValue(e.target.value)}
                              className="w-full bg-[#F8FBFF] border border-gray-200 rounded-xl
                                pl-14 pr-4 py-4 text-[14px] text-[#0D0D0D] outline-none
                                focus:border-[#6CC7FE] focus:shadow-[0_0_0_3px_rgba(108,199,254,0.15)]
                                transition-all duration-200"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Frequency toggle */}
                      <div className="flex gap-2 mb-8">
                        {['One-time', 'Monthly', 'Annually'].map((f, i) => (
                          <button key={f}
                            className={`flex-1 py-2.5 rounded-xl text-[12px] font-semibold
                              border transition-all duration-200
                              ${i === 0
                                ? 'bg-[#6CC7FE]/10 border-[#6CC7FE] text-[#6CC7FE]'
                                : 'border-gray-200 text-[#9CA3AF] hover:border-[#6CC7FE] hover:text-[#6CC7FE]'
                              }`}
                            style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {f}
                          </button>
                        ))}
                      </div>

                      {/* ← THE KEY CHANGE: opens modal instead of navigating */}
                      <motion.button
                        onClick={() => setModalOpen(true)}
                        whileHover={{ scale: 1.02, backgroundColor: '#45b8f5' }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-3 w-full
                          bg-[#6CC7FE] text-[#0D0D0D] font-black text-[13px]
                          py-4 rounded-xl tracking-[0.1em] uppercase
                          shadow-[0_6px_24px_rgba(108,199,254,0.38)]
                          transition-colors duration-200"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        Donate Now <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <p className="text-[#C4C9D4] text-[11px] text-center mt-4">
                        Secure payment · All major cards accepted · Receipt issued
                      </p>
                    </div>
                  </Reveal>

                  {/* Impact map */}
                  <Reveal direction="right" delay={0.1}>
                    <div className="flex flex-col gap-4">
                      <h3 className="font-extrabold text-[#0D0D0D] text-[1.1rem]"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        Your Impact at a Glance
                      </h3>

                      {IMPACT_MAP.map((item) => (
                        <motion.div
                          key={item.label}
                          whileHover={{ x: 6, borderColor: '#6CC7FE' }}
                          onClick={() => {
                            setSelectedAmount(
                              DONATE_AMOUNTS.find(a => a.value === item.value) ?? DONATE_AMOUNTS[0]
                            )
                            setCustomAmountValue('')
                          }}
                          className={`flex items-center gap-4 p-5 rounded-2xl border-2
                            cursor-pointer transition-all duration-200
                            ${selectedAmount.value === item.value
                              ? 'border-[#6CC7FE] bg-[#6CC7FE]/05'
                              : 'border-gray-100 bg-white hover:bg-gray-50'
                            }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                            flex-shrink-0 transition-colors duration-200
                            ${selectedAmount.value === item.value
                              ? 'bg-[#6CC7FE] text-white'
                              : 'bg-[#6CC7FE]/10 border border-[#6CC7FE]/20 text-[#6CC7FE]'
                            }`}>
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-extrabold text-[#6CC7FE] text-[15px]"
                              style={{ fontFamily: "'Syne', sans-serif" }}>
                              {item.label}
                            </p>
                            <p className="text-[#374151] text-[13px] leading-relaxed">
                              {item.impact}
                            </p>
                          </div>
                          {selectedAmount.value === item.value && (
                            <CheckCircle className="w-5 h-5 text-[#6CC7FE] ml-auto flex-shrink-0" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ── VOLUNTEER TAB ─────────────────────────────────── */}
        {activeTab === 'volunteer' && (
          <motion.div key="volunteer"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <section className="py-20 bg-[#F8FBFF]">
              <div className="max-w-7xl mx-auto px-6 lg:px-14">
                <Reveal className="text-center max-w-xl mx-auto mb-14">
                  <SectionLabel text="Volunteer With Us" />
                  <h2 className="font-extrabold tracking-[-0.03em] leading-[1.08] mb-3"
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
                    Give Your <span className="text-[#6CC7FE]">Skills.</span>{' '}
                    Change Lives.
                  </h2>
                  <p className="text-[#9CA3AF] text-[14px] leading-relaxed">
                    We match skilled professionals with communities that need
                    exactly what they have to offer. No experience in development
                    required — just the will to serve.
                  </p>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <Reveal direction="left">
                    <h3 className="font-extrabold text-[#0D0D0D] text-[1.1rem] mb-5"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      Volunteer Roles
                    </h3>
                    <div className="flex flex-col gap-3">
                      {VOLUNTEER_ROLES.map((role, i) => (
                        <Reveal key={role.title} delay={i * 0.08}>
                          <motion.div
                            whileHover={{ x: 6, borderColor: '#6CC7FE' }}
                            className="flex items-start gap-4 p-5 rounded-2xl
                              bg-white border border-gray-100
                              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                              transition-all duration-200 cursor-default group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#6CC7FE]/10
                              border border-[#6CC7FE]/20 text-[#6CC7FE]
                              flex items-center justify-center flex-shrink-0
                              group-hover:bg-[#6CC7FE] group-hover:text-white
                              transition-colors duration-200">
                              {role.icon}
                            </div>
                            <div>
                              <p className="font-bold text-[#0D0D0D] text-[14px] mb-0.5"
                                style={{ fontFamily: "'Syne', sans-serif" }}>
                                {role.title}
                              </p>
                              <p className="text-[#9CA3AF] text-[12px] leading-relaxed">
                                {role.desc}
                              </p>
                            </div>
                          </motion.div>
                        </Reveal>
                      ))}
                    </div>
                  </Reveal>

                  <Reveal direction="right" delay={0.1}>
                    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100
                      shadow-[0_8px_40px_rgba(108,199,254,0.1)]">
                      <div className="bg-[#6CC7FE] px-7 py-6 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{
                            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                            backgroundSize: '18px 18px',
                          }} />
                        <div className="relative z-10">
                          <h3 className="text-white font-extrabold text-[1.05rem]"
                            style={{ fontFamily: "'Syne', sans-serif" }}>
                            Apply to Volunteer
                          </h3>
                          <p className="text-white/70 text-[12px] mt-0.5">
                            We'll be in touch within 3 business days
                          </p>
                        </div>
                      </div>

                      <div className="p-7">
                        <AnimatePresence mode="wait">
                          {volSubmitted ? (
                            <motion.div key="success"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex flex-col items-center text-center py-10"
                            >
                              <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-16 h-16 rounded-full bg-[#6CC7FE]/10
                                  border-2 border-[#6CC7FE] flex items-center
                                  justify-center mb-5"
                              >
                                <CheckCircle className="w-8 h-8 text-[#6CC7FE]" />
                              </motion.div>
                              <h3 className="text-[#0D0D0D] font-extrabold text-xl mb-2"
                                style={{ fontFamily: "'Syne', sans-serif" }}>
                                Application Received!
                              </h3>
                              <p className="text-[#9CA3AF] text-[13px] leading-relaxed max-w-xs">
                                Thank you for wanting to serve. Our volunteer
                                coordinator will reach out within 3 business days.
                              </p>
                            </motion.div>
                          ) : (
                            <motion.form key="form" onSubmit={handleVolSubmit}
                              className="flex flex-col gap-4">
                              <FloatingInput id="vol-name" label="Full Name"
                                value={volForm.name} onChange={setVol('name')} />
                              <FloatingInput id="vol-email" label="Email Address" type="email"
                                value={volForm.email} onChange={setVol('email')} />

                              <div className="relative">
                                <select
                                  value={volForm.role}
                                  onChange={e => setVol('role')(e.target.value)}
                                  required
                                  className="w-full bg-[#F8FBFF] border border-gray-200 rounded-xl
                                    px-4 py-4 text-[14px] outline-none appearance-none
                                    focus:border-[#6CC7FE]
                                    focus:shadow-[0_0_0_3px_rgba(108,199,254,0.15)]
                                    transition-all duration-200 text-[#0D0D0D]"
                                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                  <option value="" disabled>Select a volunteer role</option>
                                  {VOLUNTEER_ROLES.map(r => (
                                    <option key={r.title} value={r.title}>{r.title}</option>
                                  ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2
                                  pointer-events-none text-[#9CA3AF]">
                                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path d="M6 9l6 6 6-6" stroke="currentColor"
                                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </div>

                              <div className="relative">
                                <textarea
                                  rows={4}
                                  placeholder="Why do you want to volunteer with WillWay Africa?"
                                  value={volForm.message}
                                  onChange={e => setVol('message')(e.target.value)}
                                  className="w-full bg-[#F8FBFF] border border-gray-200 rounded-xl
                                    px-4 py-3.5 text-[14px] text-[#0D0D0D] outline-none resize-none
                                    placeholder:text-[#C4C9D4]
                                    focus:border-[#6CC7FE]
                                    focus:shadow-[0_0_0_3px_rgba(108,199,254,0.15)]
                                    transition-all duration-200"
                                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                                />
                              </div>

                              <motion.button
                                type="submit" disabled={volLoading}
                                whileHover={!volLoading ? { scale: 1.02 } : {}}
                                whileTap={!volLoading ? { scale: 0.98 } : {}}
                                className="flex items-center justify-center gap-3
                                  bg-[#6CC7FE] text-[#0D0D0D] font-black text-[13px]
                                  py-4 rounded-xl tracking-[0.1em] uppercase
                                  shadow-[0_6px_24px_rgba(108,199,254,0.38)]
                                  transition-all duration-200 disabled:opacity-70
                                  hover:bg-[#45b8f5]"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                              >
                                {volLoading ? (
                                  <>
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                      className="w-4 h-4 border-2 border-[#0D0D0D]/30
                                        border-t-[#0D0D0D] rounded-full"
                                    />
                                    Submitting...
                                  </>
                                ) : (
                                  <> Submit Application <Send className="w-4 h-4" /> </>
                                )}
                              </motion.button>
                            </motion.form>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ── PARTNER TAB ───────────────────────────────────── */}
        {activeTab === 'partner' && (
          <motion.div key="partner"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <section className="py-20 bg-[#F8FBFF]">
              <div className="max-w-7xl mx-auto px-6 lg:px-14">
                <Reveal className="text-center max-w-xl mx-auto mb-14">
                  <SectionLabel text="Partner With Us" />
                  <h2 className="font-extrabold tracking-[-0.03em] leading-[1.08] mb-3"
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
                    Build Something{' '}
                    <span className="text-[#6CC7FE]">Bigger Together.</span>
                  </h2>
                  <p className="text-[#9CA3AF] text-[14px] leading-relaxed">
                    WillWay Africa partners with organisations and individuals
                    who share our commitment to empowering young people. Let's
                    multiply impact together.
                  </p>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
                  {PARTNER_TYPES.map((p, i) => (
                    <Reveal key={p.title} delay={i * 0.1}>
                      <motion.div
                        whileHover={{ y: -6, borderColor: '#6CC7FE',
                          boxShadow: '0 16px 50px rgba(108,199,254,0.18)' }}
                        className="bg-white border border-gray-100 rounded-2xl p-8
                          shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                          transition-all duration-300 cursor-default group h-full flex flex-col"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#6CC7FE]/10
                          border border-[#6CC7FE]/20 text-[#6CC7FE]
                          flex items-center justify-center mb-5
                          group-hover:bg-[#6CC7FE] group-hover:text-white
                          transition-all duration-300">
                          {p.icon}
                        </div>
                        <h3 className="font-extrabold text-[#0D0D0D] text-[1.1rem] mb-3"
                          style={{ fontFamily: "'Syne', sans-serif" }}>
                          {p.title}
                        </h3>
                        <p className="text-[#9CA3AF] text-[13px] leading-relaxed flex-1 mb-6">
                          {p.desc}
                        </p>
                        <div className="flex items-center gap-1.5 text-[#6CC7FE]
                          text-[12px] font-bold group-hover:gap-3 transition-all duration-200">
                          {p.cta} <ChevronRight className="w-4 h-4" />
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.2}>
                  <div className="relative bg-[#6CC7FE] rounded-3xl px-8 py-12
                    md:px-14 overflow-hidden flex flex-col md:flex-row
                    items-center justify-between gap-8">
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                        backgroundSize: '22px 22px',
                      }} />
                    <div className="absolute -top-10 -right-10 w-64 h-64
                      rounded-full bg-white/20 blur-[60px] pointer-events-none" />
                    <div className="relative z-10 max-w-xl">
                      <p className="text-white/75 text-[11px] font-bold
                        tracking-[0.2em] uppercase mb-2">
                        Ready to Partner?
                      </p>
                      <h3 className="text-white font-extrabold leading-[1.15]"
                        style={{ fontFamily: "'Syne', sans-serif",
                          fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
                        Let's Talk About How We Can Build Africa's Future Together.
                      </h3>
                    </div>
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative z-10 flex-shrink-0 bg-white text-[#6CC7FE]
                        font-black text-[13px] px-8 py-4 rounded-xl
                        tracking-[0.08em] uppercase
                        shadow-[0_4px_20px_rgba(0,0,0,0.12)]
                        transition-colors duration-200 whitespace-nowrap
                        hover:bg-[#e8f8ff]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Contact Us →
                    </motion.a>
                  </div>
                </Reveal>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════ */}
      {/* BOTTOM TRUST STRIP                                     */}
      {/* ══════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="flex flex-wrap items-center justify-center gap-10">
            {[
              { num: '20,000+', label: 'Young People Reached' },
              { num: '50+',     label: 'Rural Communities' },
              { num: '100%',    label: 'Transparent Donations' },
              { num: '4',       label: 'Core Programmes' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-[#6CC7FE] text-3xl font-extrabold leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {s.num}
                </p>
                <p className="text-[#9CA3AF] text-[11px] mt-1.5 tracking-[0.1em] uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
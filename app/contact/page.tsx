'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MessageSquare,
  Clock,
  Globe,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'

// ── Reveal on scroll ────────────────────────────────────────────────
function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
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

// ── Floating label input ────────────────────────────────────────────
function FloatingInput({
  id, label, type = 'text', required = false, value, onChange,
}: {
  id: string; label: string; type?: string
  required?: boolean; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <input
        id={id} type={type} required={required} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full bg-[#F8FBFF] border border-gray-200 rounded-xl
          px-4 pt-6 pb-2.5 text-[14px] text-[#0D0D0D] outline-none
          focus:border-[#6CC7FE] focus:shadow-[0_0_0_3px_rgba(108,199,254,0.15)]
          transition-all duration-200"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none font-medium
          transition-all duration-200
          ${active
            ? 'top-2 text-[10px] text-[#6CC7FE] tracking-[0.08em] uppercase'
            : 'top-1/2 -translate-y-1/2 text-[14px] text-[#9CA3AF]'
          }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </label>
    </div>
  )
}

// ── Floating label textarea ─────────────────────────────────────────
function FloatingTextarea({
  id, label, value, onChange,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <textarea
        id={id} rows={5} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full bg-[#F8FBFF] border border-gray-200 rounded-xl
          px-4 pt-7 pb-3 text-[14px] text-[#0D0D0D] outline-none resize-none
          focus:border-[#6CC7FE] focus:shadow-[0_0_0_3px_rgba(108,199,254,0.15)]
          transition-all duration-200"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none font-medium
          transition-all duration-200
          ${active
            ? 'top-2 text-[10px] text-[#6CC7FE] tracking-[0.08em] uppercase'
            : 'top-4 text-[14px] text-[#9CA3AF]'
          }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </label>
    </div>
  )
}

// ── Data ────────────────────────────────────────────────────────────
const INFO_CARDS = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Visit Us',
    lines: ['WillWay Africa HQ', 'Accra, Ghana, West Africa'],
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'Email Us',
    lines: ['info@willwayafrica.org', 'donate@willwayafrica.org'],
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Call Us',
    lines: ['+233 000 000 000', 'Mon – Fri, 8am – 5pm GMT'],
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Office Hours',
    lines: ['Monday – Friday', '8:00 AM – 5:00 PM GMT'],
  },
]

const SOCIALS = [
  { icon: <Facebook  className="w-4 h-4" />, href: '#', label: 'Facebook' },
  { icon: <Twitter   className="w-4 h-4" />, href: '#', label: 'Twitter' },
  { icon: <Linkedin  className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
  { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
  { icon: <Youtube   className="w-4 h-4" />, href: '#', label: 'YouTube' },
]

const SUBJECTS = [
  'General Enquiry',
  'Donation / Fundraising',
  'Volunteering',
  'Partnership',
  'Media / Press',
  'Other',
]

// ════════════════════════════════════════════════════════════════════
export default function Page() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const set = (key: string) => (val: string) =>
    setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── HERO BANNER ────────────────────────────────────── */}
      <section className="relative bg-white pt-20 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px]
          rounded-full bg-[#6CC7FE]/08 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px]
          rounded-full bg-[#6CC7FE]/06 blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
            <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase">
              We'd Love to Hear From You
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold tracking-[-0.03em] leading-[1.06] mb-5"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            }}
          >
            Get in <span className="text-[#6CC7FE]">Touch</span> With Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-[#9CA3AF] text-[15px] leading-[1.8] max-w-lg mx-auto"
          >
            Whether you want to donate, volunteer, partner, or simply learn more —
            our team is ready to connect with you.
          </motion.p>
        </div>
      </section>

      {/* ── INFO CARDS ROW ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5, borderColor: '#6CC7FE',
                  boxShadow: '0 12px 40px rgba(108,199,254,0.15)' }}
                className="bg-white border border-gray-100 rounded-2xl p-6
                  shadow-[0_2px_16px_rgba(0,0,0,0.05)]
                  transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6CC7FE]/10
                  border border-[#6CC7FE]/20 flex items-center justify-center
                  text-[#6CC7FE] mb-4">
                  {card.icon}
                </div>
                <h4
                  className="font-bold text-[#0D0D0D] text-[13px] mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {card.title}
                </h4>
                {card.lines.map(line => (
                  <p key={line} className="text-[#9CA3AF] text-[12px] leading-relaxed">
                    {line}
                  </p>
                ))}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FORM + SIDEBAR ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── Contact Form (3 cols) ───────────────────────── */}
          <Reveal direction="left" className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-3xl
              shadow-[0_8px_40px_rgba(108,199,254,0.1)] overflow-hidden">

              {/* Form header */}
              <div className="bg-[#6CC7FE] px-8 py-7 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3
                      className="text-white font-extrabold text-[1.1rem]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Send Us a Message
                    </h3>
                    <p className="text-white/70 text-[12px]">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className="flex flex-col items-center text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 rounded-full bg-[#6CC7FE]/10
                          border-2 border-[#6CC7FE] flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-[#6CC7FE]" />
                      </motion.div>
                      <h3
                        className="text-[#0D0D0D] font-extrabold text-2xl mb-3"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        Message Sent!
                      </h3>
                      <p className="text-[#9CA3AF] text-[14px] leading-relaxed max-w-sm">
                        Thank you for reaching out. Our team will get back to
                        you within 24 hours.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSubmitted(false)
                          setForm({ firstName: '', lastName: '', email: '',
                            phone: '', subject: '', message: '' })
                        }}
                        className="mt-8 bg-[#6CC7FE] text-white font-bold text-[13px]
                          px-8 py-3.5 rounded-xl tracking-wide
                          shadow-[0_4px_20px_rgba(108,199,254,0.35)]
                          transition-colors hover:bg-[#45b8f5]"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FloatingInput id="firstName" label="First Name" required
                          value={form.firstName} onChange={set('firstName')} />
                        <FloatingInput id="lastName" label="Last Name" required
                          value={form.lastName} onChange={set('lastName')} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FloatingInput id="email" label="Email Address" type="email" required
                          value={form.email} onChange={set('email')} />
                        <FloatingInput id="phone" label="Phone Number (optional)" type="tel"
                          value={form.phone} onChange={set('phone')} />
                      </div>

                      {/* Subject */}
                      <div className="relative">
                        <select
                          value={form.subject}
                          onChange={e => set('subject')(e.target.value)}
                          required
                          className="w-full bg-[#F8FBFF] border border-gray-200 rounded-xl
                            px-4 py-4 text-[14px] outline-none appearance-none
                            focus:border-[#6CC7FE]
                            focus:shadow-[0_0_0_3px_rgba(108,199,254,0.15)]
                            transition-all duration-200 cursor-pointer text-[#0D0D0D]"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <option value="" disabled>Select a subject</option>
                          {SUBJECTS.map(s => (
                            <option key={s} value={s}>{s}</option>
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

                      <FloatingTextarea id="message" label="Your Message"
                        value={form.message} onChange={set('message')} />

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        className="flex items-center justify-center gap-3
                          bg-[#6CC7FE] text-[#0D0D0D] font-black text-[13px]
                          py-4 rounded-xl tracking-[0.1em] uppercase
                          shadow-[0_6px_24px_rgba(108,199,254,0.38)]
                          transition-all duration-200 disabled:opacity-70
                          hover:bg-[#45b8f5] mt-2"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-[#0D0D0D]/30
                                border-t-[#0D0D0D] rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>

                      <p className="text-[#C4C9D4] text-[11px] text-center">
                        By submitting this form, you agree to our{' '}
                        <a href="/privacy" className="text-[#6CC7FE] hover:underline">
                          Privacy Policy
                        </a>.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* ── Right sidebar (2 cols) ──────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Google Map */}
            <Reveal direction="right" delay={0.1}>
              <div className="rounded-3xl overflow-hidden border border-gray-100
                shadow-[0_8px_40px_rgba(108,199,254,0.1)]" style={{ height: '280px' }}>
                <iframe
                  title="WillWay Africa Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254628.79248718!2d-0.3069455!3d5.6036999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%" height="100%"
                  style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Follow us */}
            <Reveal direction="right" delay={0.2}>
              <div className="bg-white border border-gray-100 rounded-3xl p-7
                shadow-[0_4px_20px_rgba(108,199,254,0.08)]">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-[#6CC7FE]" />
                  <h4
                    className="font-bold text-[#0D0D0D] text-[14px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Follow Our Journey
                  </h4>
                </div>
                <p className="text-[#9CA3AF] text-[12px] mb-5 leading-relaxed">
                  Stay updated with our work across Africa.
                </p>
                <div className="flex gap-3">
                  {SOCIALS.map(s => (
                    <motion.a
                      key={s.label} href={s.href} aria-label={s.label}
                      whileHover={{ scale: 1.15, backgroundColor: '#6CC7FE', color: '#fff' }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-[#6CC7FE]/10
                        border border-[#6CC7FE]/20 text-[#6CC7FE]
                        flex items-center justify-center transition-colors duration-200"
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Response promise */}
            <Reveal direction="right" delay={0.3}>
              <div className="relative bg-[#6CC7FE] rounded-3xl p-7 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                    backgroundSize: '18px 18px',
                  }}
                />
                <div className="absolute -top-8 -right-8 w-40 h-40
                  rounded-full bg-white/15 blur-[40px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/20
                    flex items-center justify-center mb-4">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h4
                    className="text-white font-extrabold text-[1.05rem] mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    We Respond Fast
                  </h4>
                  <p className="text-white/70 text-[12px] leading-relaxed">
                    Our team typically responds to all enquiries within{' '}
                    <strong className="text-white">24 hours</strong> on business
                    days. For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer />

    </div>
  )
}
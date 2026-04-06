'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Globe,  Search, Leaf, User } from 'lucide-react'

// ── Reusable scroll-trigger wrapper ────────────────────────────────
function RevealOnScroll({
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
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const initial =
    direction === 'left'
      ? { opacity: 0, x: -60 }
      : direction === 'right'
      ? { opacity: 0, x: 60 }
      : { opacity: 0, y: 50 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Animated blob background ────────────────────────────────────────
function Blob({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{
        borderRadius: [
          '60% 40% 55% 45% / 50% 60% 40% 50%',
          '45% 55% 40% 60% / 60% 40% 55% 45%',
          '60% 40% 55% 45% / 50% 60% 40% 50%',
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute bg-[#6CC7FE]/10 ${className}`}
    />
  )
}

// ── Vision values config with Lucide icons ──────────────────────────
const visionValues = [
  { icon: Globe,  label: 'Community-Led Growth' },
  { icon: User,   label: 'Youth Agency' },
  { icon: Search, label: 'Transparency' },
  { icon: Leaf,   label: 'Sustainability' },
]

export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden py-24 lg:py-32"
    >
      {/* ── Background decoration ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px]
          rounded-full bg-[#6CC7FE]/08 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px]
          rounded-full bg-[#6CC7FE]/06 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">

        {/* ── Section label ─────────────────────────────────── */}
        <RevealOnScroll className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
            <span
              className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              What Drives Us
            </span>
          </div>
          <h2
            className="text-[#0D0D0D] font-extrabold tracking-[-0.03em] leading-[1.08]"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            Our Purpose,{' '}
            <span className="text-[#6CC7FE]">Our Promise.</span>
          </h2>
        </RevealOnScroll>

        {/* ══════════════════════════════════════════════════ */}
        {/* ROW 1 — MISSION: text left | illustration right   */}
        {/* ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20
          items-center mb-24 lg:mb-32">

          {/* Left — text */}
          <RevealOnScroll direction="left" delay={0.1}>
            <div className="flex flex-col">

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-12 h-12 rounded-2xl bg-[#6CC7FE] flex items-center
                  justify-center mb-6 shadow-[0_8px_24px_rgba(108,199,254,0.4)]"
              >
                <span
                  className="text-white font-black text-lg"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  01
                </span>
              </motion.div>

              <h3
                className="font-extrabold leading-[1.05] tracking-[-0.02em] mb-5"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                }}
              >
                <span className="text-[#0D0D0D]">Our</span>
                <br />
                <span className="text-[#6CC7FE]">Mission</span>
              </h3>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="w-16 h-1 bg-[#6CC7FE] rounded-full mb-6 origin-left"
              />

              <p
                className="text-[#374151] text-[16px] leading-[1.85] mb-8 max-w-[480px]"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
              >
                To{' '}
                <strong className="text-[#0D0D0D] font-bold">EMPOWER</strong>{' '}
                young people to spearhead the development of their communities
                through advocacy, social mobilization and mix interventions —
                ensuring no young person is left behind because of where they
                were born.
              </p>

              <div className="flex flex-wrap gap-2">
                {['Advocacy', 'Social Mobilization', 'Community Development', 'Youth Leadership'].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-[#6CC7FE]/10
                      border border-[#6CC7FE]/20 text-[#6CC7FE]
                      text-[11px] font-semibold tracking-wide"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right — illustration */}
          <RevealOnScroll direction="right" delay={0.2}>
            <div className="relative flex items-center justify-center min-h-[360px]">
              {/* Animated blob */}
              <Blob className="w-[340px] h-[320px] top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2" />

              {/* Illustration — rounded image that fills the frame */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-[320px] h-[280px] rounded-2xl overflow-hidden
                  shadow-[0_20px_60px_rgba(108,199,254,0.25)]"
              >
                <Image
                  src="/mission.jpg"
                  alt="Mission illustration"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
                className="absolute -bottom-4 -left-4 z-20 bg-white
                  border border-[#6CC7FE]/20 rounded-2xl px-5 py-4
                  shadow-[0_10px_40px_rgba(108,199,254,0.2)]"
              >
                <p
                  className="text-[#6CC7FE] text-2xl font-extrabold leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  20,000+
                </p>
                <p
                  className="text-[#9CA3AF] text-[11px] mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Young people empowered
                </p>
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* ROW 2 — VISION: illustration left | text right    */}
        {/* ══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20
          items-center">

          {/* Left — illustration (order-2 on mobile) */}
          <RevealOnScroll direction="left" delay={0.1} className="order-2 lg:order-1">
            <div className="relative flex items-center justify-center min-h-[360px]">
              {/* Animated blob */}
              <Blob className="w-[340px] h-[320px] top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2" />

              {/* Illustration — rounded image that fills the frame */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="relative z-10 w-[320px] h-[300px] rounded-2xl overflow-hidden
                  shadow-[0_20px_60px_rgba(108,199,254,0.25)]"
              >
                <Image
                  src="/vision.jpg"
                  alt="Vision illustration"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Floating communities card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
                className="absolute -bottom-4 -right-4 z-20 bg-white
                  border border-[#6CC7FE]/20 rounded-2xl px-5 py-4
                  shadow-[0_10px_40px_rgba(108,199,254,0.2)]"
              >
                <p
                  className="text-[#6CC7FE] text-2xl font-extrabold leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  50+
                </p>
                <p
                  className="text-[#9CA3AF] text-[11px] mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Rural communities served
                </p>
              </motion.div>
            </div>
          </RevealOnScroll>

          {/* Right — text (order-1 on mobile) */}
          <RevealOnScroll direction="right" delay={0.2} className="order-1 lg:order-2">
            <div className="flex flex-col">

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-12 h-12 rounded-2xl bg-[#0D0D0D] flex items-center
                  justify-center mb-6 shadow-[0_8px_24px_rgba(13,13,13,0.2)]"
              >
                <span
                  className="text-white font-black text-lg"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  02
                </span>
              </motion.div>

              <h3
                className="font-extrabold leading-[1.05] tracking-[-0.02em] mb-5"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                }}
              >
                <span className="text-[#0D0D0D]">Our</span>
                <br />
                <span className="text-[#6CC7FE]">Vision</span>
              </h3>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="w-16 h-1 bg-[#0D0D0D] rounded-full mb-6 origin-left"
              />

              <p
                className="text-[#374151] text-[16px] leading-[1.85] mb-8 max-w-[480px]"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
              >
                An Africa, where communities are developed by{' '}
                <strong className="text-[#0D0D0D] font-bold">EMPOWERED</strong>{' '}
                Africans — a continent where every young person has the tools,
                opportunity, and confidence to build the future they deserve.
              </p>

              {/* Vision values — Lucide icons replacing emojis */}
              <div className="grid grid-cols-2 gap-3">
                {visionValues.map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.03, borderColor: '#6CC7FE' }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl
                      border border-gray-100 bg-gray-50/60
                      transition-colors duration-200 cursor-default"
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className="text-[#6CC7FE] flex-shrink-0"
                    />
                    <span
                      className="text-[#374151] text-[12px] font-semibold"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Bottom quote banner ────────────────────────────── */}
        <RevealOnScroll delay={0.1} className="mt-24">
          <div className="relative rounded-3xl bg-[#6CC7FE] overflow-hidden px-8 py-12
            md:px-14 md:py-14 flex flex-col md:flex-row items-center
            justify-between gap-8"
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute -top-10 -right-10 w-64 h-64
              rounded-full bg-white/20 blur-[60px] pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <p
                className="text-white/80 text-[11px] font-bold tracking-[0.2em]
                  uppercase mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Our Core Belief
              </p>
              <p
                className="text-white font-extrabold leading-[1.15] tracking-[-0.02em]"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                }}
              >
                "Africa's greatest asset is its young people. Our job is to make
                sure the world knows it — and acts like it."
              </p>
            </div>

            <motion.a
              href="/about"
              whileHover={{ scale: 1.05, backgroundColor: '#e8f8ff' }}
              whileTap={{ scale: 0.97 }}
              className="relative z-10 flex-shrink-0 bg-white text-[#6CC7FE]
                font-black text-[13px] px-8 py-4 rounded-xl
                tracking-[0.08em] uppercase transition-colors duration-200
                shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Learn More →
            </motion.a>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  BookOpen,
  Heart,
  Sprout,
  Landmark,
  Users,
  Globe,
  GraduationCap,
  Stethoscope,
  HandCoins,
  Vote,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'

// ── Scroll reveal wrapper ───────────────────────────────────────────
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
  const inView = useInView(ref, { once: true, margin: '-70px' })
  const initial =
    direction === 'left' ? { opacity: 0, x: -55 }
    : direction === 'right' ? { opacity: 0, x: 55 }
    : { opacity: 0, y: 48 }

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
      <span
        className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {text}
      </span>
    </div>
  )
}

// ── Real Unsplash images ────────────────────────────────────────────
const INITIATIVE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&fit=crop',
    alt: 'Student studying at night',
  },
  {
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop',
    alt: 'Healthcare workers in Africa',
  },
]

const WHY_IMAGE =
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=700&q=80&fit=crop&crop=face'

const IMPACT_IMAGE =
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80&fit=crop'

// ── Stats for impact ────────────────────────────────────────────────
const IMPACT_POINTS = [
  {
    icon: <Stethoscope className="w-5 h-5 text-[#6CC7FE]" />,
    text: 'Over 20,000 young people in hard-to-reach communities reached through sexual and reproductive health programmes.',
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-[#6CC7FE]" />,
    text: 'We have provided financial support to girls from Primary School to the university level.',
  },
  {
    icon: <HandCoins className="w-5 h-5 text-[#6CC7FE]" />,
    text: 'We have partnered to provide sustainable livelihood projects to women in over 50 rural communities.',
  },
  {
    icon: <Landmark className="w-5 h-5 text-[#6CC7FE]" />,
    text: 'Brought local governance to the doorstep of rural communities.',
  },
]

// ── Why points ──────────────────────────────────────────────────────
const WHY_POINTS = [
  {
    icon: <TrendingUp className="w-5 h-5 text-[#6CC7FE]" />,
    stat: '47%',
    text: '47 percent of those living in extreme poverty are 18 years old or younger.',
  },
  {
    icon: <Users className="w-5 h-5 text-[#6CC7FE]" />,
    stat: '247M',
    text: 'In Sub-Saharan Africa alone, 247 million children are deprived of basic rights.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#6CC7FE]" />,
    stat: null,
    text: 'For children, poverty means being deprived in crucial aspects of their lives such as nutrition, health, water, education or shelter.',
  },
  {
    icon: <Globe className="w-5 h-5 text-[#6CC7FE]" />,
    stat: null,
    text: "Africa's greatest assets are its young people.",
  },
]

export default function WhyInitiativeImpact() {
  return (
    <div className="w-full bg-white overflow-hidden">

      {/* ════════════════════════════════════════════════════ */}
      {/* SECTION 1 — WHY YOUNG PEOPLE & RURAL WOMEN          */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">

        {/* Background dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px]
          rounded-full bg-[#6CC7FE]/06 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14
          grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — text */}
          <Reveal direction="left">
            <SectionLabel text="The Context" />
            <h2
              className="font-extrabold leading-[1.06] tracking-[-0.03em] mb-10"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              }}
            >
              Why{' '}
              <span className="text-[#6CC7FE]">Young People</span>
              <br />
              and Rural Women
            </h2>

            <div className="flex flex-col gap-6">
              {WHY_POINTS.map((point, i) => (
                <Reveal key={i} delay={i * 0.1} direction="left">
                  <motion.div
                    whileHover={{ x: 6, borderColor: '#6CC7FE' }}
                    className="flex items-start gap-4 p-4 rounded-2xl
                      border border-gray-100 bg-gray-50/60
                      transition-all duration-300 cursor-default group"
                  >
                    {/* Icon + stat badge */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#6CC7FE]/10
                        border border-[#6CC7FE]/20 flex flex-col items-center
                        justify-center gap-0.5
                        group-hover:bg-[#6CC7FE]/20 transition-colors duration-200"
                    >
                      {point.icon}
                      {point.stat && (
                        <span
                          className="text-[#6CC7FE] font-extrabold text-[10px] leading-none"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {point.stat}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[#374151] text-[14px] leading-[1.75] pt-1"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {point.text}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Right — real photo */}
          <Reveal direction="right" delay={0.15}>
            <div className="relative">
              {/* Blob behind image */}
              <motion.div
                animate={{
                  borderRadius: [
                    '60% 40% 55% 45% / 50% 60% 40% 50%',
                    '45% 55% 40% 60% / 60% 40% 55% 45%',
                    '60% 40% 55% 45% / 50% 60% 40% 50%',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-4 bg-[#6CC7FE]/10"
              />

              {/* Photo */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 rounded-3xl overflow-hidden
                  shadow-[0_20px_60px_rgba(108,199,254,0.2)]"
                style={{ aspectRatio: '4/5' }}
              >
                <Image
                  src={WHY_IMAGE}
                  alt="Young woman in Africa"
                  fill
                  className="object-cover object-top"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t
                  from-[#0D0D0D]/30 via-transparent to-transparent" />
              </motion.div>

              {/* Floating chip */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
                className="absolute -bottom-6 -left-6 z-20 bg-white
                  rounded-2xl px-5 py-4
                  shadow-[0_12px_40px_rgba(108,199,254,0.25)]
                  border border-[#6CC7FE]/15"
              >
                <p
                  className="text-[#6CC7FE] text-2xl font-extrabold leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  47%
                </p>
                <p
                  className="text-[#9CA3AF] text-[11px] mt-1 max-w-[120px] leading-tight"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  of extreme poor are under 18
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* SECTION 2 — OUR INITIATIVE                          */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-28 bg-[#F8FBFF] overflow-hidden">

        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px]
          rounded-full bg-[#6CC7FE]/06 blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">

          {/* Header — centered */}
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel text="What We Do" />
            <h2
              className="font-extrabold tracking-[-0.03em] leading-[1.08] mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              Our <span className="text-[#6CC7FE]">Initiative</span>
            </h2>
            <p
              className="text-[#6B7280] text-[15px] leading-[1.8]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Education, Preventive Health, Sustainable Livelihood and
              Environmental Protection and Governance — our four pillars of
              change in hard-to-reach communities across Africa.
            </p>
          </Reveal>

          {/* Image grid — two photos side by side with nav arrow */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">

            {INITIATIVE_IMAGES.map((img, i) => (
              <Reveal key={i} direction={i === 0 ? 'left' : 'right'} delay={i * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-3xl overflow-hidden
                    shadow-[0_16px_50px_rgba(0,0,0,0.1)] cursor-pointer"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover object-center transition-transform
                      duration-700 hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t
                    from-[#0D0D0D]/50 via-transparent to-transparent" />

                  {/* Label chip */}
                  <div className="absolute bottom-5 left-5 z-10">
                    <span
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                        bg-white/20 backdrop-blur-sm border border-white/30
                        text-white text-[11px] font-bold tracking-wide"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {i === 0
                        ? <><BookOpen className="w-3.5 h-3.5" /> Education & Digital</>
                        : <><Stethoscope className="w-3.5 h-3.5" /> Health & Wellbeing</>
                      }
                    </span>
                  </div>
                </motion.div>
              </Reveal>
            ))}

            {/* Center nav arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                z-20 w-12 h-12 rounded-full bg-[#6CC7FE]
                shadow-[0_8px_24px_rgba(108,199,254,0.5)]
                flex items-center justify-center cursor-pointer
                hover:scale-110 transition-transform duration-200"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Program pills */}
          <Reveal delay={0.2} className="flex flex-wrap justify-center gap-3 mt-10">
            {[
              { icon: <BookOpen className="w-4 h-4" />, label: 'Education' },
              { icon: <Heart className="w-4 h-4" />, label: 'Preventive Health' },
              { icon: <Sprout className="w-4 h-4" />, label: 'Sustainable Livelihoods' },
              { icon: <Vote className="w-4 h-4" />, label: 'Governance' },
            ].map(p => (
              <motion.span
                key={p.label}
                whileHover={{ scale: 1.05, borderColor: '#6CC7FE', color: '#6CC7FE' }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full
                  border-2 border-gray-200 text-[#374151]
                  text-[13px] font-semibold tracking-wide
                  transition-all duration-200 cursor-default"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {p.icon} {p.label}
              </motion.span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════ */}
      {/* SECTION 3 — OUR IMPACT                              */}
      {/* ════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">

        <div className="absolute -top-24 -right-24 w-[400px] h-[400px]
          rounded-full bg-[#6CC7FE]/06 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14
          grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — real photo */}
          <Reveal direction="left">
            <div className="relative">
              {/* Blob */}
              <motion.div
                animate={{
                  borderRadius: [
                    '55% 45% 60% 40% / 45% 55% 45% 55%',
                    '40% 60% 45% 55% / 55% 45% 60% 40%',
                    '55% 45% 60% 40% / 45% 55% 45% 55%',
                  ],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-4 bg-[#6CC7FE]/08"
              />

              {/* Photo */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="relative z-10 rounded-3xl overflow-hidden
                  shadow-[0_20px_60px_rgba(108,199,254,0.2)]"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={IMPACT_IMAGE}
                  alt="Young woman with books"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t
                  from-[#0D0D0D]/40 via-transparent to-transparent" />
              </motion.div>

              {/* Floating stat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, type: 'spring', stiffness: 180 }}
                className="absolute -bottom-6 -right-6 z-20 bg-[#6CC7FE]
                  rounded-2xl px-5 py-4
                  shadow-[0_12px_40px_rgba(108,199,254,0.4)]"
              >
                <p
                  className="text-white text-2xl font-extrabold leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  50+
                </p>
                <p
                  className="text-white/75 text-[11px] mt-1 max-w-[110px] leading-tight"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  rural communities impacted
                </p>
              </motion.div>
            </div>
          </Reveal>

          {/* Right — impact points */}
          <Reveal direction="right" delay={0.1}>
            <SectionLabel text="Results on the Ground" />
            <h2
              className="font-extrabold leading-[1.06] tracking-[-0.03em] mb-10"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              }}
            >
              Our <span className="text-[#6CC7FE]">Impact</span>
            </h2>

            <div className="flex flex-col gap-5">
              {IMPACT_POINTS.map((point, i) => (
                <Reveal key={i} direction="right" delay={0.1 + i * 0.1}>
                  <motion.div
                    whileHover={{ x: -6, borderColor: '#6CC7FE' }}
                    className="flex items-start gap-4 p-5 rounded-2xl
                      border border-gray-100 bg-gray-50/50
                      transition-all duration-300 cursor-default group"
                  >
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl
                        bg-[#6CC7FE]/10 border border-[#6CC7FE]/20
                        flex items-center justify-center
                        group-hover:bg-[#6CC7FE]/20 transition-colors"
                    >
                      {point.icon}
                    </div>

                    <p
                      className="text-[#374151] text-[14px] leading-[1.75] pt-0.5"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {point.text}
                    </p>

                    {/* Right tick */}
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className="w-5 h-5 rounded-full bg-[#6CC7FE]/15
                          flex items-center justify-center"
                      >
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="#6CC7FE"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal delay={0.5} className="mt-10">
              <motion.a
                href="/impact"
                whileHover={{ scale: 1.04, backgroundColor: '#45b8f5' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-[#6CC7FE]
                  text-[#0D0D0D] font-black text-[13px]
                  px-8 py-4 rounded-xl tracking-[0.1em] uppercase
                  shadow-[0_6px_24px_rgba(108,199,254,0.38)]
                  transition-colors duration-200"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                See Full Impact Report
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </Reveal>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
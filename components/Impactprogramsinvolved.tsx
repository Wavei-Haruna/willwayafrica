'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BookOpen,
  Heart,
  Sprout,
  Vote,
  ChevronRight,
  HandCoins,
  Users,
  Handshake,
} from 'lucide-react'

// ── Scroll reveal ───────────────────────────────────────────────────
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
    direction === 'left' ? { opacity: 0, x: -50 }
    : direction === 'right' ? { opacity: 0, x: 50 }
    : { opacity: 0, y: 44 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Section label ───────────────────────────────────────────────────
function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className={`w-2 h-2 rounded-full animate-pulse ${dark ? 'bg-white' : 'bg-[#6CC7FE]'}`} />
      <span
        className={`text-[11px] font-bold tracking-[0.2em] uppercase ${dark ? 'text-white/60' : 'text-[#6CC7FE]'}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {text}
      </span>
    </div>
  )
}

// ── Data ────────────────────────────────────────────────────────────
const STATS = [
  { num: '20,000+', label: 'Young People Reached',  desc: 'Through health programmes' },
  { num: '50+',     label: 'Rural Communities',      desc: 'Served across the region' },
  { num: '247M',    label: 'Children Deprived',      desc: 'In Sub-Saharan Africa' },
  { num: '47%',     label: 'Of The Extreme Poor',    desc: 'Are 18 years or younger' },
]

const PROGRAMS = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    tag: 'Education Program',
    title: 'Learning Is the Way Out',
    desc: "Evidence-based strategies to give disadvantaged young people the tools they need to learn, grow, and thrive. We don't just open doors — we walk young people through them.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    tag: 'Health Program',
    title: 'Healthy Youth, Stronger Communities',
    desc: 'Equipping young people in rural communities with knowledge, tools, and services to live healthy, productive lives — where conventional systems have failed to reach.',
  },
  {
    icon: <Sprout className="w-6 h-6" />,
    tag: 'Livelihoods Program',
    title: 'Economic Freedom Starts Here',
    desc: 'Supporting rural women and their communities with practical skills, seed funding, and mentorship to build livelihoods that last beyond any single programme.',
  },
  {
    icon: <Vote className="w-6 h-6" />,
    tag: 'Governance Program',
    title: 'Democracy Belongs to Everyone',
    desc: 'Community-centred civic education that builds real, lasting structures for transparency, accountability, and leadership — at the local level, for local people.',
  },
]

const INVOLVE_CARDS = [
  {
    icon: <HandCoins className="w-6 h-6 text-[#6CC7FE]" />,
    tag: 'Donate',
    title: 'Fund the Future',
    desc: 'Every cedi, dollar, and pound goes directly to education bursaries, health programmes, livelihood seed funding, and community tech centres.',
    cta: 'Donate Now',
    href: '/donate',
  },
  {
    icon: <Users className="w-6 h-6 text-[#6CC7FE]" />,
    tag: 'Volunteer',
    title: 'Give Your Skills',
    desc: 'Teacher, doctor, entrepreneur, or tech professional? We connect skilled volunteers with young people who need exactly what you have to offer.',
    cta: 'Become a Volunteer',
    href: '/volunteer',
  },
  {
    icon: <Handshake className="w-6 h-6 text-[#6CC7FE]" />,
    tag: 'Partner',
    title: 'Build With Us',
    desc: "We work with NGOs, government agencies, and corporates to scale impact. If your goals align with ours, let's build something together.",
    cta: 'Explore Partnerships',
    href: '/partner',
  },
]

// ════════════════════════════════════════════════════════════════════
export default function ImpactProgramsInvolved() {
  return (
    <div className="w-full bg-white overflow-hidden">

      {/* ══════════════════════════════════════════════════════ */}
      {/* SECTION 1 — IMPACT STATS                              */}
      {/* ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-28 bg-white overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-24 -right-24 w-[380px] h-[380px]
          rounded-full bg-[#6CC7FE]/06 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">

          {/* Header */}
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel text="Our Impact By the Numbers" />
            <h2
              className="font-extrabold tracking-[-0.03em] leading-[1.08] mb-3"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              Real Change.{' '}
              <span className="text-[#6CC7FE]">Real Numbers.</span>
            </h2>
            <p
              className="text-[#9CA3AF] text-[15px] leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Every number represents a name. Every name, a future reclaimed.
            </p>
          </Reveal>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden
            border border-gray-100 shadow-[0_8px_40px_rgba(108,199,254,0.12)]">
            {STATS.map(({ num, label, desc }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ backgroundColor: '#6CC7FE' }}
                  className="group flex flex-col items-center text-center p-8 lg:p-10
                    bg-white border-r border-b border-gray-100 last:border-r-0
                    transition-colors duration-300 cursor-default h-full"
                >
                  {/* Animated counter number */}
                  <motion.p
                    className="font-extrabold leading-none mb-2
                      text-[#6CC7FE] group-hover:text-white transition-colors duration-300"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    }}
                  >
                    {num}
                  </motion.p>
                  <p
                    className="font-bold text-[#0D0D0D] text-[13px] mb-1
                      group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[#9CA3AF] text-[11px] leading-relaxed
                      group-hover:text-white/70 transition-colors duration-300"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* SECTION 2 — PROGRAMS OVERVIEW                         */}
      {/* ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-28 bg-[#F8FBFF] overflow-hidden">

        <div className="absolute -bottom-20 -left-20 w-[360px] h-[360px]
          rounded-full bg-[#6CC7FE]/06 blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">

          {/* Header */}
          <Reveal className="flex flex-col md:flex-row md:items-end
            justify-between gap-6 mb-14">
            <div>
              <SectionLabel text="Our Programs" />
              <h2
                className="font-extrabold tracking-[-0.03em] leading-[1.08]"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                }}
              >
                Four Programs.{' '}
                <span className="text-[#6CC7FE]">One Mission:</span> Youth.
              </h2>
            </div>
            <p
              className="text-[#9CA3AF] text-[14px] leading-relaxed max-w-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Each program complements the others — because real change is never just one thing.
            </p>
          </Reveal>

          {/* Program cards grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {PROGRAMS.map(({ icon, tag, title, desc }, i) => (
              <Reveal key={tag} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <motion.div
                  whileHover={{ y: -5, borderColor: '#6CC7FE' }}
                  className="group flex flex-col bg-white rounded-2xl p-8
                    border border-gray-100
                    shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                    transition-all duration-300 cursor-pointer h-full"
                >
                  {/* Icon badge */}
                  <div
                    className="w-12 h-12 rounded-xl bg-[#6CC7FE]/10
                      border border-[#6CC7FE]/20 flex items-center justify-center
                      text-[#6CC7FE] mb-5
                      group-hover:bg-[#6CC7FE] group-hover:text-white
                      transition-all duration-300"
                  >
                    {icon}
                  </div>

                  {/* Tag */}
                  <span
                    className="text-[#6CC7FE] text-[10px] font-bold
                      tracking-[0.18em] uppercase mb-3 block"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {tag}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-[#0D0D0D] font-extrabold text-[1.2rem]
                      leading-tight mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {title}
                  </h3>

                  {/* Desc */}
                  <p
                    className="text-[#6B7280] text-[13px] leading-[1.8] flex-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {desc}
                  </p>

                  {/* Learn more */}
                  <div
                    className="flex items-center gap-1.5 mt-6 text-[#6CC7FE]
                      text-[12px] font-bold tracking-wide
                      group-hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* SECTION 3 — GET INVOLVED                              */}
      {/* ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-28 bg-white overflow-hidden">

        <div className="absolute -top-24 -right-24 w-[400px] h-[400px]
          rounded-full bg-[#6CC7FE]/06 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">

          {/* Header */}
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionLabel text="Join the Movement" />
            <h2
              className="font-extrabold tracking-[-0.03em] leading-[1.08] mb-4"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              You Have More Power{' '}
              <span className="text-[#6CC7FE]">Than You Think.</span>
            </h2>
            <p
              className="text-[#9CA3AF] text-[15px] leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Whether you give, volunteer, or spread the word — you become
              part of something that changes lives.
            </p>
          </Reveal>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {INVOLVE_CARDS.map(({ icon, tag, title, desc, cta, href }, i) => (
              <Reveal key={tag} delay={i * 0.12}>
                <motion.a
                  href={href}
                  whileHover={{ y: -6, borderColor: '#6CC7FE',
                    boxShadow: '0 16px 48px rgba(108,199,254,0.18)' }}
                  className="group flex flex-col bg-white rounded-2xl p-8
                    border border-gray-100
                    shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                    transition-all duration-300 cursor-pointer h-full"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl bg-[#6CC7FE]/10
                      border border-[#6CC7FE]/20 flex items-center justify-center
                      mb-5 group-hover:bg-[#6CC7FE]
                      transition-colors duration-300"
                  >
                    <div className="text-[#6CC7FE] group-hover:text-white transition-colors duration-300">
                      {icon}
                    </div>
                  </div>

                  {/* Tag */}
                  <span
                    className="text-[#6CC7FE] text-[10px] font-bold
                      tracking-[0.18em] uppercase mb-3 block"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {tag}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-[#0D0D0D] font-extrabold text-[1.2rem]
                      leading-tight mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {title}
                  </h3>

                  {/* Desc */}
                  <p
                    className="text-[#6B7280] text-[13px] leading-[1.8] flex-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {desc}
                  </p>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1.5 mt-6 text-[#6CC7FE]
                      text-[12px] font-bold tracking-wide
                      group-hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {cta}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          {/* ── Donate CTA banner ─────────────────────────── */}
          <Reveal delay={0.2}>
            <div
              className="relative rounded-3xl bg-[#6CC7FE] overflow-hidden
                px-8 py-10 md:px-14 md:py-12
                flex flex-col md:flex-row items-center justify-between gap-8"
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                  backgroundSize: '22px 22px',
                }}
              />
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-56 h-56
                rounded-full bg-white/20 blur-[60px] pointer-events-none" />

              <div className="relative z-10 max-w-xl">
                <p
                  className="text-white/75 text-[11px] font-bold
                    tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Make a Difference Today
                </p>
                <h3
                  className="text-white font-extrabold leading-[1.15]
                    tracking-[-0.02em]"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                  }}
                >
                  One Child's Future Starts With One Decision.
                </h3>
                <p
                  className="text-white/65 text-[13px] mt-2 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  All donations are used transparently and directly in our programmes.
                  No child left behind.
                </p>
              </div>

              <motion.a
                href="/donate"
                whileHover={{ scale: 1.05, backgroundColor: '#e8f8ff' }}
                whileTap={{ scale: 0.97 }}
                className="relative z-10 flex-shrink-0 bg-white text-[#6CC7FE]
                  font-black text-[13px] px-8 py-4 rounded-xl
                  tracking-[0.1em] uppercase
                  shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                  transition-colors duration-200 whitespace-nowrap"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Donate Today →
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
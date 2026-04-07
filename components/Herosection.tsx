'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ── Rotating headline words ─────────────────────────────────────────
const ROTATING_WORDS = [
  'Sustainable Rural Development',
  'Youth Empowerment',
  'Quality Education',
  'Community Health',
  'Economic Freedom',
]

// ── Stagger variants ────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.13 },
  }),
}

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const mapY        = useTransform(scrollY, [0, 500], ['0%', '8%'])
  const mapOpacity  = useTransform(scrollY, [0, 400], [1, 0.4])
  const contentY    = useTransform(scrollY, [0, 400], ['0%', '10%'])

  // Rotate headline word every 3s
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex(i => (i + 1) % ROTATING_WORDS.length),
      3000
    )
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-72px)] bg-white overflow-hidden
        flex items-center"
    >
      {/* ── SUBTLE DOT GRID TEXTURE ─────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6CC7FE18 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── AMBIENT GLOW top-left ───────────────────────────── */}
      <div className="absolute -top-40 -left-40 w-[560px] h-[560px]
        rounded-full bg-[#6CC7FE]/10 blur-[120px] pointer-events-none" />

      {/* ── MAIN GRID ────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14
        grid grid-cols-1 lg:grid-cols-2 gap-4 items-center
        py-16 lg:py-0 min-h-[calc(100vh-72px)]">

        {/* ─────────────── LEFT — TEXT ─────────────────────── */}
        <motion.div style={{ y: contentY }} className="flex flex-col justify-center">

          {/* Live tag */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="flex items-center gap-2 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
            <span
              className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              WillWay Africa — Transforming Lives
            </span>
          </motion.div>

          {/* Static headline lines */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-[#6CC7FE] font-extrabold leading-[1.06] tracking-[-0.025em]"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.8rem, 5.8vw, 4.5rem)',
            }}
          >
            Research,
            <br />
            Advocacy and
          </motion.h1>

          {/* Rotating / animated third line */}
          <div
            className="overflow-hidden mt-0"
            style={{ height: 'clamp(3.4rem, 6.2vw, 5rem)' }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIndex}
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#6CC7FE] font-extrabold leading-[1.06] tracking-[-0.025em]"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 'clamp(2.8rem, 5.8vw, 4.5rem)',
                }}
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Sub-copy */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="text-[#9CA3AF] text-[15px] leading-[1.85] mt-7 mb-10 max-w-[420px]"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
          >
            Empowering young people in hard-to-reach rural communities across Africa
            through education, health, sustainable livelihoods, and good governance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex flex-wrap gap-4"
          >
            {/* DONATE NOW — matches Figma */}
            <motion.a
              href="/donate"
              whileHover={{ scale: 1.04, backgroundColor: '#45b8f5' }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#6CC7FE] text-[#0D0D0D] font-black text-[13px]
                px-8 py-[14px] rounded-xl tracking-[0.12em] uppercase
                shadow-[0_6px_24px_rgba(108,199,254,0.38)]
                transition-colors duration-200"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Donate Now
            </motion.a>

            {/* Learn More */}
            <motion.a
              href="/programs"
              whileHover={{ borderColor: '#6CC7FE', color: '#6CC7FE', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 border-gray-200 text-[#374151] font-bold text-[13px]
                px-8 py-[14px] rounded-xl tracking-[0.06em] uppercase
                transition-all duration-200"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Our Programs
            </motion.a>
          </motion.div>


        </motion.div>

        {/* ─────────────── RIGHT — AFRICA MAP ──────────────── */}
        <motion.div
          style={{ y: mapY, opacity: mapOpacity }}
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center lg:justify-end
            h-full min-h-[380px] lg:min-h-0"
        >
          {/* Glow behind map */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-3/4 rounded-full bg-[#6CC7FE]/06 blur-[80px]" />
          </div>

          {/* Floating community ping dots */}
          {[
            { top: '20%', left: '40%', delay: 0.2 },
            { top: '42%', left: '57%', delay: 0.6 },
            { top: '60%', left: '44%', delay: 1.0 },
            { top: '33%', left: '50%', delay: 1.4 },
            { top: '52%', left: '36%', delay: 0.9 },
          ].map((dot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + dot.delay, duration: 0.4, type: 'spring' }}
              className="absolute z-10"
              style={{ top: dot.top, left: dot.left }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full
                  rounded-full bg-[#6CC7FE] opacity-50" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5
                  bg-[#6CC7FE]" />
              </span>
            </motion.div>
          ))}

          {/* Floating tooltip card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[18%] right-[4%] z-20
              bg-white border border-[#6CC7FE]/20 rounded-2xl
              shadow-[0_8px_30px_rgba(108,199,254,0.18)]
              px-4 py-3 w-44"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6CC7FE] animate-pulse" />
              <span className="text-[9px] font-bold tracking-widest text-[#6CC7FE] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Live Impact
              </span>
            </div>
            <p className="text-[#0D0D0D] text-xl font-extrabold leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              20,000+
            </p>
            <p className="text-[#9CA3AF] text-[10px] mt-1 leading-tight"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              young people reached
            </p>
            <div className="mt-2.5 h-[3px] rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ delay: 2.2, duration: 1.2, ease: 'easeOut' }}
                className="h-full bg-[#6CC7FE] rounded-full"
              />
            </div>
          </motion.div>

          {/* The map — gentle float */}
          <motion.div
  whileHover={{ scale: 1.05 }}
  className="relative w-full max-w-[600px] transition duration-300
             opacity-50 hover:opacity-100
             hover:drop-shadow-[0_0_30px_rgba(108,199,254,0.9)]"
  style={{ aspectRatio: '4/5' }}
>
  <Image
    src="/map.svg"
    alt="Map of Africa"
    fill
    className="object-contain object-center transition duration-300"
    priority
  />
</motion.div>
        </motion.div>
      </div>

      {/* ── SCROLL MOUSE INDICATOR ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
          className="w-[22px] h-[34px] rounded-full border-2 border-[#6CC7FE]/25
            flex items-start justify-center pt-[6px]"
        >
          <div className="w-[3px] h-[6px] rounded-full bg-[#6CC7FE]/60" />
        </motion.div>
        <span
          className="text-[#C4C9D4] text-[9px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
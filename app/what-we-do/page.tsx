'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'

// ─── Scroll reveal ─────────────────────────────────────────────────
function Reveal({
  children, className = '', delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >{children}</motion.div>
  )
}

// ─── Counter ────────────────────────────────────────────────────────────────
function Counter({ to, suffix = '', decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / 60
    const id = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(id) }
      else setCount(parseFloat(start.toFixed(decimals)))
    }, 16)
    return () => clearInterval(id)
  }, [inView, to, decimals])
  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}</span>
}

// ─── Natural SVG icons ─────────────────────────────────────────────────────
const Icons = {
  education: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 3L2 8l10 5 10-5-10-5z"/>
      <path d="M2 8v7M22 8v7M7 10.5v5a5 5 0 0010 0v-5"/>
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
  livelihoods: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  environment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.83A2 2 0 005.6 22.5C11 22.5 19 19 17 8z"/>
      <path d="M17 8c0 0-1.5 8-8.5 12.5"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
    </svg>
  ),
}

// ─── PILLARS ────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    id: 'education',
    num: '01',
    label: 'Education',
    headline: 'Every child deserves a door worth opening.',
    subline: 'We build it.',
    body: 'From scholarships to coding labs to career counselling — our education programmes don\'t just keep children in school. They ignite ambition, cultivate talent, and produce the next generation of African changemakers.',
    image: '/Education.jpg',
    programs: [
      {
        name: 'Chance for the Youth',
        tagline: 'Learn · Grow · Impact',
        body: 'Full scholarship support for tertiary students from disadvantaged backgrounds — paired with structured training in entrepreneurship, volunteerism, and leadership so graduates give back to their communities.',
      },
      {
        name: 'AfriCode Hub',
        tagline: 'Bridging the Digital Divide',
        body: 'Free mobile computing labs, ICT equipment, and teacher training brought directly to rural schools — turning examinable ICT from a gap into a genuine launchpad for young Africans.',
      },
      {
        name: 'Career Guidance & Counselling',
        tagline: 'Shaping Futures',
        body: 'Final-year Junior High students discover their strengths through mentorship, workshops, and exposure visits — choosing their Senior High path with confidence, not guesswork.',
      },
      {
        name: 'Education-for-All',
        tagline: 'No Child Left Behind',
        body: 'Materials, mentorship, and direct financial support for children kept out of school by poverty. Because access to learning should never depend on a bank balance.',
      },
    ],
  },
  {
    id: 'health',
    num: '02',
    label: 'Preventive Health',
    headline: 'Healthy youth build unbreakable communities.',
    subline: 'We start with prevention.',
    body: 'Guided by SDG 3, our health programmes deliver care where formal systems haven\'t reached — through mobile clinics, digital tools, and community champions who make health personal, local, and lasting.',
    image: '/Preventive-Health.jpg',
    programs: [
      {
        name: 'Operation ReachOut',
        tagline: 'Health to the Last Mile',
        body: 'Mobile community outreach bringing health education and essential services directly to hard-to-reach rural populations — no clinic, no barrier.',
      },
      {
        name: 'Adolescent Health',
        tagline: 'Protecting Young Lives',
        body: 'Sexual and reproductive health programmes grounded in accurate information and values-based education that respects and protects adolescent agency.',
      },
      {
        name: 'Preventive Screening & Early Detection',
        tagline: 'Catch It Early, Save a Life',
        body: 'Mobile screening clinics, school-based detection, and digital follow-up targeting HIV/AIDS, cancer, and other conditions before they become crises.',
      },
      {
        name: 'WASH',
        tagline: 'Safe Water. Dignified Sanitation.',
        body: 'The WillWay Safe Water, Safe Life Initiative improves water access, promotes hygienic practices, and builds sanitation infrastructure in rural and peri-urban communities.',
      },
      {
        name: 'Digital Health & mHealth',
        tagline: 'Technology That Cares',
        body: 'Simple, scalable mobile technology extending preventive care, strengthening community engagement, and ensuring health monitoring where broadband is scarce.',
      },
    ],
  },
  {
    id: 'livelihoods',
    num: '03',
    label: 'Sustainable Livelihoods',
    headline: 'Economic freedom isn\'t given.',
    subline: 'We help people earn it — permanently.',
    body: 'Women head a third of all households and face disproportionate poverty. Our livelihood programmes meet them where they are: practical skills, seed capital, mentorship, and markets that create income that lasts.',
    image: '/Sustainable-Livelihoods.jpg',
    programs: [
      {
        name: 'Empowering Hands',
        tagline: 'Skills That Pay',
        body: 'Vocational and entrepreneurial skills training designed around the real rhythms of rural women\'s lives — low-capital, scalable, and immediately income-generating.',
      },
      {
        name: 'StartRite Africa Initiative',
        tagline: 'Start Right. Grow Right.',
        body: 'Business grooming, seed funding, and intensive mentorship for women entrepreneurs ready to launch sustainable small enterprises from scratch.',
      },
      {
        name: "WillWay Centre for Women's Skills & Enterprise",
        tagline: "A Hub for Women's Potential",
        body: 'A purpose-built vocational hub on a 5-acre site in Ghana\'s Central Region — agribusiness, crafts, and catering training paired with a revolving credit scheme. Phase 1 reaches 100+ women, scaling to 200+.',
      },
      {
        name: 'Skills Training & Microenterprise Development',
        tagline: 'Building From the Ground Up',
        body: 'Targeted skills and microenterprise programmes across 50+ rural communities, giving vulnerable groups the tools for lasting income security and economic resilience.',
      },
    ],
  },
  {
    id: 'environment',
    num: '04',
    label: 'Environment',
    headline: 'The land feeds us.',
    subline: 'We protect it together.',
    body: 'Community-driven environmental programmes that raise awareness, manage water resources, and turn young Africans into stewards — not bystanders — of the ecosystems their futures depend on.',
    image: '/Environment.jpg',
    programs: [
      {
        name: 'Environmental Education & Awareness',
        tagline: 'Know It. Protect It.',
        body: 'Community-based education on climate change, biodiversity, and sustainable land use — turning knowledge into grassroots action that protects Africa\'s natural resources.',
      },
      {
        name: 'Water Resource Management',
        tagline: 'Clean Water. Thriving Communities.',
        body: 'Sustainable watershed management and safe water access programmes protecting natural water sources and the rural communities who depend on them every day.',
      },
    ],
  },
]

// ─── UPDATED STATS — from PDF comments ─────────────────────────────────────
// "Lets update the data":
//  • 412M children in extreme monetary poverty globally
//  • 900M children in multidimensional poverty
//  • 247M children deprived in Sub-Saharan Africa
//  • 47% of extreme poor are 18 or younger
const STATS = [
  { value: 412,  suffix: 'M+', label: 'Children in extreme poverty globally',     sub: 'Living on less than $3/day' },
  { value: 900,  suffix: 'M',  label: 'Children in multidimensional poverty',      sub: 'Lacking food, water, education or healthcare' },
  { value: 247,  suffix: 'M',  label: 'Children deprived in Sub-Saharan Africa',   sub: 'Denied basic rights' },
  { value: 47,   suffix: '%',  label: 'Of the extreme poor are 18 or younger',     sub: 'Children at the heart of the crisis' },
]

// ─── Expandable programme card ───────────────────────────────────────────────
function ProgramCard({
  prog, index, expandedCard, setExpandedCard,
}: {
  prog: { name: string; tagline: string; body: string }
  index: number
  expandedCard: string | null
  setExpandedCard: (name: string | null) => void
}) {
  const isOpen = expandedCard === prog.name
  return (
    <motion.div
      key={prog.name}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden
        ${isOpen
          ? 'border-[#6CC7FE]/40 shadow-[0_16px_50px_rgba(108,199,254,0.15)]'
          : 'border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(108,199,254,0.10)] hover:border-[#6CC7FE]/20'
        }`}
    >
      {/* Always-visible header — click to expand/collapse */}
      <button
        onClick={() => setExpandedCard(isOpen ? null : prog.name)}
        className="w-full text-left px-7 pt-7 pb-5 flex items-start justify-between gap-4 group"
      >
        <div className="flex-1 min-w-0">
          {/* Gold tagline */}
          <p className="text-[#F5A623] text-[10px] font-bold tracking-[0.18em] uppercase mb-2">
            {prog.tagline}
          </p>
          {/* Name */}
          <h4 className="text-[#0D0D0D] font-extrabold text-[16px] leading-snug"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {prog.name}
          </h4>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1
            transition-colors duration-200
            ${isOpen ? 'bg-[#6CC7FE] text-[#0D0D0D]' : 'bg-gray-100 text-[#9CA3AF] group-hover:bg-[#6CC7FE]/10 group-hover:text-[#6CC7FE]'}`}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd"/>
          </svg>
        </motion.div>
      </button>

      {/* Blue divider */}
      <div className="mx-7 h-px bg-gradient-to-r from-[#6CC7FE]/20 via-[#6CC7FE]/10 to-transparent" />

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pt-5 pb-7">
              <p className="text-[#6B7280] text-[13.5px] leading-[1.85]">
                {prog.body}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed preview — one line, fades out — always shown when closed */}
      <AnimatePresence initial={false}>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-7 pb-6 pt-4"
          >
            <p className="text-[#9CA3AF] text-[12.5px] leading-snug line-clamp-2">
              {prog.body}
            </p>
            <p className="mt-3 text-[#6CC7FE] text-[11px] font-bold tracking-[0.15em] uppercase">
              Read more ↓
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
export default function WhatWeDoPage() {
  const [active, setActive] = useState('education')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const current = PILLARS.find(p => p.id === active)!

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ══════════════════════════════════════════ HERO */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#050E16]">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=80&fit=crop"
            alt="WillWay Africa programmes" fill className="object-cover opacity-15" priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#050E16] via-[#050E16]/55 to-[#050E16]/10" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
        <div className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }} />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px]
          rounded-full bg-[#6CC7FE]/06 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px]
          rounded-full bg-[#F5A623]/05 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-28">
          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-8
                bg-[#6CC7FE]/10 border border-[#6CC7FE]/25 rounded-full px-5 py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6CC7FE] animate-pulse" />
              <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                What We Do
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-extrabold leading-[1.05] tracking-[-0.03em] mb-8"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
            >
              Four pillars.{' '}
              <br />
              <span className="text-[#6CC7FE]">One unshakeable</span>
              <br />
              belief in Africa.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="text-white/55 text-[15px] leading-[1.9] max-w-[520px] mb-12"
            >
              Education. Health. Livelihoods. Environment.
              Every programme we run addresses a root cause of poverty and
              unlocks the potential of young Africans in hard-to-reach communities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="flex flex-wrap gap-3"
            >
              {PILLARS.map(p => (
                <motion.button
                  key={p.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setActive(p.id)
                    document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border
                    text-[12px] font-bold tracking-wide uppercase transition-all duration-200
                    ${active === p.id
                      ? 'bg-[#6CC7FE] border-[#6CC7FE] text-[#0D0D0D]'
                      : 'bg-white/06 border-white/15 text-white/65 hover:border-[#6CC7FE]/50 hover:text-[#6CC7FE]'
                    }`}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <span className="opacity-80">{Icons[p.id as keyof typeof Icons]}</span>
                  {p.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ MISSION BANNER */}
      {/* PDF page 1: mission statement to be reviewed time and again */}
      <section className="bg-[#050E16] border-b border-white/05">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-14">
          <Reveal className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Badge */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-[#6CC7FE] flex items-center justify-center
                shadow-[0_4px_20px_rgba(108,199,254,0.45)]">
                <span className="text-[#0D0D0D] font-black text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>01</span>
              </div>
            </div>
            {/* Text */}
            <div className="flex-1">
              <p className="text-[#9CA3AF] text-[11px] font-bold tracking-[0.22em] uppercase mb-3">Our Mission</p>
              <p className="text-white/90 text-[17px] leading-[1.85] max-w-3xl">
                To <span className="font-black text-white">EMPOWER</span> young people to spearhead the development of
                their communities through advocacy, social mobilization and mix interventions —
                ensuring no young person is left behind because of where they were born.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════ STATS — updated per PDF */}
      {/* PDF: 412M, 900M, 247M, 47% */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          {/* Context headline */}
          <Reveal className="pt-14 pb-10 text-center">
            <div className="inline-flex items-center gap-2.5 mb-4
              bg-[#6CC7FE]/08 border border-[#6CC7FE]/15 rounded-full px-5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6CC7FE] animate-pulse" />
              <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.22em] uppercase">
                Why Young People &amp; Rural Women
              </span>
            </div>
            <h2 className="text-[#0D0D0D] font-extrabold tracking-[-0.025em] leading-[1.1] mt-2"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
              The numbers demand urgent action.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 border-t border-gray-100">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}
                className="flex flex-col items-center py-10 px-6 text-center group">
                {/* Big number */}
                <p className="font-extrabold leading-none mb-1"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                    background: 'linear-gradient(135deg, #6CC7FE 0%, #45b8f5 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                {/* Label */}
                <p className="text-[#0D0D0D] font-bold text-[12px] leading-snug mb-1 mt-2">
                  {s.label}
                </p>
                {/* Sub */}
                <p className="text-[#9CA3AF] text-[10.5px] leading-snug tracking-wide">
                  {s.sub}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Context note below stats */}
          <Reveal className="py-8 text-center border-t border-gray-100">
            <p className="text-[#6B7280] text-[13px] leading-relaxed max-w-2xl mx-auto">
              Of the 412 million children living in extreme monetary poverty, the vast majority are
              concentrated in Sub-Saharan Africa and South Asia.{' '}
              <span className="font-bold text-[#0D0D0D]">
                Sub-Saharan Africa alone accounts for roughly 300+ million children in extreme poverty
              </span>{' '}
              — about three-quarters of the global total. Africa's greatest assets are its young people.
            </p>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════ PILLAR TABS */}
      <section id="pillars" className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          {/* Tabs */}
          <Reveal className="flex flex-wrap gap-0 mb-16 border-b border-gray-200">
            {PILLARS.map(p => (
              <button
                key={p.id}
                onClick={() => { setActive(p.id); setExpandedCard(null) }}
                className={`relative flex items-center gap-2.5 px-6 py-4
                  text-[13px] font-bold tracking-wide transition-all duration-200
                  ${active === p.id ? 'text-[#0D0D0D]' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <span className={`transition-colors duration-200
                  ${active === p.id ? 'text-[#6CC7FE]' : 'text-current'}`}>
                  {Icons[p.id as keyof typeof Icons]}
                </span>
                {p.label}
                {active === p.id && (
                  <motion.div
                    layoutId="tab-line"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#6CC7FE] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </Reveal>

          {/* Active pillar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Intro grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

                {/* Text */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-black select-none leading-none"
                      style={{ fontFamily: "'Syne', sans-serif", fontSize: '4rem',
                        color: '#6CC7FE', opacity: 0.15 }}>
                      {current.num}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#6CC7FE]/20 to-transparent" />
                  </div>

                  <h2 className="text-[#0D0D0D] font-extrabold leading-[1.1] tracking-[-0.025em]"
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)' }}>
                    {current.headline}
                  </h2>
                  <h2 className="font-extrabold leading-[1.1] tracking-[-0.025em] mb-6"
                    style={{ fontFamily: "'Syne', sans-serif",
                      fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)', color: '#6CC7FE' }}>
                    {current.subline}
                  </h2>

                  {/* Gold rule */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-[3px] w-10 rounded-full bg-[#F5A623]" />
                    <div className="h-[3px] w-4 rounded-full bg-[#F5A623]/30" />
                  </div>

                  <p className="text-[#6B7280] text-[15px] leading-[1.9] mb-8">
                    {current.body}
                  </p>

                  <motion.a
                    href="/donate"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-[#6CC7FE] text-[#0D0D0D]
                      font-black text-[12px] px-7 py-3.5 rounded-xl tracking-[0.1em] uppercase
                      shadow-[0_4px_24px_rgba(108,199,254,0.35)]
                      hover:bg-[#45b8f5] transition-colors duration-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Support this pillar
                    {Icons.arrow}
                  </motion.a>
                </div>

                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden
                  shadow-[0_20px_70px_rgba(0,0,0,0.12)]" style={{ aspectRatio: '16/10' }}>
                  <Image src={current.image} alt={current.label} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/50 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                      bg-white/15 backdrop-blur-md border border-white/25
                      text-white text-[12px] font-bold"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      <span className="text-[#6CC7FE]">{Icons[current.id as keyof typeof Icons]}</span>
                      {current.label}
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 w-14 h-14 rounded-2xl
                    bg-[#6CC7FE] flex flex-col items-center justify-center
                    shadow-[0_4px_16px_rgba(108,199,254,0.5)]">
                    <span className="text-[#0D0D0D] font-black text-xl leading-none"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {current.programs.length}
                    </span>
                    <span className="text-[#0D0D0D]/60 text-[9px]">prog.</span>
                  </div>
                </div>
              </div>

              {/* Programme cards — expandable, no routing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {current.programs.map((prog, i) => (
                  <ProgramCard
                    key={prog.name}
                    prog={prog}
                    index={i}
                    expandedCard={expandedCard}
                    setExpandedCard={setExpandedCard}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════ ALL PILLARS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 mb-5
              bg-[#6CC7FE]/08 border border-[#6CC7FE]/15 rounded-full px-5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6CC7FE] animate-pulse" />
              <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.22em] uppercase">
                The Full Picture
              </span>
            </div>
            <h2 className="text-[#0D0D0D] font-extrabold tracking-[-0.025em] leading-[1.1] mt-3"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Every programme. Every pillar.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((pillar, pi) => (
              <Reveal key={pillar.id} delay={pi * 0.1}>
                <motion.div
                  whileHover={{ y: -5, borderColor: '#6CC7FE' }}
                  onClick={() => {
                    setActive(pillar.id)
                    document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group relative bg-[#FAFAFA] rounded-2xl p-6 pb-8
                    border border-gray-100 cursor-pointer
                    hover:shadow-[0_12px_40px_rgba(108,199,254,0.12)]
                    transition-all duration-300 overflow-hidden"
                >
                  {/* Ghost number */}
                  <span className="absolute top-3 right-5 text-5xl font-black select-none leading-none
                    text-[#6CC7FE] opacity-[0.06]"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {pillar.num}
                  </span>

                  {/* Blue → gold top bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] rounded-full
                    bg-gradient-to-r from-[#6CC7FE] to-[#F5A623]
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5
                    bg-[#6CC7FE]/10 text-[#6CC7FE]">
                    {Icons[pillar.id as keyof typeof Icons]}
                  </div>

                  <h4 className="text-[#0D0D0D] font-extrabold text-[15px] mb-4"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {pillar.label}
                  </h4>

                  <ul className="space-y-2.5">
                    {pillar.programs.map(prog => (
                      <li key={prog.name}
                        className="flex items-start gap-2 text-[12.5px] text-[#6B7280]">
                        <div className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0 bg-[#F5A623]" />
                        {prog.name}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-[11px] font-bold tracking-wide uppercase
                    text-[#9CA3AF] group-hover:text-[#6CC7FE] transition-colors duration-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    View pillar →
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ CTA */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden bg-[#050E16]
              px-8 py-16 md:px-16 flex flex-col md:flex-row
              items-center justify-between gap-10">

              <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #6CC7FE 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }} />
              <div className="absolute -top-24 -left-24 w-80 h-80
                rounded-full bg-[#6CC7FE]/10 blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64
                rounded-full bg-[#F5A623]/08 blur-[80px] pointer-events-none" />

              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[2px] w-8 rounded-full bg-[#F5A623]" />
                  <p className="text-[#F5A623] text-[11px] font-bold tracking-[0.22em] uppercase">
                    Be Part of the Story
                  </p>
                </div>
                <h3 className="text-white font-extrabold leading-[1.1] tracking-[-0.025em]"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.3rem)' }}>
                  Every programme runs on the belief of people like you.{' '}
                  <span className="text-[#6CC7FE]">Support our work today.</span>
                </h3>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <motion.a href="/donate"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="bg-[#6CC7FE] text-[#0D0D0D] font-black text-[13px]
                    px-8 py-4 rounded-xl tracking-[0.1em] uppercase
                    shadow-[0_6px_28px_rgba(108,199,254,0.4)]
                    hover:bg-[#45b8f5] transition-colors whitespace-nowrap"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Donate Now →
                </motion.a>
                <motion.a href="/get-involved"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="bg-white/08 border-2 border-white/20 text-white
                    font-black text-[13px] px-8 py-4 rounded-xl
                    tracking-[0.1em] uppercase hover:bg-white/15
                    transition-colors whitespace-nowrap"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Get Involved
                </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
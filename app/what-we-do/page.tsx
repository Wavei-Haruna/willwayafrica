'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'
import {
  BookOpen, Heart, Sprout, Leaf,
  ChevronRight, ArrowRight, CheckCircle,
  Monitor, Compass, GraduationCap,
  Stethoscope, Baby, Droplets, Smartphone,
  HandCoins, Rocket, Building2, Wrench,
  TreePine, Waves, Users, Globe,
} from 'lucide-react'

// ── Scroll reveal ───────────────────────────────────────────────────
function Reveal({
  children, className = '', delay = 0, direction = 'up',
}: {
  children: React.ReactNode; className?: string
  delay?: number; direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const initial =
    direction === 'left'  ? { opacity: 0, x: -50 }
    : direction === 'right' ? { opacity: 0, x: 50 }
    : { opacity: 0, y: 44 }
  return (
    <motion.div ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >{children}</motion.div>
  )
}

// ── Pill label ──────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
      <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
    </div>
  )
}

// ── PILLAR DATA ─────────────────────────────────────────────────────
const PILLARS = [
  {
    id: 'education',
    icon: <BookOpen className="w-6 h-6" />,
    label: 'Education',
    headline: 'Empowering Young Minds to Reach Their Full Potential',
    body: 'We inspire and equip children and youths to discover their talents through structured, supportive platforms. Our dynamic, lifelong education programs help them develop skills, confidence, and opportunities to build meaningful lives and contribute to a thriving, brighter Africa.',
    color: '#6CC7FE',
    bg: 'bg-[#EBF7FF]',
    darkBg: 'bg-[#0a2a3d]',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&fit=crop',
    programs: [
      {
        icon: <GraduationCap className="w-5 h-5" />,
        name: 'Chance for the Youth',
        tagline: 'Learn, Grow, Impact',
        href: '/programs/education/chance-for-the-youth',
        summary: 'Supporting tertiary students from disadvantaged backgrounds in Ghana to pursue degrees and become enterprising professionals who contribute to Africa\'s development.',
      },
      {
        icon: <Monitor className="w-5 h-5" />,
        name: 'AfriCode Hub',
        tagline: 'Bridging the Digital Divide',
        href: '/programs/education/africode-hub',
        summary: 'A free mobile computing and IT skills program equipping rural schools with tools, teacher training, and hands-on coding sessions to foster digital inclusion.',
      },
      {
        icon: <Compass className="w-5 h-5" />,
        name: 'Career Guidance & Counselling',
        tagline: 'Shaping Futures',
        href: '/programs/education/career-guidance',
        summary: 'Empowering final-year Junior High students to explore their strengths and make informed Senior High School program choices through mentorship and workshops.',
      },
      {
        icon: <BookOpen className="w-5 h-5" />,
        name: 'Education-for-All',
        tagline: 'Every Child Deserves a Chance to Learn',
        href: '/programs/education/education-for-all',
        summary: 'Ensuring every child of school-going age has access to education by targeting those out of school due to financial challenges and providing materials, mentorship, and guidance.',
      },
    ],
  },
  {
    id: 'health',
    icon: <Heart className="w-6 h-6" />,
    label: 'Preventive Health',
    headline: 'Healthy Youth, Stronger Communities',
    body: 'Our health initiatives equip young people in rural communities with the knowledge, tools, and services to live healthy, productive lives — delivering care where conventional health systems have never reached.',
    color: '#f472b6',
    bg: 'bg-[#FFF0F7]',
    darkBg: 'bg-[#3d0a20]',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80&fit=crop',
    programs: [
      {
        icon: <Globe className="w-5 h-5" />,
        name: 'Operation ReachOut',
        tagline: 'Taking Health to the Last Mile',
        href: '/programs/health/operation-reachout',
        summary: 'Community outreach delivering health education and services directly to hard-to-reach rural populations across Africa.',
      },
      {
        icon: <Baby className="w-5 h-5" />,
        name: 'Adolescent Health',
        tagline: 'Protecting Young Lives',
        href: '/programs/health/adolescent-health',
        summary: 'Comprehensive sexual and reproductive health programmes supporting adolescents with information, counselling, and youth-friendly services.',
      },
      {
        icon: <Stethoscope className="w-5 h-5" />,
        name: 'Preventive Screening & Early Detection',
        tagline: 'Catch It Early, Save a Life',
        href: '/programs/health/screening',
        summary: 'Mobile health screening and early detection services targeting HIV/AIDS, cancer, and other preventable conditions in underserved communities.',
      },
      {
        icon: <Droplets className="w-5 h-5" />,
        name: 'WASH',
        tagline: 'Clean Water. Safe Sanitation. Better Health.',
        href: '/programs/health/wash',
        summary: 'Water, Sanitation and Hygiene programmes improving access to clean water and safe sanitation practices in rural communities.',
      },
      {
        icon: <Smartphone className="w-5 h-5" />,
        name: 'Digital Health & mHealth',
        tagline: 'Technology for Better Health Outcomes',
        href: '/programs/health/digital-health',
        summary: 'Leveraging mobile technology and digital platforms to extend health services, information, and monitoring to remote communities.',
      },
    ],
  },
  {
    id: 'livelihoods',
    icon: <Sprout className="w-6 h-6" />,
    label: 'Sustainable Livelihoods',
    headline: 'Economic Freedom Starts Here',
    body: 'Female-headed households make up an estimated third of all households worldwide — and they remain the largest poverty-afflicted group. WillWay supports rural women and communities with practical skills, seed funding, and mentorship to build livelihoods that last.',
    color: '#34d399',
    bg: 'bg-[#EDFBF4]',
    darkBg: 'bg-[#0a2d1e]',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80&fit=crop',
    programs: [
      {
        icon: <HandCoins className="w-5 h-5" />,
        name: 'Empowering Hands',
        tagline: 'Skills That Pay the Bills',
        href: '/programs/livelihoods/empowering-hands',
        summary: 'Vocational and entrepreneurial skills training for rural women, providing low-capital, scalable income opportunities that fit into their daily realities.',
      },
      {
        icon: <Rocket className="w-5 h-5" />,
        name: 'StartRite Africa Initiative',
        tagline: 'Start Right, Grow Right',
        href: '/programs/livelihoods/startrite',
        summary: 'Business grooming, seed funding, and mentorship support for women entrepreneurs to launch and scale sustainable small enterprises.',
      },
      {
        icon: <Building2 className="w-5 h-5" />,
        name: "WillWay Centre for Women's Skills & Enterprise",
        tagline: 'A Hub for Women\'s Potential',
        href: '/programs/livelihoods/willway-centre',
        summary: 'A dedicated centre providing training, resources, and solidarity group support systems that keep women accountable and economically connected.',
      },
      {
        icon: <Wrench className="w-5 h-5" />,
        name: 'Skills Training & Microenterprise Development',
        tagline: 'Building Enterprises from the Ground Up',
        href: '/programs/livelihoods/skills-training',
        summary: 'Targeted skills training and microenterprise development programmes empowering women in over 50 rural communities across the region.',
      },
    ],
  },
  {
    id: 'environment',
    icon: <Leaf className="w-6 h-6" />,
    label: 'Environment',
    headline: 'Protecting Africa\'s Natural Future',
    body: 'Our environmental programmes build awareness, practical skills, and sustainable systems that protect Africa\'s ecosystems while creating green livelihood opportunities for young people and rural communities.',
    color: '#a3e635',
    bg: 'bg-[#F4FBEA]',
    darkBg: 'bg-[#1a2d0a]',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80&fit=crop',
    programs: [
      {
        icon: <TreePine className="w-5 h-5" />,
        name: 'Environmental Education & Awareness',
        tagline: 'Know Your Environment, Protect Your Future',
        href: '/programs/environment/education',
        summary: 'Community-based environmental education programmes raising awareness on climate change, biodiversity, and sustainable land use practices.',
      },
      {
        icon: <Waves className="w-5 h-5" />,
        name: 'Water Resource Management',
        tagline: 'Clean Water for Thriving Communities',
        href: '/programs/environment/water',
        summary: 'Programmes focused on sustainable management of water resources, protecting watersheds, and ensuring access to safe water for rural communities.',
      },
    ],
  },
]

// Unsplash images for program cards
const PROGRAM_IMAGES: Record<string, string> = {
  'Chance for the Youth':              'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=75&fit=crop',
  'AfriCode Hub':                      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=75&fit=crop',
  'Career Guidance & Counselling':     'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=75&fit=crop',
  'Education-for-All':                 'https://images.unsplash.com/photo-1594708767771-a5e9d3012f0e?w=600&q=75&fit=crop',
  'Operation ReachOut':                'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=75&fit=crop',
  'Adolescent Health':                 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=600&q=75&fit=crop',
  'Preventive Screening & Early Detection': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=600&q=75&fit=crop',
  'WASH':                              'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&q=75&fit=crop',
  'Digital Health & mHealth':          'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=75&fit=crop',
  'Empowering Hands':                  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=75&fit=crop',
  'StartRite Africa Initiative':       'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=75&fit=crop',
  "WillWay Centre for Women's Skills & Enterprise": 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=75&fit=crop',
  'Skills Training & Microenterprise Development':  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=75&fit=crop',
  'Environmental Education & Awareness': 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=75&fit=crop',
  'Water Resource Management':          'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&q=75&fit=crop',
}

// ════════════════════════════════════════════════════════════════════
export default function Page() {
  const [activePillar, setActivePillar] = useState('education')
  const current = PILLARS.find(p => p.id === activePillar)!

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ══════════════════════════════════════════════════════ */}
      {/* HERO                                                   */}
      {/* ══════════════════════════════════════════════════════ */}
      <section className="relative bg-white pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #6CC7FE22 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px]
          rounded-full bg-[#6CC7FE]/07 blur-[130px] pointer-events-none" />
        <div className="absolute top-10 right-0 w-[400px] h-[400px]
          rounded-full bg-[#6CC7FE]/05 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
                <span className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.2em] uppercase">
                  Our Programmes
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-extrabold tracking-[-0.03em] leading-[1.05] mb-6"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}
              >
                Four Pillars.{' '}
                <br />
                <span className="text-[#6CC7FE]">One Mission.</span>
                <br />
                Endless Impact.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[#6B7280] text-[15px] leading-[1.85] max-w-lg mb-10"
              >
                WillWay Africa works across Education, Preventive Health,
                Sustainable Livelihoods, and the Environment — delivering
                programmes that address the root causes of poverty and
                unlock the potential of every young African.
              </motion.p>

              {/* Pillar selector cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="grid grid-cols-2 gap-3"
              >
                {PILLARS.map(p => (
                  <motion.button
                    key={p.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActivePillar(p.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl
                      border-2 text-left transition-all duration-200
                      ${activePillar === p.id
                        ? 'border-[#6CC7FE] bg-[#6CC7FE]/08 shadow-[0_4px_20px_rgba(108,199,254,0.2)]'
                        : 'border-gray-100 bg-white hover:border-[#6CC7FE]/40'
                      }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                      flex-shrink-0 transition-colors duration-200
                      ${activePillar === p.id
                        ? 'bg-[#6CC7FE] text-white'
                        : 'bg-gray-100 text-[#9CA3AF]'
                      }`}>
                      {p.icon}
                    </div>
                    <span className={`text-[13px] font-bold transition-colors duration-200
                      ${activePillar === p.id ? 'text-[#0D0D0D]' : 'text-[#6B7280]'}`}
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {p.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Right — animated pillar image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative hidden lg:block"
              >
                {/* Blob */}
                <motion.div
                  animate={{ borderRadius: [
                    '60% 40% 55% 45% / 50% 60% 40% 50%',
                    '45% 55% 40% 60% / 60% 40% 55% 45%',
                    '60% 40% 55% 45% / 50% 60% 40% 50%',
                  ]}}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-6 bg-[#6CC7FE]/08"
                />
                <div className="relative z-10 rounded-3xl overflow-hidden
                  shadow-[0_24px_70px_rgba(108,199,254,0.2)]"
                  style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={current.image} alt={current.label}
                    fill className="object-cover" priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t
                    from-[#0D0D0D]/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2
                      rounded-full bg-white/20 backdrop-blur-md
                      border border-white/30 text-white text-[12px] font-bold">
                      {current.icon}
                      {current.label}
                    </span>
                  </div>
                </div>

                {/* Floating stat */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="absolute -bottom-5 -left-5 z-20 bg-white
                    rounded-2xl px-5 py-4
                    shadow-[0_8px_30px_rgba(108,199,254,0.2)]
                    border border-[#6CC7FE]/15"
                >
                  <p className="text-[#6CC7FE] text-2xl font-extrabold leading-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {current.programs.length}
                  </p>
                  <p className="text-[#9CA3AF] text-[11px] mt-0.5">
                    Active programmes
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* PILLAR DETAIL — animated on tab switch               */}
      {/* ══════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Pillar intro band */}
          <section className={`${current.bg} py-16`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-14">
              <div className="max-w-3xl">
                <SectionLabel text={current.label} />
                <h2 className="font-extrabold tracking-[-0.03em] leading-[1.08] mb-4"
                  style={{ fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                  {current.headline}
                </h2>
                <p className="text-[#6B7280] text-[15px] leading-[1.85]">
                  {current.body}
                </p>
              </div>
            </div>
          </section>

          {/* Programs grid */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-14">
              <Reveal className="mb-12">
                <h3 className="font-extrabold text-[#0D0D0D] tracking-[-0.02em]"
                  style={{ fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
                  Our <span className="text-[#6CC7FE]">{current.label}</span> Programmes
                </h3>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {current.programs.map((prog, i) => (
                  <Reveal key={prog.name} delay={i * 0.1}
                    direction={i % 2 === 0 ? 'left' : 'right'}>
                    <Link href={prog.href}>
                      <motion.div
                        whileHover={{ y: -6,
                          boxShadow: '0 20px 60px rgba(108,199,254,0.18)',
                          borderColor: '#6CC7FE' }}
                        className="group relative bg-white border border-gray-100
                          rounded-3xl overflow-hidden
                          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                          transition-all duration-300 cursor-pointer"
                      >
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={PROGRAM_IMAGES[prog.name] ??
                              `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=75&fit=crop`}
                            alt={prog.name}
                            fill
                            className="object-cover transition-transform duration-500
                              group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t
                            from-[#0D0D0D]/60 via-[#0D0D0D]/10 to-transparent" />

                          {/* Icon badge */}
                          <div className="absolute top-4 left-4 z-10
                            w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md
                            border border-white/30 flex items-center justify-center
                            text-white">
                            {prog.icon}
                          </div>

                          {/* Tagline over image */}
                          <div className="absolute bottom-4 left-4 right-4 z-10">
                            <span className="text-[#6CC7FE] text-[10px] font-bold
                              tracking-[0.15em] uppercase">
                              {prog.tagline}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h4 className="font-extrabold text-[#0D0D0D] text-[1.05rem]
                            leading-tight mb-3"
                            style={{ fontFamily: "'Syne', sans-serif" }}>
                            {prog.name}
                          </h4>
                          <p className="text-[#6B7280] text-[13px] leading-[1.8] mb-5">
                            {prog.summary}
                          </p>
                          <div className="flex items-center gap-2 text-[#6CC7FE]
                            text-[12px] font-bold
                            group-hover:gap-3 transition-all duration-200">
                            Learn more
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ALL PILLARS OVERVIEW STRIP                            */}
      {/* ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8FBFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <SectionLabel text="All Our Work" />
            <h2 className="font-extrabold tracking-[-0.03em] leading-[1.08]"
              style={{ fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
              Every Programme, Every Pillar
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((pillar, pi) => (
              <Reveal key={pillar.id} delay={pi * 0.1}>
                <motion.div
                  whileHover={{ y: -5, borderColor: '#6CC7FE' }}
                  className="bg-white rounded-2xl p-6 border border-gray-100
                    shadow-[0_2px_16px_rgba(0,0,0,0.05)]
                    transition-all duration-300"
                >
                  {/* Pillar header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#6CC7FE]/10
                      border border-[#6CC7FE]/20 text-[#6CC7FE]
                      flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <h4 className="font-extrabold text-[#0D0D0D] text-[14px]"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {pillar.label}
                    </h4>
                  </div>

                  {/* Program list */}
                  <ul className="space-y-2.5">
                    {pillar.programs.map(prog => (
                      <li key={prog.name}>
                        <Link href={prog.href}
                          className="flex items-center gap-2.5 text-[12px]
                            text-[#6B7280] hover:text-[#6CC7FE]
                            transition-colors duration-200 group/item">
                          <CheckCircle className="w-3.5 h-3.5 text-[#6CC7FE]
                            flex-shrink-0 opacity-60
                            group-hover/item:opacity-100 transition-opacity" />
                          {prog.name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    onClick={() => {
                      setActivePillar(pillar.id)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="mt-6 w-full flex items-center justify-center gap-2
                      bg-[#6CC7FE]/10 hover:bg-[#6CC7FE] text-[#6CC7FE]
                      hover:text-white text-[12px] font-bold py-2.5 rounded-xl
                      border border-[#6CC7FE]/20 hover:border-[#6CC7FE]
                      transition-all duration-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Explore {pillar.label}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════ */}
      {/* BOTTOM CTA                                            */}
      {/* ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
            <div className="relative bg-[#6CC7FE] rounded-3xl px-8 py-14
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
                <p className="text-white/70 text-[11px] font-bold
                  tracking-[0.2em] uppercase mb-3">
                  Be Part of the Change
                </p>
                <h3 className="text-white font-extrabold leading-[1.12]
                  tracking-[-0.02em]"
                  style={{ fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
                  Every programme is powered by people like you. Support our work today.
                </h3>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row
                gap-3 flex-shrink-0">
                <motion.a href="/donate"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="bg-white text-[#6CC7FE] font-black text-[13px]
                    px-8 py-4 rounded-xl tracking-[0.08em] uppercase
                    shadow-[0_4px_20px_rgba(0,0,0,0.12)]
                    hover:bg-[#e8f8ff] transition-colors whitespace-nowrap"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Donate Now →
                </motion.a>
                <motion.a href="/get-involved"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="bg-white/15 border-2 border-white/40 text-white
                    font-black text-[13px] px-8 py-4 rounded-xl
                    tracking-[0.08em] uppercase hover:bg-white/25
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
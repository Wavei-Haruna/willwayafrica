'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'

// ─── Scroll reveal ──────────────────────────────────────────────────────────
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

// ─── SVG Icons ──────────────────────────────────────────────────────────────
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
  check: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M3 8l3.5 3.5L13 4.5"/>
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
  grad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 3L2 8l10 5 10-5-10-5z"/>
      <path d="M7 10.5v5a5 5 0 0010 0v-5"/>
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 11l19-9-9 19-2-8-8-2z"/>
    </svg>
  ),
  recycle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="1 4 1 10 7 10"/>
      <polyline points="23 20 23 14 17 14"/>
      <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>
    </svg>
  ),
}

// ─── ACCENT COLOR — single source of truth ──────────────────────────────────
// Your globals.css defines --chart-1 as the warm amber/yellow accent.
// We use CSS vars throughout; the only inline colour is the accent for decorative
// elements that can't be expressed as a Tailwind CSS-var utility.
// Blue  → var(--chart-2)  (oklch(0.6 0.118 184.704) ≈ sky blue)
// Amber → var(--chart-1)  (oklch(0.646 0.222 41.116) ≈ amber/gold)
// Both come from globals.css — no hardcoded hex.

const PILLARS = [
  {
    id: 'education',
    num: '01',
    label: 'Education',
    headline: 'Empowering Young Minds to Reach Their Full Potential',
    subline: 'Building skills, confidence & opportunity.',
    body: 'We inspire and equip children and youths to discover their talents through structured, supportive platforms. Our dynamic, lifelong education programs help them develop skills, confidence, and opportunities to build meaningful lives and contribute to a thriving, brighter Africa.',
    image: '/Education.jpg',
    programs: [
      {
        name: 'Chance for the Youth',
        tagline: 'Learn · Grow · Impact',
        body: 'This program supports tertiary students from disadvantaged backgrounds in Ghana, enabling them to pursue their chosen degrees. In partnership with Kusomesa, a Canada-based charity, it nurtures students to become enterprising professionals who contribute to poverty reduction and Africa\'s development.\n\nAlongside their formal studies, students participate in structured training during vacations, focusing on entrepreneurship, volunteerism, and community engagement. Collaborating with industry partners, the program equips them with practical skills and prepares them for real-world opportunities beyond the classroom.',
        hasEligibility: true,
        eligibility: {
          criteria: [
            'Open to students seeking financial support for tertiary education in Ghana.',
            'Applicants must demonstrate genuine need and commitment to their studies.',
          ],
          steps: [
            { title: 'Formal Expression of Interest', body: 'Submit a request via email. Queries through other channels (phone, social media, personal outreach) must be followed up with a formal email.' },
            { title: 'Request for Additional Information', body: 'WillWay may ask for further details if the initial submission is incomplete.' },
            { title: 'Applicant Profile Form (APF)', body: 'Upon receipt of required information, students complete the APF.' },
            { title: 'Background Verification', body: 'WillWay conducts checks to verify submitted details and assess genuine need.' },
            { title: 'Nomination for Final Approval', body: 'Eligible applicants are submitted to Kusomesa for final selection based on the Board-approved number of beneficiaries.' },
          ],
        },
        howYouCanHelp: [
          { icon: 'dollar',     label: 'Financial Support',              items: ['Full or partial scholarships (tuition, accommodation, books)', 'Sponsor specific groups (girls, rural students, STEM learners)', 'Create endowment funds for long-term sustainability'] },
          { icon: 'grad',       label: 'Academic Support',               items: ['Fund tutoring, mentoring, and remedial classes', 'Provide learning materials (laptops, books, internet access)', 'Support research, innovation, or project-based learning'] },
          { icon: 'handshake',  label: 'Mentorship & Career Development',items: ['Offer mentorship programmes (career guidance, life skills)', 'Organize internships, apprenticeships, or job placements', 'Host career talks, networking sessions, and exposure visits'] },
          { icon: 'building',   label: 'Institutional Capacity Building',items: ['Support schools with infrastructure (libraries, labs, classrooms)', 'Train teachers and programme staff', 'Improve programme monitoring and evaluation systems'] },
          { icon: 'heart',      label: 'Wellbeing & Holistic Support',   items: ['Provide health insurance or medical support', 'Fund psychosocial support and counseling services', 'Support feeding programmes or stipends for basic needs'] },
          { icon: 'chart',      label: 'Monitoring, Evaluation & Impact',items: ['Fund data collection and impact assessments', 'Support digital systems for tracking student progress', 'Help scale successful models'] },
          { icon: 'megaphone',  label: 'Advocacy & Visibility',          items: ['Promote the programme to attract more partners', 'Support awareness campaigns', 'Help mobilize additional funding or partnerships'] },
          { icon: 'recycle',    label: 'Sustainability & Alumni Support', items: ['Fund entrepreneurship or skills training for graduates', 'Support alumni networks', 'Provide seed funding for graduate-led initiatives'] },
        ],
      },
      {
        name: 'AfriCode Hub',
        tagline: 'Bridging the Digital Divide',
        body: 'AfriCode Hub is a free, innovative mobile computing and IT skills program designed to bridge the digital divide between children in rural and urban communities across Africa. The initiative equips schools—especially in underserved areas—with the tools, resources, and training needed to integrate modern ICT into teaching and learning.\n\nMany schools in deprived communities lack the facilities and resources to teach ICT effectively, despite it being an examinable subject in the final year of Basic Education.',
        bullets: [
          'Mobile computing labs and ICT equipment',
          'Teacher training in modern IT pedagogy',
          'Hands-on coding, programming, and digital literacy sessions for students',
          'Practical application of technology to support learning across subjects',
        ],
        bulletFooter: 'By empowering both students and schools, AfriCode Hub fosters digital inclusion, strengthens education outcomes, and prepares young Africans to thrive in a technology-driven world.',
      },
      {
        name: 'Career Guidance & Counselling',
        tagline: 'Shaping Futures',
        body: 'WillWay empowers final-year Junior High students in Ghana to explore their strengths and talents, guiding them to select the right programs for Senior High School. The program supports learners, facilitators, and parents through mentorship, workshops, skills training, and exposure visits, helping students gain practical insights and confidence. Parents, teachers, and communities are actively engaged to foster holistic development. Your support provides the resources, tools, and opportunities that transform dreams into reality.',
      },
      {
        name: 'Education-for-All',
        tagline: 'Every Child Deserves a Chance to Learn',
        body: 'Education-for-All ensures every child of school-going age has access to education, targeting those out of school due to financial challenges and supporting disadvantaged students to stay in school. The program provides educational materials, mentorship, and guidance to help vulnerable children progress successfully. Your support can help transform lives and ensure that no child is left behind.',
      },
    ],
  },
  {
    id: 'health',
    num: '02',
    label: 'Preventive Health',
    headline: 'Sustainable rural development starts with health.',
    subline: 'Wellbeing for women, children & youth.',
    body: 'At WillWay Africa, we believe sustainable rural development starts with health. Guided by SDG 3, we prioritize the wellbeing of women, children, and youth to build inclusive, healthy, and sustainable communities across Africa.',
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
        body: 'To improve the sexual and reproductive health and overall wellbeing of adolescents through access to accurate information, preventive services, and values-based education that promotes safe and responsible decision-making.',
      },
      {
        name: 'Preventive Screening, Early Detection & Treatment',
        tagline: 'Catch It Early, Save a Life',
        body: 'Preventive Screening, Early Detection, and Treatment focuses on identifying health risks early, enabling timely intervention, and preventing disease progression to improve overall community health outcomes.',
        bullets: [
          'Mobile health clinics',
          'Community outreach campaigns',
          'School-based screening programmes',
          'Collaboration with local health facilities',
          'Digital health tracking systems for follow-up',
        ],
      },
      {
        name: 'WASH',
        tagline: 'Safe Water. Dignified Sanitation.',
        body: "WillWay Safe Water, Safe Life Initiative — WillWay Africa's Water, Sanitation, and Hygiene (WASH) activity focuses on improving community health by ensuring access to safe water, promoting proper sanitation, and encouraging hygienic practices in rural and peri-urban communities.",
      },
      {
        name: 'Digital Health & mHealth Programs',
        tagline: 'Technology That Cares',
        body: "WillWay Africa's Digital Health & mHealth Programme uses simple and scalable technology to strengthen preventive healthcare delivery, improve community engagement, and ensure continuous care through data-driven and mobile-based solutions.",
      },
    ],
  },
  {
    id: 'livelihoods',
    num: '03',
    label: 'Sustainable Livelihoods',
    headline: 'Empowering vulnerable groups for lasting income security.',
    subline: 'Skills, enterprise & resilience.',
    body: 'This is a well-tailored programme designed to address the specific needs of target communities by empowering vulnerable groups to achieve lasting income security and resilience through skills development, sustainable entrepreneurship, and inclusive economic opportunities.',
    image: '/Sustainable-Livelihoods.jpg',
    programs: [
      {
        name: 'Empowering Hands',
        tagline: 'Skills That Pay',
        body: "Vocational and entrepreneurial skills training designed around the real rhythms of rural women's lives — low-capital, scalable, and immediately income-generating.",
      },
      {
        name: 'StartRite Africa Initiative',
        tagline: 'Start Right. Grow Right.',
        body: 'Business grooming, seed funding, and intensive mentorship for women entrepreneurs ready to launch sustainable small enterprises from scratch.',
      },
      {
        name: "WillWay Centre for Women's Skills & Enterprise",
        tagline: "A Hub for Women's Potential",
        body: "WillWay Africa is launching a flagship initiative—the WillWay Centre for Women's Skills & Enterprise (WCWSE)—a purpose-built multi-skilled vocational and enterprise hub in Ghana's Central Region, situated on a 5-acre site, designed to unlock the economic potential of women and girls.\n\nThe Centre will deliver hands-on training in agribusiness, crafts, and catering, integrated with entrepreneurship development, mentorship, and access to a revolving credit scheme. This holistic approach ensures that beneficiaries transition beyond training into sustainable income generation and enterprise growth.\n\nDesigned for long-term impact and financial sustainability, the Centre will incorporate income-generating production units in food processing and crafts, creating a self-sustaining model that supports ongoing operations and future expansion.\n\nWith an initial reach of 100 women and girls, scaling to 200+, this 18–24 month Phase 1 investment presents a compelling opportunity for donors to support infrastructure development, skills acquisition, and women's economic empowerment through a scalable and sustainable model that delivers measurable impact.",
        isFlagship: true,
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
    headline: 'Community-driven projects protecting natural resources.',
    subline: 'Sustainability for future generations.',
    body: 'At WillWay Africa, we design and implement community-driven environmental projects that promote sustainability, improve public health, and empower local populations to protect their natural resources for future generations.',
    image: '/Environment.jpg',
    programs: [
      {
        name: 'Environmental Education & Awareness Programs',
        tagline: 'Know It. Protect It.',
        body: "Community-based education on climate change, biodiversity, and sustainable land use — turning knowledge into grassroots action that protects Africa's natural resources.",
      },
      {
        name: 'Water Resource Management Programs',
        tagline: 'Clean Water. Thriving Communities.',
        body: 'Sustainable watershed management and safe water access programmes protecting natural water sources and the rural communities who depend on them every day.',
      },
    ],
  },
]

const STATS = [
  { value: 412, suffix: 'M+', label: 'Children in extreme poverty globally',   sub: 'Living on less than $3/day' },
  { value: 900, suffix: 'M',  label: 'Children in multidimensional poverty',    sub: 'Lacking food, water, education or healthcare' },
  { value: 247, suffix: 'M',  label: 'Children deprived in Sub-Saharan Africa', sub: 'Denied basic rights' },
  { value: 47,  suffix: '%',  label: 'Of the extreme poor are 18 or younger',   sub: 'Children at the heart of the crisis' },
]

// ─── Eligibility Step ────────────────────────────────────────────────────────
function EligibilityStep({ step, index }: { step: { title: string; body: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 group"
    >
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center
          text-primary-foreground font-black text-[12px]"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {index + 1}
        </div>
        {index < 4 && <div className="w-px flex-1 bg-border mt-1" />}
      </div>
      <div className="pb-5">
        <p className="text-foreground font-bold text-[13px] mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}>{step.title}</p>
        <p className="text-muted-foreground text-[12.5px] leading-[1.75]">{step.body}</p>
      </div>
    </motion.div>
  )
}

// ─── How You Can Help card ───────────────────────────────────────────────────
function HelpCategoryCard({ cat }: { cat: { icon: string; label: string; items: string[] } }) {
  const iconEl = Icons[cat.icon as keyof typeof Icons] ?? Icons.check
  return (
    <div className="bg-secondary/40 rounded-2xl border border-border
      p-5 hover:border-primary/40 hover:shadow-md
      transition-all duration-300 group">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center
          group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
          {iconEl}
        </div>
        <p className="text-foreground font-extrabold text-[12px] leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}>{cat.label}</p>
      </div>
      <ul className="space-y-1.5">
        {cat.items.map(item => (
          <li key={item} className="flex items-start gap-2 text-[11.5px] text-muted-foreground leading-snug">
            <span className="flex-shrink-0 text-chart-1 mt-[2px]">
              <svg viewBox="0 0 8 8" fill="currentColor" className="w-2 h-2"><circle cx="4" cy="4" r="4"/></svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Expandable Programme Card ───────────────────────────────────────────────
function ProgramCard({
  prog,
  index,
}: {
  prog: {
    name: string
    tagline: string
    body: string
    bullets?: string[]
    bulletFooter?: string
    hasEligibility?: boolean
    eligibility?: {
      criteria: string[]
      steps: { title: string; body: string }[]
    }
    howYouCanHelp?: {
      icon: string
      label: string
      items: string[]
    }[]
    isFlagship?: boolean
  }
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const paragraphs = prog.body.split('\n\n').filter(Boolean)

  const previewText =
    paragraphs.join(' ').length > 180
      ? paragraphs.join(' ').slice(0, 180) + '...'
      : paragraphs.join(' ')

  return (
    <motion.div
      key={prog.name}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`bg-card rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden
        ${prog.isFlagship ? 'md:col-span-2' : ''}
        border-border shadow-sm hover:shadow-md hover:border-primary/20`}
    >
      {/* Flagship badge */}
      {prog.isFlagship && (
        <div className="bg-chart-1 px-7 py-2.5 flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5 text-white"
          >
            <path d="M8 1l1.854 3.756L14 5.517l-3 2.923.708 4.126L8 10.5l-3.708 1.953.708-4.126L2 5.517l4.146-.761L8 1z" />
          </svg>
          <span
            className="text-white text-[10px] font-black tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Flagship Initiative
          </span>
        </div>
      )}

      {/* Header */}
      <div className="px-7 pt-7 pb-5">
        <p className="text-chart-1 text-[10px] font-bold tracking-[0.18em] uppercase mb-2">
          {prog.tagline}
        </p>

        <h4
          className="text-foreground font-extrabold text-[16px] leading-snug"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {prog.name}
        </h4>
      </div>

      <div className="mx-7 h-px bg-border" />

      {/* Content */}
      <div className="px-7 py-5">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-muted-foreground text-[13px] leading-[1.85]">
                {previewText}
              </p>

              <button
                onClick={() => setIsExpanded(true)}
                className="mt-4 text-primary text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
              >
                Read More →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-4 overflow-hidden"
            >
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-muted-foreground text-[13.5px] leading-[1.85]"
                >
                  {para}
                </p>
              ))}

              {prog.bullets && (
                <ul className="space-y-2 pt-1">
                  {prog.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[13px] text-foreground"
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary
                        flex items-center justify-center mt-0.5"
                      >
                        {Icons.check}
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {prog.bulletFooter && (
                <p className="text-muted-foreground text-[13px] leading-[1.85] pt-1 italic">
                  {prog.bulletFooter}
                </p>
              )}

              {prog.hasEligibility && prog.eligibility && (
                <div className="pt-4 space-y-6">
                  <div className="bg-secondary/60 rounded-2xl border border-border p-5">
                    <p
                      className="text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-3"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      WillWay Scholarship — Eligibility
                    </p>

                    <ul className="space-y-2">
                      {prog.eligibility.criteria.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2 text-[13px] text-foreground leading-snug"
                        >
                          <span className="flex-shrink-0 text-chart-1 mt-0.5">
                            <svg
                              viewBox="0 0 8 8"
                              fill="currentColor"
                              className="w-2 h-2"
                            >
                              <circle cx="4" cy="4" r="4" />
                            </svg>
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p
                      className="text-foreground font-black text-[12px] tracking-[0.15em] uppercase mb-4"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Application Steps
                    </p>

                    <div className="space-y-0">
                      {prog.eligibility.steps.map((step, si) => (
                        <EligibilityStep
                          key={step.title}
                          step={step}
                          index={si}
                        />
                      ))}
                    </div>
                  </div>

                  {prog.howYouCanHelp && (
                    <div>
                      <p
                        className="text-foreground font-black text-[12px] tracking-[0.15em] uppercase mb-4"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        How You Can Help
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {prog.howYouCanHelp.map((cat) => (
                          <HelpCategoryCard
                            key={cat.label}
                            cat={cat}
                          />
                        ))}
                      </div>

                      <div className="mt-5 rounded-xl bg-foreground p-4 flex items-center justify-between gap-4">
                        <p className="text-background/70 text-[12px] leading-snug">
                          Ready to support? Complete the{' '}
                          <span className="text-primary font-bold">
                            Donor Support Form
                          </span>{' '}
                          to get started.
                        </p>

                        <a
                          href="/donate"
                          className="flex-shrink-0 bg-primary text-primary-foreground font-black text-[11px]
                          px-5 py-2.5 rounded-lg tracking-[0.1em] uppercase whitespace-nowrap
                          hover:opacity-90 transition-opacity duration-200"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          Donate →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setIsExpanded(false)}
                className="pt-2 text-primary text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-80 transition-opacity"
              >
                Show Less ↑
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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

  // Scroll to anchor on mount if hash is present
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && PILLARS.find(p => p.id === hash)) {
      setActive(hash)
      setTimeout(() => {
        document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ══════ HERO ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-foreground">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=80&fit=crop"
            alt="WillWay Africa programmes" fill className="object-cover " priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/60 to-foreground/10" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />

        {/* Dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            color: 'var(--primary)',
          }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 py-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-8
                bg-primary/15 border border-primary/30 rounded-full px-5 py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                What We Do
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-background font-extrabold leading-[1.05] tracking-[-0.03em] mb-8"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
            >
              Four pillars.{' '}
              <br />
              <span className="text-primary">One unshakeable</span>
              <br />
              belief in Africa.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="text-background/55 text-[15px] leading-[1.9] max-w-[520px] mb-12"
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
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background/8 border-background/20 text-background/65 hover:border-primary/60 hover:text-primary'
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

      {/* ══════ MISSION BANNER ════════════════════════════════════════════════ */}
      <section className="bg-primary border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-14">
          <Reveal className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-black text-lg"
                  style={{ fontFamily: "'Syne', sans-serif" }}>01</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-background/50 text-[11px] font-bold tracking-[0.22em] uppercase mb-3">Our Mission</p>
              <p className="text-background/90 text-[17px] leading-[1.85] max-w-3xl">
                To <span className="font-black text-background">EMPOWER</span> young people to spearhead the development of
                their communities through advocacy, social mobilization and mix interventions —
                ensuring no young person is left behind because of where they were born.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════ STATS ═════════════════════════════════════════════════════════ */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal className="pt-14 pb-10 text-center">
            <div className="inline-flex items-center gap-2.5 mb-4
              bg-primary/8 border border-primary/20 rounded-full px-5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-[11px] font-bold tracking-[0.22em] uppercase">
                Why Young People &amp; Rural Women
              </span>
            </div>
            <h2 className="text-foreground font-extrabold tracking-[-0.025em] leading-[1.1] mt-2"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
              The numbers demand urgent action.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border border-t border-border">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}
                className="flex flex-col items-center py-10 px-6 text-center">
                <p className="font-extrabold leading-none mb-1 text-primary"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-foreground font-bold text-[12px] leading-snug mb-1 mt-2">{s.label}</p>
                <p className="text-muted-foreground text-[10.5px] leading-snug tracking-wide">{s.sub}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="py-8 text-center border-t border-border">
            <p className="text-muted-foreground text-[13px] leading-relaxed max-w-2xl mx-auto">
              Of the 412 million children living in extreme monetary poverty, the vast majority are
              concentrated in Sub-Saharan Africa and South Asia.{' '}
              <span className="font-bold text-foreground">
                Sub-Saharan Africa alone accounts for roughly 300+ million children in extreme poverty
              </span>{' '}
              — about three-quarters of the global total. Africa's greatest assets are its young people.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════ PILLAR TABS ═══════════════════════════════════════════════════ */}
      <section id="pillars" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

          {/* Tab bar */}
          <Reveal className="flex flex-wrap gap-0 mb-16 border-b border-border">
            {PILLARS.map(p => (
              <button
                key={p.id}
                onClick={() => { setActive(p.id); setExpandedCard(null) }}
                className={`relative flex items-center gap-2.5 px-6 py-4
                  text-[13px] font-bold tracking-wide transition-all duration-200
                  ${active === p.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'}`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <span className={`transition-colors duration-200
                  ${active === p.id ? 'text-primary' : 'text-current'}`}>
                  {Icons[p.id as keyof typeof Icons]}
                </span>
                {p.label}
                {active === p.id && (
                  <motion.div
                    layoutId="tab-line"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </Reveal>

          {/* Active pillar content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Intro: text + image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-black select-none leading-none text-primary/15"
                      style={{ fontFamily: "'Syne', sans-serif", fontSize: '4rem' }}>
                      {current.num}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>

                  <h2 className="text-foreground font-extrabold leading-[1.1] tracking-[-0.025em]"
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.7rem, 3.2vw, 2.6rem)' }}>
                    {current.headline}
                  </h2>
                  <h2 className="text-primary font-extrabold leading-[1.1] tracking-[-0.025em] mb-6"
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)' }}>
                    {current.subline}
                  </h2>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-[3px] w-10 rounded-full bg-chart-1" />
                    <div className="h-[3px] w-4 rounded-full bg-chart-1/30" />
                  </div>

                  <p className="text-muted-foreground text-[15px] leading-[1.9] mb-8">{current.body}</p>

                  <motion.a
                    href="/donate"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                      font-black text-[12px] px-7 py-3.5 rounded-xl tracking-[0.1em] uppercase
                      shadow-md hover:opacity-90 transition-opacity duration-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Support this pillar
                    {Icons.arrow}
                  </motion.a>
                </div>

                {/* Pillar image */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl"
                  style={{ aspectRatio: '16/10' }}>
                  <Image src={current.image} alt={current.label} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                      bg-background/15 backdrop-blur-md border border-background/25
                      text-background text-[12px] font-bold"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      <span className="text-primary">{Icons[current.id as keyof typeof Icons]}</span>
                      {current.label}
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 w-14 h-14 rounded-2xl
                    bg-primary flex flex-col items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-black text-xl leading-none"
                      style={{ fontFamily: "'Syne', sans-serif" }}>
                      {current.programs.length}
                    </span>
                    <span className="text-primary-foreground/60 text-[9px]">prog.</span>
                  </div>
                </div>
              </div>

              {/* Programme cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {current.programs.map((prog, i) => (
                  <ProgramCard
                    key={prog.name}
                    prog={prog as any}
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

      {/* ══════ ALL PILLARS OVERVIEW ══════════════════════════════════════════ */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 mb-5
              bg-primary/8 border border-primary/20 rounded-full px-5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-[11px] font-bold tracking-[0.22em] uppercase">
                The Full Picture
              </span>
            </div>
            <h2 className="text-foreground font-extrabold tracking-[-0.025em] leading-[1.1] mt-3"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Every programme. Every pillar.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((pillar, pi) => (
              <Reveal key={pillar.id} delay={pi * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setActive(pillar.id)
                    document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group relative bg-background rounded-2xl p-6 pb-8
                    border border-border cursor-pointer
                    hover:border-primary/40 hover:shadow-lg
                    transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute top-3 right-5 text-5xl font-black select-none
                    leading-none text-primary opacity-[0.06]"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {pillar.num}
                  </span>
                  {/* Hover top border */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] rounded-full
                    bg-primary scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300 origin-left" />

                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5
                    bg-primary/10 text-primary">
                    {Icons[pillar.id as keyof typeof Icons]}
                  </div>
                  <h4 className="text-foreground font-extrabold text-[15px] mb-4"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {pillar.label}
                  </h4>
                  <ul className="space-y-2.5">
                    {pillar.programs.map(prog => (
                      <li key={prog.name}
                        className="flex items-start gap-2 text-[12.5px] text-muted-foreground">
                        <div className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0 bg-chart-1" />
                        {prog.name}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[11px] font-bold tracking-wide uppercase
                    text-muted-foreground group-hover:text-primary transition-colors duration-200"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    View pillar →
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden bg-background/60 border border-border shadow-xl
              px-8 py-16 md:px-16 flex flex-col md:flex-row
              items-center justify-between gap-10">

              {/* Dot pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                  color: 'var(--primary)',
                }} />

              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[2px] w-8 rounded-full bg-chart-1" />
                  <p className="text-chart-1 text-[11px] font-bold tracking-[0.22em] uppercase">
                    Be Part of the Story
                  </p>
                </div>
                <h3 className="text-foreground font-extrabold leading-[1.1] tracking-[-0.025em]"
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.3rem)' }}>
                  Every programme runs on the belief of people like you.{' '}
                  <span className="text-primary">Support our work today.</span>
                </h3>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <motion.a href="/donate"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="bg-primary text-primary-foreground font-black text-[13px]
                    px-8 py-4 rounded-xl tracking-[0.1em] uppercase
                    shadow-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Donate Now →
                </motion.a>
                <motion.a href="/get-involved"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                  className="bg-secondary border-2 border-background/20 text-background
                    font-black text-[13px] px-8 py-4 rounded-xl
                    tracking-[0.1em] uppercase hover:bg-background/15
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
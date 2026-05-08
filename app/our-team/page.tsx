'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Linkedin, Mail, ChevronDown } from 'lucide-react'
import Navbar from '@/components/Navbar'


// ── Team Data ──────────────────────────────────────────────────────
const TEAM = [
  {
  name: 'Samuel Ohene Kwapong',
  role: 'Executive Director, WillWay Africa',
  tag: 'Leadership',

  bio: `Samuel Ohene Kwapong is a visionary development leader with over 25 years of experience driving socio-economic transformation across Ghana. As Executive Director of WillWay Africa, he provides strategic leadership and advances the organisation’s mission to empower vulnerable communities through sustainable and inclusive development.`,

  impact: `Under his leadership, WillWay Africa has expanded its impact through high-value programmes and international collaborations, including:`,

  programs: [
    "USAID Ghana Local Governance and Decentralization Program (LOGODEP) – strengthening local governance systems and enhancing citizen participation",
    "MTV Staying Alive Ghana Projects – promoting youth-led health and wellness initiatives through media and community engagement",
    "Ghana AIDS Commission Interventions – supporting HIV/AIDS awareness, prevention, and community-based outreach in rural Ghana",
    "AfriCode Hub – advancing digital inclusion and equipping young people with technical skills",
    "Women’s Enterprise Support – empowering women through vocational training, entrepreneurship, and financial literacy"
  ],

  closing: `Samuel is widely recognised for translating grassroots challenges into scalable, results-driven interventions with strong expertise in partnership development, programme design, and institutional growth. He is a firm advocate for African-led solutions that place women and youth at the centre of sustainable development.`,

  featured: true,
},
  {
    name: 'Miriam Nortey',
    role: 'Director, Grants Operations & Evaluation',
    tag: 'Finance',
    bio: 'Miriam is a Chartered Accountant and Tax Consultant formerly with PricewaterhouseCoopers Ghana. She has offered services to public, private, national and multinational companies across sectors and holds an MBA Finance option from Linnaeus University, Sweden. A high achiever and conscientious Manager, Miriam leads budget development, fiscal monitoring and grant administration at WillWay Africa.',
    featured: false,
  },
  {
    name: 'Ing. Uniben Yao Ayikoe Tettey (PhD)',
    role: 'Manager, Learning & Resource Mobilization',
    tag: 'Research',
    bio: 'Uniben is a Post Doctoral Fellow at the Department of Built Environment and Energy Technology, Linnaeus University, Sweden. A source of inspiration to economically disadvantaged youth across Africa, his rare talent, selfless nature and integrity make him a great asset to WillWay. He spearheads all research works that feed into programmes and leads resource mobilisation for the organisation.',
    featured: false,
  },
  {
    name: 'Ing. William Kodzo Amelorku',
    role: 'Environmental & Social Safeguards Specialist',
    tag: 'Green Projects',
    bio: 'William heads WillWay\'s Green Project, championing Research, Proposal Development, Training and Advocacy. He has extensive knowledge in Environmental Management including ESIA and ERA. His certified engineering background empowers him to lead projects with excellence and timeliness. He consults for Alpha Engineering Services Ltd, the Centre for Environment, Health Research and Training, and various local and international organisations.',
    featured: false,
  },
  {
    name: 'Deborah Anaglatey',
    role: 'Manager, Gender & Development',
    tag: 'Social Development',
    bio: 'Deborah is a dynamic and innovative social entrepreneur who rose from scholarship beneficiary to volunteer to full team member. She leads research, proposal development and project implementation across all departments including Finance, M&E and Fundraising. Her passion for vulnerable groups has equipped her with skills to work with children, women\'s groups, transgender youth, people living with HIV/AIDS and the Physically Challenged.',
    featured: false,
  },
]

// ── Tag colors ────────────────────────────────────────────────────
const TAG_COLORS: Record<string, string> = {
  Leadership:         'bg-[#6CC7FE]/15 text-[#1a8fd1]',
  Finance:            'bg-emerald-50 text-emerald-700',
  Research:           'bg-violet-50 text-violet-700',
  'Green Projects':   'bg-lime-50 text-lime-700',
  'Social Development':'bg-rose-50 text-rose-700',
}

// ── Fade-up variant ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

// ── Avatar with logo ──────────────────────────────────────────────
function Avatar({ featured }: { featured: boolean }) {
  return (
    <div
      className={`
        relative flex items-center justify-center rounded-full
        bg-gradient-to-br from-[#e8f6ff] to-[#b3e1ff]
        border-4 border-white shadow-[0_8px_32px_rgba(108,199,254,0.22)]
        overflow-hidden
        ${featured ? 'w-28 h-28' : 'w-20 h-20'}
      `}
    >
      {/* Subtle inner ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#6CC7FE]/20 pointer-events-none" />
      <Image
        src="/logo.png"
        alt="WillWay Africa"
        width={featured ? 72 : 52}
        height={featured ? 72 : 52}
        className="object-contain rounded-full"
      />
    </div>
  )
}

// ── Bio Expand Toggle ─────────────────────────────────────────────
function BioToggle({ bio }: { bio: string }) {
  const [open, setOpen] = useState(false)
  const short = bio.slice(0, 120) + '…'

  return (
    <div>

      <p
        className="text-[#6B7280] text-[13.5px] leading-[1.8]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {open ? bio : short}
      </p>
      <button
        onClick={() => setOpen(v => !v)}
        className="mt-2 flex items-center gap-1 text-[#6CC7FE] text-[12px] font-semibold
          hover:text-[#3aaef0] transition-colors"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {open ? 'Read less' : 'Read more'}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  )
}

// ── Featured Card (Executive Director) ───────────────────────────
function FeaturedCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={index}
      className="col-span-full"
    >
      <div className="relative rounded-3xl overflow-hidden
        bg-white border border-[#6CC7FE]/15
        shadow-[0_16px_56px_rgba(108,199,254,0.13)]">

        {/* Decorative accent bar top */}
        <div className="absolute top-0 left-0 right-0 h-[3px]
          bg-gradient-to-r from-[#6CC7FE] via-[#b3e1ff] to-[#6CC7FE]" />

        {/* Soft blue wash */}
        <div className="absolute top-0 right-0 w-[340px] h-[340px]
          rounded-full bg-[#6CC7FE]/05 blur-[80px] pointer-events-none -translate-y-1/3 translate-x-1/3" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 md:p-10 items-start md:items-center">

          {/* Left: avatar + name */}
          <div className="flex flex-col items-center gap-4 min-w-[160px]">
            <Avatar featured />
            <div className="text-center">
              <span className={`inline-block text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-2
                ${TAG_COLORS[member.tag]}`}>
                {member.tag}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#6CC7FE]/20 to-transparent" />

          {/* Right: content */}
          <div className="flex-1">
            <p className="text-[#6CC7FE] text-[11px] font-bold tracking-[0.22em] uppercase mb-1.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Executive Director, WillWay Africa
            </p>
            <h3 className="text-[#0D0D0D] font-extrabold mb-1"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)' }}>
              {member.name}
            </h3>

            {/* Decorative line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-10 bg-[#6CC7FE] rounded-full" />
              <div className="h-[2px] w-4 bg-[#6CC7FE]/30 rounded-full" />
            </div>

            <p className="text-[#6B7280] text-[14px] leading-[1.85] max-w-2xl mb-4"
  style={{ fontFamily: "'DM Sans', sans-serif" }}>
  {member.bio}
</p>

<p className="text-[#6B7280] text-[14px] leading-[1.85] max-w-2xl mb-4 font-semibold">
  {member.impact}
</p>

<ul className="list-disc pl-5 space-y-2 text-[#6B7280] text-[13.5px] leading-[1.8] mb-4">
  {member.programs?.map((item, i) => (
    <li key={i}>{item}</li>
  ))}
</ul>

<p className="text-[#6B7280] text-[14px] leading-[1.85] max-w-2xl">
  {member.closing}
</p>

            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-[#6CC7FE]/25 flex items-center justify-center
                  text-[#6CC7FE] hover:bg-[#6CC7FE] hover:text-white transition-all duration-200">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="#" aria-label="Email"
                className="w-8 h-8 rounded-full border border-[#6CC7FE]/25 flex items-center justify-center
                  text-[#6CC7FE] hover:bg-[#6CC7FE] hover:text-white transition-all duration-200">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Regular Member Card ───────────────────────────────────────────
function MemberCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl bg-white
        border border-gray-100
        shadow-[0_4px_24px_rgba(0,0,0,0.05)]
        hover:shadow-[0_12px_40px_rgba(108,199,254,0.16)]
        hover:border-[#6CC7FE]/25
        transition-all duration-400 overflow-hidden flex flex-col"
    >
      {/* Top accent — slides in on hover */}
      <div className={`absolute top-0 left-0 right-0 h-[2.5px]
        bg-gradient-to-r from-[#6CC7FE] to-[#b3e1ff]
        transition-transform duration-500 origin-left
        ${hovered ? 'scale-x-100' : 'scale-x-0'}`} />

      {/* Subtle bg wash on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#6CC7FE]/02 to-transparent
        transition-opacity duration-400 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">

        {/* Header row */}
        <div className="flex items-start gap-4">
          <Avatar featured={false} />
          <div className="flex-1 pt-1">
            <span className={`inline-block text-[9.5px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mb-2
              ${TAG_COLORS[member.tag]}`}>
              {member.tag}
            </span>
            <h3 className="text-[#0D0D0D] font-extrabold leading-tight text-[15px]"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              {member.name}
            </h3>
            <p className="text-[#6CC7FE] text-[11px] font-medium mt-0.5 leading-snug"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {member.role}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#6CC7FE]/15 via-gray-100 to-transparent" />

        {/* Bio */}
        <BioToggle bio={member.bio} />

        {/* Social icons */}
        <div className="flex gap-2 mt-auto pt-2">
          <a href="#" aria-label="LinkedIn"
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center
              text-gray-400 hover:border-[#6CC7FE] hover:text-[#6CC7FE] transition-all duration-200">
            <Linkedin className="w-3 h-3" />
          </a>
          <a href="#" aria-label="Email"
            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center
              text-gray-400 hover:border-[#6CC7FE] hover:text-[#6CC7FE] transition-all duration-200">
            <Mail className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Section ──────────────────────────────────────────────────
export default function TeamSection() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })

  const featured = TEAM.find(m => m.featured)!
  const rest = TEAM.filter(m => !m.featured)

  return (
    <section className="relative w-full bg-[#FAFAFA]  overflow-hidden">
       <Navbar/>
      {/* ── Background dot grid ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6CC7FE12 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

      {/* ── Ambient glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]
        rounded-full bg-[#6CC7FE]/07 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
        rounded-full bg-[#6CC7FE]/05 blur-[100px] pointer-events-none" />

      <div className="relative py-12 z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >

          <h2 className="text-[#0D0D0D] font-extrabold leading-[1.08] tracking-[-0.025em]"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
            Meet Our{' '}
            <span className="relative inline-block text-[#6CC7FE]">
              Team
              {/* Underline squiggle */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path d="M0 7 Q25 2 50 7 Q75 12 100 7 Q125 2 150 7 Q175 12 200 7"
                  stroke="#6CC7FE" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="text-[#9CA3AF] text-[15px] leading-[1.85] mt-6 max-w-[520px] mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Dedicated professionals united by a shared passion for transforming
            lives in hard-to-reach communities across Africa.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { value: '5+', label: 'Core Team Members' },
              { value: '10+', label: 'Years Experience' },
              { value: '20K+', label: 'Lives Impacted' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-[#0D0D0D] font-extrabold text-2xl leading-none"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-[#9CA3AF] text-[11px] tracking-wider uppercase mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Featured founder card spans full width */}
          <FeaturedCard member={featured} index={0} />

          {/* Rest of team */}
          {rest.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i + 1} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-[#9CA3AF] text-sm mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Interested in joining our mission?
          </p>
          <a
            href="/get-involved"
            className="inline-flex items-center gap-2 bg-[#6CC7FE] text-[#0D0D0D]
              font-black text-[12px] px-7 py-3.5 rounded-xl tracking-[0.12em] uppercase
              shadow-[0_6px_24px_rgba(108,199,254,0.35)]
              hover:bg-[#45b8f5] transition-colors duration-200"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Get Involved
          </a>
        </motion.div>
      </div>
    </section>
  )
}
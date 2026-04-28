'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight, Heart, BookOpen, Briefcase, Vote } from 'lucide-react'
import HeroSection from '@/components/Herosection'
import Navbar from '@/components/Navbar'
import VisionMissionSection from '@/components/VissionMissionSection'
import WhyInitiativeImpact from '@/components/Whyinitiativeimpact'
import Footer from '@/components/footer'
import ImpactProgramsInvolved from '@/components/Impactprogramsinvolved'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFAF4]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Navigation */}
       <Navbar />

      {/* Hero Section — starts directly below the sticky nav */}
      <HeroSection />

      {/* About Section */}
      <VisionMissionSection/>
      <WhyInitiativeImpact/>
      <AboutSection />

      {/* Impact Stats */}
     <ImpactProgramsInvolved/>

      {/* Footer */}
      <Footer/>

    </div>
  )
}

function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
              <span className="font-black text-[#0D0D0D] text-xs tracking-tight">WW</span>
            </div>
            <span className="font-bold text-base text-white tracking-tight hidden sm:block"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              WillWay<span className="text-[#F5A623]"> Africa</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: 'About Us', href: '#about' },
              { label: 'What We Do', href: '#programs' },
              { label: 'Our Impact', href: '#impact' },
              { label: 'Our Team', href: '#team' },
              { label: 'Get Involved', href: '#involved' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Donate CTA */}
          <motion.a
            href="#donate"
            whileHover={{ scale: 1.04, backgroundColor: '#e8970f' }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#F5A623] text-[#0D0D0D] text-sm font-bold px-5 py-2.5 rounded-full tracking-wide transition-colors"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Donate Now
          </motion.a>
        </div>
      </div>
    </motion.nav>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative">

      {/* Subtle dot grid texture — matches hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #6CC7FE18 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px]
        rounded-full bg-[#6CC7FE]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text */}
          <div>
            <span className="flex items-center gap-2 text-[#6CC7FE] text-xs font-bold tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <span className="w-2 h-2 rounded-full bg-[#6CC7FE] animate-pulse" />
              Who We Are
            </span>

            <h2
              className="font-extrabold mb-6 text-[#0D0D0D] leading-[1.06] tracking-[-0.025em]"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              }}
            >
              We Go Where{' '}
              <span className="text-[#6CC7FE]">Others</span>{' '}
              <span
                className="relative inline-block text-[#F5A623]"
              >
                Don't.
                {/* Underline accent */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ height: '6px' }}
                >
                  <path
                    d="M0 6 Q50 0 100 4 Q150 8 200 2"
                    stroke="#F5A623"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-[#6B7280] text-[15px] leading-[1.85] mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Poverty doesn't wait — and neither do we. WillWay Africa was founded on a simple but
              powerful belief: that geography should never determine destiny. We operate deep in
              rural, hard-to-reach communities across Africa.
            </p>
            <p className="text-[#6B7280] text-[15px] leading-[1.85]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Nearly half of those living in extreme poverty are 18 years old or younger. We exist
              to change that — one community, one young person, one opportunity at a time.
            </p>
          </div>

          {/* RIGHT — Program cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <BookOpen className="w-5 h-5" />,
                title: 'Education',
                desc: 'Unlocking potential through learning',
                bg: '#6CC7FE',
                text: '#fff',
              },
              {
                icon: <Heart className="w-5 h-5" />,
                title: 'Preventive Health',
                desc: 'Protecting young lives before crisis strikes',
                bg: '#F5A623',
                text: '#0D0D0D',
              },
              {
                icon: <Briefcase className="w-5 h-5" />,
                title: 'Livelihoods',
                desc: 'Building economic independence that lasts',
                bg: '#F5A623',
                text: '#0D0D0D',
              },
              {
                icon: <Vote className="w-5 h-5" />,
                title: 'Governance',
                desc: 'Bringing power back to the people',
                bg: '#6CC7FE',
                text: '#fff',
              },
            ].map(({ icon, title, desc, bg, text }) => (
              <motion.div
                key={title}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6 cursor-default"
                style={{
                  backgroundColor: bg,
                  boxShadow: `0 8px 28px ${bg}40`,
                }}
              >
                <div className="mb-4" style={{ color: text, opacity: 0.9 }}>{icon}</div>
                <h3
                  className="font-bold text-sm mb-1.5"
                  style={{ fontFamily: "'Syne', sans-serif", color: text }}
                >
                  {title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: text, opacity: 0.75 }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote block */}
        <blockquote
          className="mt-16 p-8 rounded-2xl border-l-4 border-[#F5A623]"
          style={{
            background: 'linear-gradient(135deg, #6CC7FE18 0%, #F5A62312 100%)',
            border: '1px solid #6CC7FE30',
            borderLeft: '4px solid #F5A623',
          }}
        >
          <p
            className="text-xl italic leading-relaxed text-[#0D0D0D]"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 300 }}
          >
            "Africa's greatest asset is its young people. Our job is to make sure the world
            knows it —{' '}
            <span className="text-[#6CC7FE] not-italic font-bold">and acts like it.</span>"
          </p>
        </blockquote>
      </div>
    </section>
  )
}
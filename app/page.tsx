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
    <section id="about" className="py-24 bg-[#FDFAF4]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="flex items-center gap-2 text-[#0D9488] text-xs font-bold tracking-[0.15em] uppercase mb-4">
              <span className="w-6 h-[2px] bg-[#0D9488]" />
              Who We Are
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-[#0D0D0D] leading-[1.1] tracking-[-0.03em]"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              We Go Where <em className="not-italic text-[#F5A623]">Others Don't.</em>
            </h2>
            <p className="text-[#6B7280] text-base leading-[1.8] mb-5">
              Poverty doesn't wait — and neither do we. WillWay Africa was founded on a simple but powerful belief: that geography should never determine destiny. We operate deep in rural, hard-to-reach communities across Africa.
            </p>
            <p className="text-[#6B7280] text-base leading-[1.8]">
              Nearly half of those living in extreme poverty are 18 years old or younger. We exist to change that — one community, one young person, one opportunity at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <BookOpen className="w-6 h-6" />, title: 'Education', desc: 'Unlocking potential through learning', color: '#1DB954' },
              { icon: <Heart className="w-6 h-6" />, title: 'Preventive Health', desc: 'Protecting young lives before crisis strikes', color: '#E63946' },
              { icon: <Briefcase className="w-6 h-6" />, title: 'Livelihoods', desc: 'Building economic independence that lasts', color: '#F5A623' },
              { icon: <Vote className="w-6 h-6" />, title: 'Governance', desc: 'Bringing power back to the people', color: '#0D9488' },
            ].map(({ icon, title, desc, color }) => (
              <div key={title}
                className="bg-white rounded-2xl p-6 border border-black/5 hover:shadow-lg transition-shadow duration-300 cursor-default group">
                <div className="mb-4" style={{ color }}>{icon}</div>
                <h3 className="font-bold text-[#0D0D0D] text-sm mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}>{title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <blockquote className="mt-16 p-8 bg-[#0D0D0D] rounded-2xl border-l-4 border-[#F5A623]">
          <p className="text-xl italic text-white/90 font-light leading-relaxed">
            "Africa's greatest asset is its young people. Our job is to make sure the world knows it — and acts like it."
          </p>
        </blockquote>
      </div>
    </section>
  )
}


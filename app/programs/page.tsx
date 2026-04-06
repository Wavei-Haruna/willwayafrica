'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight, BookOpen, Heart, Briefcase, Vote, Users, Globe } from 'lucide-react'

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header />

      {/* Page Hero */}
      <PageHero />

      {/* Education Program */}
      <ProgramSection
        icon={<BookOpen className="w-12 h-12" />}
        title="Education Program"
        subtitle="Learning Is the Way Out"
        color="bg-accent"
        description="Our Education Program uses evidence-based strategies to give disadvantaged young people the tools they need to learn, grow, and thrive. We don't just open doors — we walk young people through them."
        subPrograms={[
          {
            name: "Education-For-All",
            description: "Helping girls go to school, stay in school, and succeed in life. We provide financial support and mentorship to high-performing girls from primary school all the way to university. Every beneficiary is matched with a professional volunteer who coaches them, checks in on their progress, and champions their future."
          },
          {
            name: "Chance for Children",
            description: "Technology is the great equaliser — if you have access to it. Our free digital programme brings tech literacy to young people in the most remote communities. We are building 20 eco-friendly, solar-powered ICT Resource Centres in underserved communities."
          },
          {
            name: "Career Guidance & Counselling",
            description: "Helping young people discover who they are — and who they can become. From Annual Career Guidance Seminars for Junior High pupils to free confidential counselling for students facing psychosocial challenges, we create safe spaces for exploration."
          },
          {
            name: "Let's Play",
            description: "Because learning should feel like fun. Our edutainment programme makes school a place young people actually want to be. Science & Technology Days, Cultural Fairs, Essay Competitions, Debates — we make education exciting."
          }
        ]}
      />

      {/* Health Program */}
      <ProgramSection
        icon={<Heart className="w-12 h-12" />}
        title="Health Program"
        subtitle="Healthy Youth, Stronger Communities"
        color="bg-accent"
        description="Our health initiatives equip young people in rural communities with the knowledge, tools, and services to live healthy, productive lives. We focus where the need is greatest — and where conventional health systems have failed to reach."
        subPrograms={[
          {
            name: "HIV & AIDS",
            description: "Knowledge is protection. We make sure young people have both. WillWay Africa implements large-scale HIV & AIDS programmes in underserved communities through peer education, health screening, capacity building, and youth-friendly centres."
          },
          {
            name: "Adolescent Sexual & Reproductive Health (ASRH)",
            description: "Because young people deserve honest, accessible, culturally respectful health support. Our ASRH programme is built on evidence and sensitivity. Over 20,000 young people in hard-to-reach communities have been reached through our sexual and reproductive health programmes."
          }
        ]}
      />

      {/* Livelihoods Program */}
      <ProgramSection
        icon={<Briefcase className="w-12 h-12" />}
        title="Livelihoods Program"
        subtitle="Economic Freedom Starts Here"
        color="bg-accent"
        description="Female-headed households make up an estimated third of all households worldwide — and they remain the largest poverty-afflicted group. WillWay Africa supports rural women and their communities with practical skills, seed funding, and ongoing mentorship."
        subPrograms={[
          {
            name: "Vocational & Entrepreneurial Skills Training",
            description: "Real skills for real opportunities. We provide comprehensive training programs designed to equip participants with market-relevant abilities."
          },
          {
            name: "Seed Funding for Business Initiatives",
            description: "Capital to get started. We provide the financial support needed to turn ideas into thriving businesses."
          },
          {
            name: "Business Grooming & Mentorship",
            description: "Guidance from those who've been there. Our mentorship connects entrepreneurs with experienced professionals who guide their journey."
          },
          {
            name: "Solidarity Groups",
            description: "Community support systems that keep women accountable and connected. We have delivered sustainable livelihood projects to women in over 50 rural communities."
          }
        ]}
      />

      {/* Governance Program */}
      <ProgramSection
        icon={<Vote className="w-12 h-12" />}
        title="Governance & Community Empowerment"
        subtitle="Democracy Belongs to Everyone"
        color="bg-accent"
        description="Our Governance Training Initiative (GTI) is a bold, community-centred programme of civic education and political empowerment for rural communities. We don't just talk about governance — we bring it to the people's doorstep."
        subPrograms={[
          {
            name: "Civic Education Rooted in Local Context",
            description: "Unlike conventional civic education programmes that are urban-focused, GTI is grounded in the real issues and contexts of rural communities."
          },
          {
            name: "Capacity Building for Rural Community Leaders",
            description: "We empower local leaders with the skills and knowledge to drive change at the grassroots level."
          },
          {
            name: "Sustainable Structures",
            description: "We build structures that outlast any single programme or election cycle, ensuring lasting community transformation."
          }
        ]}
      />

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
              W
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              WillWay Africa
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-foreground/70 hover:text-foreground transition">
              About Us
            </Link>
            <Link href="/programs" className="text-foreground font-semibold">
              What We Do
            </Link>
            <Link href="/#impact" className="text-foreground/70 hover:text-foreground transition">
              Our Impact
            </Link>
            <Link href="/team" className="text-foreground/70 hover:text-foreground transition">
              Our Team
            </Link>
          </div>

          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Donate Now
          </Button>
        </div>
      </div>
    </nav>
  )
}

function PageHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-foreground via-foreground to-foreground/90 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">
          Four Programs. <span className="text-accent">One Mission</span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Our work is built around the four things that matter most to young people living in poverty — learning, staying healthy, earning a living, and having a voice.
        </p>
      </div>
    </section>
  )
}

function ProgramSection({
  icon,
  title,
  subtitle,
  color,
  description,
  subPrograms,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  color: string
  description: string
  subPrograms: Array<{ name: string; description: string }>
}) {
  return (
    <section className="py-20 border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className={`w-14 h-14 rounded-lg ${color} text-accent-foreground flex items-center justify-center mb-6`}>
            {icon}
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-2">{subtitle}</h2>
          <p className="text-lg text-foreground/70 max-w-3xl">{description}</p>
        </div>

        <div className="space-y-6">
          {subPrograms.map((program, index) => (
            <Card key={index} className="p-8 bg-card border-border hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-foreground mb-3">{program.name}</h3>
              <p className="text-foreground/70 leading-relaxed">{program.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-20 bg-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl text-foreground/70 mb-8">
          Every contribution, whether financial, expertise, or time, directly impacts the lives of young people across Africa.
        </p>
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Support Our Programs
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="w-10 h-10 rounded-lg bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg mb-4">
              W
            </div>
            <p className="text-background/70 text-sm">
              Empowering young people. Transforming communities. Building Africa.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-background mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition">Education</Link></li>
              <li><Link href="#" className="hover:text-background transition">Health</Link></li>
              <li><Link href="#" className="hover:text-background transition">Livelihoods</Link></li>
              <li><Link href="#" className="hover:text-background transition">Governance</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-background mb-4">Organization</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/" className="hover:text-background transition">Home</Link></li>
              <li><Link href="/team" className="hover:text-background transition">Our Team</Link></li>
              <li><Link href="#" className="hover:text-background transition">Impact</Link></li>
              <li><Link href="#" className="hover:text-background transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-background mb-4">Contact</h4>
            <p className="text-sm text-background/70 mb-2">
              📧 info@willwayafrica.org
            </p>
            <p className="text-sm text-background/70">
              📍 Ghana, West Africa
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-background/70">
          <p>&copy; 2025 WillWay Africa. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-background transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-background transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

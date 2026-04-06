'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <Header />

      {/* Page Hero */}
      <PageHero />

      {/* Team Section */}
      <TeamSection />

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
            <Link href="/programs" className="text-foreground/70 hover:text-foreground transition">
              What We Do
            </Link>
            <Link href="/#impact" className="text-foreground/70 hover:text-foreground transition">
              Our Impact
            </Link>
            <Link href="/team" className="text-foreground font-semibold">
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
          Meet Our <span className="text-accent">Team</span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Driven by purpose. Rooted in community. Meet the passionate professionals and community champions behind WillWay Africa.
        </p>
      </div>
    </section>
  )
}

function TeamSection() {
  const executives = [
    {
      name: "Samuel Opoku",
      title: "Executive Director & Founder",
      bio: "Samuel started WillWay Africa because he grew up seeing what poverty does to young people with limitless potential. This organisation exists to close the gap between the life they were born into and the life they deserve. With over 15 years of experience in development, he brings a strategic vision rooted in community realities.",
      image: "🎯"
    }
  ]

  const teamMembers = [
    {
      name: "Akosua Mensah",
      title: "Director of Programs",
      bio: "Leading the design and implementation of all four programs with a focus on evidence-based impact and community-centred approaches.",
      image: "📚"
    },
    {
      name: "Kwesi Asante",
      title: "Director of Operations",
      bio: "Ensuring operational excellence and resource efficiency across all rural communities we serve, enabling teams to focus on impact.",
      image: "🔧"
    },
    {
      name: "Ama Boateng",
      title: "Head of Community Partnerships",
      bio: "Building and maintaining relationships with local leaders, government agencies, and community members in all 50+ communities we serve.",
      image: "🤝"
    },
    {
      name: "Kofi Mensah",
      title: "Head of Monitoring & Evaluation",
      bio: "Tracking our impact with rigour and transparency, ensuring every programme delivers measurable change for young people.",
      image: "📊"
    },
    {
      name: "Grace Nyarko",
      title: "Head of Communications",
      bio: "Telling the stories of transformation and mobilizing resources and support for our mission across Africa and the globe.",
      image: "📢"
    },
    {
      name: "David Mensah",
      title: "Finance Manager",
      bio: "Ensuring transparent, accountable management of every donation and resource entrusted to us by our supporters.",
      image: "💰"
    },
    {
      name: "Efua Osei",
      title: "Education Program Lead",
      bio: "Innovating and scaling our education programs to reach more girls and young people with transformative learning opportunities.",
      image: "🎓"
    },
    {
      name: "Abraham Larbi",
      title: "Health Program Lead",
      bio: "Designing and implementing health initiatives that empower young people to make informed decisions about their health and futures.",
      image: "❤️"
    },
    {
      name: "Abena Frimpong",
      title: "Livelihoods Coordinator",
      bio: "Supporting rural women entrepreneurs through mentorship, training, and seed funding to build sustainable economic independence.",
      image: "💼"
    },
    {
      name: "Richard Owusu",
      title: "Governance Trainer",
      bio: "Delivering civic education and empowerment training that brings democracy and accountability to the grassroots level.",
      image: "🗳️"
    },
    {
      name: "Nana Esi",
      title: "Community Liaison",
      bio: "Serving as the bridge between WillWay and the rural communities, ensuring our programs are responsive to local needs.",
      image: "🌍"
    },
    {
      name: "Kwaku Boateng",
      title: "Youth Coordinator",
      bio: "Engaging and empowering young people to become leaders and change agents within their own communities.",
      image: "👥"
    }
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Executive Director */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-12">Leadership</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
                {executives[0].image}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{executives[0].name}</h3>
              <p className="text-accent font-semibold mb-4">{executives[0].title}</p>
              <p className="text-foreground/70 leading-relaxed text-lg">
                {executives[0].bio}
              </p>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-8 bg-card border-border hover:shadow-lg transition">
                <div className="text-5xl mb-4 text-center">{member.image}</div>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-accent font-semibold mb-4 text-sm">{member.title}</p>
                <p className="text-foreground/70 leading-relaxed text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 p-12 bg-accent/5 border border-accent/20 rounded-xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Community-Centred</h3>
              <p className="text-foreground/70">We listen, learn, and lead from the insights of the communities we serve.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Evidence-Based</h3>
              <p className="text-foreground/70">Our programs are designed, implemented, and refined based on rigorous data and community feedback.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Transparent</h3>
              <p className="text-foreground/70">Every donation, every decision, and every outcome is tracked and reported with integrity.</p>
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Youth-Led</h3>
              <p className="text-foreground/70">Young people are not just beneficiaries — they are leaders, partners, and decision-makers.</p>
            </div>
          </div>
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
          Join Our Team
        </h2>
        <p className="text-xl text-foreground/70 mb-8">
          Are you passionate about youth empowerment and community transformation? We&apos;re always looking for talented, committed individuals to join our mission.
        </p>
        <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Explore Opportunities
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
            <h4 className="font-bold text-background mb-4">About</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/" className="hover:text-background transition">Home</Link></li>
              <li><Link href="/#about" className="hover:text-background transition">About Us</Link></li>
              <li><Link href="/team" className="hover:text-background transition">Team</Link></li>
              <li><Link href="#" className="hover:text-background transition">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-background mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="/programs" className="hover:text-background transition">All Programs</Link></li>
              <li><Link href="#" className="hover:text-background transition">Education</Link></li>
              <li><Link href="#" className="hover:text-background transition">Health</Link></li>
              <li><Link href="#" className="hover:text-background transition">Impact</Link></li>
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

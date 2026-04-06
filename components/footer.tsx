'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Mail, Phone } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'About Us',     href: '/about' },
  { label: 'What We Do',   href: '/programs' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
]

const SOCIALS = [
  { icon: <Facebook  className="w-4 h-4" />, href: '#', label: 'Facebook' },
  { icon: <Twitter   className="w-4 h-4" />, href: '#', label: 'Twitter' },
  { icon: <Linkedin  className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
  { icon: <Instagram className="w-4 h-4" />, href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100">

      {/* ── Main footer content ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ── Col 1: Logo + tagline + socials ─────────── */}
          <div className="flex flex-col gap-5">

            {/* Logo */}
            <Link href="/" className="flex flex-col items-start gap-2 w-fit">
              <div className="w-14 h-14 rounded-full overflow-hidden
                border-2 border-gray-100 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="WillWay Africa logo"
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              <span
                className="text-[#0D0D0D] font-bold text-[15px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                WillWay Africa
              </span>
            </Link>

            {/* Tagline */}
            <p
              className="text-[#6B7280] text-[13px] leading-[1.8] max-w-[210px]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              WillWay empowers rural women with practical skills for sustainable livelihoods.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 mt-1">
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, backgroundColor: '#6CC7FE', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-[#6CC7FE]/15
                    text-[#6CC7FE] flex items-center justify-center
                    transition-colors duration-200"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ───────────────────────── */}
          <div>
            <h4
              className="text-[#0D0D0D] font-bold text-[15px] mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#6CC7FE] text-[13px] font-medium
                      hover:text-[#3aaef0] transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Address ───────────────────────────── */}
          <div>
            <h4
              className="text-[#0D0D0D] font-bold text-[15px] mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Address
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#6CC7FE] mt-0.5 flex-shrink-0" />
                <span
                  className="text-[#6CC7FE] text-[13px] leading-[1.7]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Address Here
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#6CC7FE] flex-shrink-0" />
                <a
                  href="mailto:info@willwayafrica.org"
                  className="text-[#6CC7FE] text-[13px] hover:text-[#3aaef0]
                    transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  info@willwayafrica.org
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#6CC7FE] flex-shrink-0" />
                <a
                  href="tel:+233000000000"
                  className="text-[#6CC7FE] text-[13px] hover:text-[#3aaef0]
                    transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  +233 000 000 000
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Copyright bar ────────────────────────────────── */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-5
          flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[#9CA3AF] text-[12px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Copyright WillWay Africa 2026
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Use'].map(l => (
              <Link
                key={l}
                href="#"
                className="text-[#9CA3AF] text-[12px] hover:text-[#6CC7FE]
                  transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
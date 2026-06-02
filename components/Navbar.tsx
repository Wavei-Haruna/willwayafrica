'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

const WHAT_WE_DO_PILLARS = [
  {
    label: 'Education',
    href: '/what-we-do#education',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 3L2 8l10 5 10-5-10-5z"/>
        <path d="M7 10.5v5a5 5 0 0010 0v-5"/>
      </svg>
    ),
    desc: 'Skills, coding & career guidance',
  },
  {
    label: 'Preventive Health',
    href: '/what-we-do#health',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    desc: 'Wellbeing for women, children & youth',
  },
  {
    label: 'Sustainable Livelihoods',
    href: '/what-we-do#livelihoods',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    desc: 'Skills, enterprise & resilience',
  },
  {
    label: 'Environment',
    href: '/what-we-do#environment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.83A2 2 0 005.6 22.5C11 22.5 19 19 17 8z"/>
        <path d="M17 8c0 0-1.5 8-8.5 12.5"/>
      </svg>
    ),
    desc: 'Protecting natural resources',
  },
]

const NAV_ITEMS = [
  { label: 'About Us',     href: '/' },
  { label: 'What We Do',  href: '/what-we-do', hasDropdown: true },
  { label: 'Our Team',    href: '/our-team' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Get Involved',href: '/get-involved' },
  { label: 'Contact',     href: '/contact' },
]

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [mobileWWDOpen, setMobileWWDOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef     = useRef<HTMLDivElement>(null)

  const openDropdown  = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setDropdownOpen(true) }
  const closeDropdown = () => { timeoutRef.current = setTimeout(() => setDropdownOpen(false), 160) }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-[72px]">

          {/* LOGO */}
          <Link href="/">
            <Image src="/logo.png" alt="WillWay Africa" width={50} height={50} className="rounded-full" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    {/* Trigger — clicking navigates, hovering opens dropdown */}
                    <Link
                      href={item.href}
                      className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium
                        text-gray-700 hover:text-foreground transition-colors duration-200
                        after:content-[''] after:absolute after:left-0 after:bottom-0
                        after:h-[2px] after:w-0 after:bg-primary
                        after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200
                          ${dropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </Link>

                    {/* Dropdown panel */}
                    {dropdownOpen && (
                      <div
                        onMouseEnter={openDropdown}
                        onMouseLeave={closeDropdown}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[340px]"
                      >
                        {/* Arrow */}
                        <div className="absolute top-[6px] left-1/2 -translate-x-1/2
                          w-3 h-3 bg-white border-l border-t border-border rotate-45 z-10" />

                        <div className="relative bg-white border border-border rounded-2xl
                          shadow-[0_12px_40px_rgba(0,0,0,0.10)] overflow-hidden">

                          {/* Header strip */}
                          <div className="px-5 py-3.5 border-b border-border bg-secondary/40">
                            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground"
                              style={{ fontFamily: "'Syne', sans-serif" }}>
                              Our Four Pillars
                            </p>
                          </div>

                          {/* Pillar links */}
                          <div className="py-2">
                            {WHAT_WE_DO_PILLARS.map((pillar, i) => (
                              <Link
                                key={pillar.label}
                                href={pillar.href}
                                onClick={() => setDropdownOpen(false)}
                                className="group flex items-center gap-3.5 px-5 py-3
                                  hover:bg-secondary/60 transition-colors duration-150"
                              >
                                {/* Number + icon */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg
                                  bg-primary/8 text-primary flex items-center justify-center
                                  group-hover:bg-primary group-hover:text-primary-foreground
                                  transition-colors duration-200">
                                  {pillar.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-bold text-foreground leading-tight"
                                    style={{ fontFamily: "'Syne', sans-serif" }}>
                                    {pillar.label}
                                  </p>
                                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                                    {pillar.desc}
                                  </p>
                                </div>

                                {/* Subtle arrow */}
                                <svg viewBox="0 0 16 16" fill="currentColor"
                                  className="w-3 h-3 text-muted-foreground opacity-0
                                    group-hover:opacity-100 group-hover:translate-x-0.5
                                    transition-all duration-200 flex-shrink-0">
                                  <path fillRule="evenodd" d="M2 8a.5.5 0 01.5-.5h9.793L9.146 4.354a.5.5 0 11.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 8.5H2.5A.5.5 0 012 8z"/>
                                </svg>
                              </Link>
                            ))}
                          </div>

                          {/* Footer CTA */}
                          <div className="px-5 py-3.5 border-t border-border bg-secondary/40
                            flex items-center justify-between gap-3">
                            <p className="text-[11px] text-muted-foreground leading-snug">
                              See all programmes & initiatives
                            </p>
                            <Link
                              href="/what-we-do"
                              onClick={() => setDropdownOpen(false)}
                              className="flex-shrink-0 bg-primary text-primary-foreground
                                font-black text-[10px] px-3.5 py-1.5 rounded-lg
                                tracking-[0.12em] uppercase hover:opacity-90
                                transition-opacity duration-200"
                              style={{ fontFamily: "'Syne', sans-serif" }}
                            >
                              View All →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              // Plain link
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700
                    hover:text-foreground transition-colors duration-200
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:h-[2px] after:w-0 after:bg-primary
                    after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* DONATE BUTTON */}
          <div className="hidden md:block">
            <Link
              href="/get-involved"
              className="bg-primary text-primary-foreground font-bold text-sm
                px-6 py-2.5 rounded-xl tracking-wide
                hover:opacity-90 transition-opacity duration-200
                shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              DONATE
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg
              hover:bg-secondary transition"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2px] bg-foreground rounded-full
              transition-all duration-300 origin-center
              ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-foreground rounded-full
              transition-all duration-300
              ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-foreground rounded-full
              transition-all duration-300 origin-center
              ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-1">
          {NAV_ITEMS.map(item => {
            if (item.hasDropdown) {
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 px-3 py-2.5 text-sm font-medium text-gray-700"
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setMobileWWDOpen(v => !v)}
                      className="px-3 py-2.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200
                        ${mobileWWDOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {mobileWWDOpen && (
                    <div className="ml-3 pl-3 border-l-2 border-primary/30 mt-1 space-y-0.5">
                      {WHAT_WE_DO_PILLARS.map(pillar => (
                        <Link
                          key={pillar.label}
                          href={pillar.href}
                          onClick={() => { setMobileOpen(false); setMobileWWDOpen(false) }}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg
                            text-sm text-gray-600 hover:text-primary hover:bg-secondary/50
                            transition-colors"
                        >
                          <span className="text-primary/60">{pillar.icon}</span>
                          {pillar.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium
                  text-gray-700 hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                {item.label}
              </Link>
            )
          })}

          <div className="pt-3">
            <Link
              href="/get-involved"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-primary text-primary-foreground
                font-bold text-sm py-3 rounded-xl tracking-wide
                hover:opacity-90 transition-opacity"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              DONATE
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
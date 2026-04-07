'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, ChevronRight } from 'lucide-react'

const NAV_ITEMS = [
  {
    label: 'About Us',
    dropdown: [
      { label: 'Our Story', href: '/about' },
      { label: 'Our Mission', href: '/about#mission' },
      { label: 'Meet the Team', href: '/about#team' },
      { label: 'Our Impact', href: '/about#impact' },
    ],
  },
  {
    label: 'What We Do',
    dropdown: [
      {
        label: 'Education',
        dropdown: [
          { label: 'Chance for the Youth', href: '/programs/education/chance-for-the-youth' },
          { label: 'AfriCode Hub', href: '/programs/education/africode-hub' },
          { label: 'Career Guidance and Counselling', href: '/programs/education/career-guidance' },
          { label: 'Education-for-All', href: '/programs/education/education-for-all' },
        ],
      },
      {
        label: 'Preventive Health',
        dropdown: [
          { label: 'Operation ReachOut', href: '/programs/health/operation-reachout' },
          { label: 'Adolescent Health', href: '/programs/health/adolescent-health' },
          { label: 'Preventive Screening Early Detection & Treatment', href: '/programs/health/screening' },
          { label: 'WASH', href: '/programs/health/wash' },
          { label: 'Digital Health & mHealth Programs', href: '/programs/health/digital-health' },
        ],
      },
      {
        label: 'Sustainable Livelihoods',
        dropdown: [
          { label: 'Empowering Hands', href: '/programs/livelihoods/empowering-hands' },
          { label: 'StartRite Africa Initiative', href: '/programs/livelihoods/startrite' },
          { label: 'WillWay Centre for Women’s Skills & Enterprise', href: '/programs/livelihoods/willway-centre' },
          { label: 'Skills Training and Microenterprise Development', href: '/programs/livelihoods/skills-training' },
        ],
      },
      {
        label: 'Environment',
        dropdown: [
          { label: 'Environmental Education & Awareness Programs', href: '/programs/environment/education' },
          { label: 'Water Resource Management Programs', href: '/programs/environment/water' },
        ],
      },
    ],
  },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenMenu(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null)
    }, 180)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-[72px]">

          {/* LOGO */}
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <div key={item.label} className="relative">

                {/* TOP LEVEL */}
                {item.dropdown ? (
                  <button
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    className="
                      relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700
                      hover:text-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[2px] after:w-0 after:bg-yellow-400
                      after:transition-all after:duration-300
                      hover:after:w-full
                    "
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className="
                      relative px-4 py-2 text-sm text-gray-700 hover:text-black
                      after:content-[''] after:absolute after:left-0 after:bottom-0
                      after:h-[2px] after:w-0 after:bg-yellow-400
                      after:transition-all after:duration-300
                      hover:after:w-full
                    "
                  >
                    {item.label}
                  </Link>
                )}

                {/* DROPDOWN */}
                {item.dropdown && openMenu === item.label && (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-0 pt-2 z-50"
                  >
                    <div className="bg-white border rounded-xl shadow-lg py-2 min-w-[240px]">

                      {item.dropdown.map(sub => (
                        <div key={sub.label} className="relative group">

                          {/* FIRST LEVEL (ONLY ABOUT US GETS DOT) */}
                          {sub.href ? (
                            <Link
                              href={sub.href}
                              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <span className="flex items-center gap-2">
                                {item.label === 'About Us' && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition"></span>
                                )}
                                {sub.label}
                              </span>
                            </Link>
                          ) : (
                            <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <span className="flex items-center gap-2">
                                {item.label === 'About Us' && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition"></span>
                                )}
                                {sub.label}
                              </span>

                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          )}

                          {/* SECOND LEVEL (UNCHANGED - DOTS STILL EXIST HERE) */}
                          {sub.dropdown && (
                            <div className="absolute top-0 left-full ml-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                              <div className="bg-white border rounded-xl shadow-lg py-2 min-w-[240px]">

                                {sub.dropdown.map(child => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 group/item"
                                  >
                                    <span>{child.label}</span>

                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-0 group-hover/item:opacity-100 transition"></span>
                                  </Link>
                                ))}

                              </div>
                            </div>
                          )}

                        </div>
                      ))}

                    </div>
                  </div>
                )}

              </div>
            ))}
          </nav>

          {/* DONATE */}
          <div className="hidden md:block">
            <Link
              href="/donate"
              className="bg-[#6CC7FE] text-black font-semibold px-6 py-2.5 rounded-xl"
            >
              DONATE
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}
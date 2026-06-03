import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://willwayafrica.org'),
  title: {
    default: 'WillWay Africa — Empowering Young People Across Africa',
    template: '%s | WillWay Africa',
  },
  description:
    'WillWay Africa works in hard-to-reach communities ensuring young people have access to quality education, healthcare, sustainable livelihoods, and the power to shape their futures.',
  keywords: [
    'WillWay Africa',
    'NGO Africa',
    'youth empowerment Africa',
    'education Ghana',
    'healthcare Africa',
    'sustainable livelihoods',
    'community development',
    'young people Africa',
    'non-profit Africa',
    'rural communities Ghana',
  ],
  authors: [{ name: 'WillWay Africa', url: 'https://willwayafrica.org' }],
  creator: 'WillWay Africa',
  publisher: 'WillWay Africa',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://willwayafrica.org',
    siteName: 'WillWay Africa',
    title: 'WillWay Africa — Empowering Young People Across Africa',
    description:
      'Transforming lives across Africa through education, health, sustainable livelihoods, and governance. Join us in building a better future.',
    images: [
      {
        url: '/Our-Mission.png',
        width: 1200,
        height: 630,
        alt: 'WillWay Africa — Empowering Young People',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WillWay Africa — Empowering Young People Across Africa',
    description:
      'Transforming lives across Africa through education, health, sustainable livelihoods, and governance.',
    images: ['/Our-Mission.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'nonprofit',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
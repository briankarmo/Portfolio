import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.briankarmo.com'),
  title: 'Brian Karmo | Software Developer',
  description: 'Explore Brian Karmo\'s portfolio, showcasing full‑scale projects and modern software development using React, Next.js, TypeScript, and full-stack JavaScript. Available for hire on Upwork.',
  keywords: 'Brian Karmo, software developer, full‑stack developer, web development, React, Next.js, TypeScript, JavaScript, Node.js, Tailwind CSS, MongoDB, PostgreSQL, Upwork freelancer, Shopify',
  author: 'Brian Karmo',
  openGraph: {
    type: 'website',
    title: 'Brian Karmo | Software Developer',
    description: 'Explore Brian Karmo\'s portfolio, showcasing full‑scale projects and modern software development using React, Next.js, TypeScript, and full-stack JavaScript. Available for hire on Upwork.',
    url: 'https://www.briankarmo.com/',
    siteName: 'Brian Karmo Portfolio',
    images: [
      {
        url: '/bkinc-og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'BK Inc Logo - Brian Karmo Software Developer',
      },
      {
        url: '/BKIncLogo.png',
        width: 1200,
        height: 1200,
        alt: 'BK Inc Logo - Brian Karmo Software Developer',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brian Karmo | Software Developer',
    description: 'Explore Brian Karmo\'s portfolio, showcasing full‑scale projects and modern software development using React, Next.js, TypeScript, and full-stack JavaScript.',
    creator: '@briankarmo',
    images: [
      {
        url: '/BKIncLogo.png',
        alt: 'BK Inc Logo - Brian Karmo Software Developer',
      }
    ],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/BK.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/icons/bkinclogo-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/BK.png'],
  },
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
}

export const viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="msapplication-TileColor" content="#D4AF37" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <meta name="msapplication-navbutton-color" content="#D4AF37" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        {/* Additional social media meta tags */}
        <meta property="og:image" content="https://www.briankarmo.com/bkinc-og-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="BK Inc Logo - Brian Karmo Software Developer" />
        
        {/* Twitter specific meta tags */}
        <meta name="twitter:image" content="https://www.briankarmo.com/bkinc-og-1200x630.png" />
        <meta name="twitter:image:alt" content="BK Inc Logo - Brian Karmo Software Developer" />
        
        {/* Preload critical images with format fallbacks */}
        <link rel="preload" as="image" href="/heroimage.avif" type="image/avif" />
        <link rel="preload" as="image" href="/heroimage.webp" type="image/webp" />
        <link rel="preload" as="image" href="/heroimage.png" />
        <link rel="preload" as="image" href="/BKIncLogo.png" />
        
        {/* Hero image alternative for social sharing */}
        <meta property="og:image" content="https://www.briankarmo.com/heroimage-facebook-og.jpg" />
        <meta property="og:image:secure_url" content="https://www.briankarmo.com/heroimage-facebook-og.jpg" />
        <meta name="twitter:image" content="https://www.briankarmo.com/heroimage-twitter-card.jpg" />
        
        {/* Favicon links - Mobile optimized - BK.png (gold logo) is primary */}
        <link rel="icon" type="image/png" sizes="192x192" href="/BK.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/BK.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/BK.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/BK.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 
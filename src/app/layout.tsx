import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const instrument = localFont({ src: '../../public/assets/instrument-sans.woff2', variable: '--font-instrument', display:'swap' });
export const metadata: Metadata = {
  metadataBase: new URL('https://ikegps-species-review-v2.vercel.app'),
  title: 'IKE · Species review',
  description: 'Less waiting. Clearer decisions. Explore Andrew Miller’s field-to-office species review case study and interactive prototype.',
  openGraph: {
    type: 'website',
    title: 'Less waiting. Clearer decisions. | ikeGPS design case study',
    description: 'Field evidence. Human review. A clear next step. A product design exploration by Andrew Miller.',
    siteName: 'ikeGPS · Design case study',
    images: [{ url: '/assets/og-case-study.png', width: 1200, height: 630, alt: 'ikeGPS species review case study by Andrew Miller, showing the field capture and office review prototype.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Less waiting. Clearer decisions. | ikeGPS design case study',
    description: 'Field evidence. Human review. A clear next step.',
    images: ['/assets/og-case-study.png'],
  },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={instrument.variable}><body>{children}</body></html>}

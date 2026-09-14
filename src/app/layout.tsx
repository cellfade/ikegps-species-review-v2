import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const instrument = localFont({ src: '../../public/assets/instrument-sans.woff2', variable: '--font-instrument', display:'swap' });
export const metadata: Metadata = { title: 'IKE · Species review', description: 'A field-to-office design exploration by Andrew Miller.' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" className={instrument.variable}><body>{children}</body></html>}

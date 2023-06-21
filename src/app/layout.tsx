"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import "primereact/resources/themes/vela-orange/theme.css";
import 'primeicons/primeicons.css';
import { NavBar } from '@/components/NavBar/NavBar';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Labaik Web</title>
        <meta name="description" content="Labaik Web App - Mekka Hotels and Towers"></meta>
      </head>
      <body className={`lg:hidden max-h-[100vh] overflow-hidden ${inter.className}`}>
        {children}
        <NavBar />
      </body>
    </html>
  )
}

"use client"
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import "primereact/resources/themes/vela-orange/theme.css";
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Labaik Web',
    description: 'Labaik Web App - Mekka Hotels and Towers',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}</body>
        </html>
    )
}

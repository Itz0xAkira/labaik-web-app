"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import "primereact/resources/themes/vela-orange/theme.css";
import 'primeicons/primeicons.css';
import { NavBar } from '@/components/NavBar/NavBar';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Input } from 'postcss';
import { Button } from 'primereact/button';
import { useAuth } from '@/hooks/useAuth';
import { getUserByPassport } from '@/db/user';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [passport, setPassport] = useState("")
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0);
  const { setUserPassport, passport: loggedInPassport } = useAuth();
  const { refresh, replace } = useRouter();

  const onLogin = async () => {
    if (passport) {
      const user = await getUserByPassport(passport);
      if (user) {
        await setUserPassport(passport);
        setVisible(false);
        alert(`Welcome ${user.firstName} ${user.lastName}`)
      } else {
        alert("No host found with that passport!")
      }
    }
  }

  const onLogout = async () => {
    await setUserPassport("");
    setVisible(false);
    replace("/");
  }

  return (
    <html lang="en">
      <head>
        <title>Labaik Web</title>
        <meta name="description" content="Labaik Web App - Mekka Hotels and Towers"></meta>
      </head>
      <body className={`lg:hidden max-h-[100vh] overflow-hidden ${inter.className}`}>
        {children}
        <NavBar onSettingsClick={() => { setVisible(true) }} />
        <Dialog className="fixed inset-0 h-screen z-50" contentClassName="w-full h-full flex flex-col items-center justify-center" baseZIndex={100} maximized modal visible={visible} onHide={() => setVisible(false)}>
          <div className="flex flex-col items-center gap-5 w-full px-5">
            <img src="/transparent-logo.png" />
            {!loggedInPassport ?
              <>
                <InputText className="w-full" placeholder='Enter your passport' value={passport} onChange={(e) => setPassport(e.target.value)} />
                <Button onClick={onLogin} className="w-[70%]" label='Login' />
              </>
              :
              <Button onClick={onLogout} className="w-[70%]" label='Logout' />
            }
          </div>
        </Dialog >
      </body>
    </html >
  )
}


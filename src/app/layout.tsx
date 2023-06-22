"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import "primereact/resources/themes/vela-orange/theme.css";
import 'primeicons/primeicons.css';
import { NavBar } from '@/components/NavBar/NavBar';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuth } from '@/hooks/useAuth';
import { getUserByPassport } from '@/db/user';
import { useRouter } from 'next/navigation';
import { i18n } from '@/config/translations.config';
import { useI18n } from '@/hooks/useI18n';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { SelectItemOptionsType } from 'primereact/selectitem';
import "node_modules/flag-icons/css/flag-icons.min.css";


const inter = Inter({ subsets: ['latin'] })

const LanguageOptions: SelectItemOptionsType = [
  {
    name: "en",
    value: "en",
    icon: "fi fi-gb"

  },
  {
    name: "ar",
    value: "ar",
    icon: "fi fi-sa"
  },
  {
    name: "fr",
    value: "fr",
    icon: "fi fi-fr"
  },
  {
    name: "ur",
    value: "ur",
    icon: "fi fi-pk"
  },
  {
    name: "ph",
    value: "ph",
    icon: "fi fi-ph"
  },
]

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
  const { updateLocale, loadLocale, locale } = useI18n();
  const [selectedLanguage, setSelectedLanguage] = useState(LanguageOptions[0])


  useEffect(() => {
    loadLocale().then(() => {
      setSelectedLanguage(i18n.locale)
    });
  }, [locale])

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

  const onLanguageChange = (e: SelectButtonChangeEvent) => {
    updateLocale(e.value);
    setSelectedLanguage(e.value)
  };

  return (
    <html lang="en">
      <head>
        <title>Labaik Web</title>
        <meta name="description" content="Labaik Web App - Mekka Hotels and Towers"></meta>
      </head>
      <body className={`lg:hidden max-h-[100vh] overflow-hidden ${inter.className}`} suppressHydrationWarning={true} >
        {children}
        <NavBar onSettingsClick={() => { setVisible(true) }} />
        <Dialog className="fixed inset-0 h-screen z-50" contentClassName="w-full h-full flex flex-col items-center justify-center" baseZIndex={100} maximized modal visible={visible} onHide={() => setVisible(false)}>
          <div className="flex flex-col items-center gap-5 w-full px-5">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="font-bold pr-primary ">{i18n.t("actions.changeLanguage")}</div>
              <SelectButton className='flex' value={selectedLanguage} onChange={onLanguageChange}
                optionLabel="name" optionValue='value'
                itemTemplate={(option) => (<span className={option.icon}></span>)}
                options={LanguageOptions} />
            </div>
            <img className="h-64" src="/transparent-logo.png" />
            {!loggedInPassport ?
              <>
                <InputText className="w-full" placeholder='Enter your passport' value={passport} onChange={(e) => setPassport(e.target.value)} />
                <Button onClick={onLogin} className="w-[70%]" label={i18n.t("actions.login")} />
              </>
              :
              <Button onClick={onLogout} className="w-[70%]" label={i18n.t("actions.logout")} />
            }
          </div>
        </Dialog >
      </body>
    </html >
  )
}


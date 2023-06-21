"use client"
import { i18n } from '@/config/translations.config';
import { getUserByPassport } from '@/db/user';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { passport, getUserPassport } = useAuth();
    const [imageUrl, setImageUrl] = useState(null);
    const { replace } = useRouter();


    const initScreen = async () => {
        try {
            const passport = await getUserPassport();
            if (passport) {
                getUserByPassport(passport).then((data: any) => {
                    setImageUrl(data.digitalIdentityURL);
                })
            }

            if (!passport) {
                alert(i18n.t("messages.digitalIdentityLoginRequired"))
                replace("App");
            }
        } catch (err) {
            console.log(`Identity: useEffect: ${err}`)
        }
    }

    useEffect(() => {
        initScreen();
    }, [passport]);

    return (
        <div>Page</div>
    )
}

export default Page
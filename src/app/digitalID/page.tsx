"use client"
import { i18n } from '@/config/translations.config';
import { getUserByPassport } from '@/db/user';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { app } from '@/db/config';
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
                replace("/");
            }
        } catch (err) {
            console.log(`Identity: useEffect: ${err}`)
        }
    }

    useEffect(() => {
        initScreen();
    }, [passport]);


    useEffect(() => {
        const bucket = getStorage(app);
        const file = ref(bucket, `/digital-identities/User-1`);

        getDownloadURL(file)
            .then((url: any) => {
                setImageUrl(url);
                console.log("Upload Url:", url);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-2">
            <img
                className="w-1/2 "
                src={imageUrl || ""}
                alt="Digital ID"
            />
            <div className="w-1/2 text-center font-bold text-3xl text-[#2d3436]">{i18n.t("title.digitalIdentity")}</div>
        </div>
    )
}

export default Page
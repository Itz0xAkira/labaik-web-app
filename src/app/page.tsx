"use client"
import { Banner } from '@/components/Banner/Banner'
import { ServiceButtonsList } from '@/components/ServiceButtonsList/ServiceButtonsList';
import { i18n } from '@/config/translations.config';
import { useI18n } from '@/hooks/useI18n';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';


export default function Home() {
  const { isLoading } = useI18n();

  const Content = () => {
    return (
      <>
        <Banner />
        <div className="flex w-full justify-between items-center p-2 absolute top-[24vh]">
          <Button className="rounded-xl bold text-white bg-[#24272C] border-none shadow-lg" label={i18n.t("keywords.services")} />
          <Button className="rounded-xl bold text-white bg-[#24272C] border-none shadow-lg" label={i18n.t("keywords.news")} />
        </div>
        <ServiceButtonsList />
      </>
    )
  };

  return (
    <main className="flex flex-col min-h-screen">
      {isLoading ? <ProgressSpinner /> : <Content />}
    </main>
  )
}

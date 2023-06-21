"use client"
import { Banner } from '@/components/Banner/Banner'
import { ServiceButton } from '@/components/ServiceButton/ServiceButton'
import { BookIcon, CameraIcon, ClinicIcon, IdentityIcon, MealIcon, ReviewIcon, ScheduleIcon, complainIcon } from '@/config/icons'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';

export default function Home() {
  const { push } = useRouter();


  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <div className="flex w-full justify-between items-center p-2 absolute top-[24vh]">
        <Button className="rounded-xl bold text-white bg-[#24272C] border-none shadow-lg" label='Services' />
        <Button className="rounded-xl bold text-white bg-[#24272C] border-none shadow-lg" label='News' />
      </div>
      <div className="flex flex-col justify-center w-full h-[80vh]">
        <img className="w-full" src="/backgrounds/UpperService.png" />
        <div className="overflow-x-auto flex flex-col gap-2 justify-around flex-wrap  w-full max-w-full h-[40vh] md:h-[38vh] p-8" >
          <ServiceButton
            label='Digital ID'
            icon={IdentityIcon}
            onClick={() => { }}
          />
          <ServiceButton
            label='Review'
            icon={ReviewIcon}
            onClick={() => { window.open("https://docs.google.com/forms/d/e/1FAIpQLSc-fMjLICw6HIzYJ6IRO5_JpKwdc4-DF8VvEn6YSdlaA0PPlg/viewform?usp=sf_link", '_blank'); }}
          />
          <ServiceButton
            label='Meals'
            icon={MealIcon}
            onClick={() => { push("meals") }}
          />
          <ServiceButton
            label='Schedule'
            icon={ScheduleIcon}
            onClick={() => { push("schedule") }}
          />
          <ServiceButton
            label='Clinic'
            icon={ClinicIcon}
            onClick={() => { }}
          />
          <ServiceButton
            label='Guides'
            icon={BookIcon}
            onClick={() => { }}
          />
          <ServiceButton
            label='Complaints'
            icon={complainIcon}
            onClick={() => { }}
          />
          <ServiceButton
            label='Streams'
            icon={CameraIcon}
            onClick={() => { }}
          />
        </div>
        <img className="w-full" src="/backgrounds/LowerService.png" />
      </div>
    </main>
  )
}

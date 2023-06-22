"use client"
import React from 'react'
import { ServiceButton } from '../ServiceButton/ServiceButton';
import { BalanceIcon, BookIcon, CameraIcon, ClinicIcon, HalalIcon, IdentityIcon, MealIcon, ReviewIcon, ScheduleIcon, complainIcon } from '@/config/icons';
import { i18n } from '@/config/translations.config';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/hooks/useI18n';
import { Router } from 'next/router';

export const ServiceButtonsList = () => {
    const { push } = useRouter();

    return (
        <div className="flex flex-col justify-center w-full h-[80vh]">
            <img className="w-full" src="/backgrounds/UpperService.png" />
            <div className="overflow-x-auto flex flex-col gap-2 justify-around flex-wrap  w-full max-w-full h-[40vh] md:h-[38vh] p-8" >
                <ServiceButton
                    label={i18n.t("title.digitalIdentity")}
                    icon={IdentityIcon}
                    onClick={() => { push("digitalID") }}
                />
                <ServiceButton
                    label={i18n.t("title.review")}
                    icon={ReviewIcon}
                    onClick={() => { window.open("https://docs.google.com/forms/d/e/1FAIpQLSc-fMjLICw6HIzYJ6IRO5_JpKwdc4-DF8VvEn6YSdlaA0PPlg/viewform?usp=sf_link", '_blank'); }}
                />
                <ServiceButton
                    label={i18n.t("title.meals")}
                    icon={MealIcon}
                    onClick={() => { push("meals") }}
                />
                <ServiceButton
                    label={i18n.t("title.schedule")}
                    icon={ScheduleIcon}
                    onClick={() => { push("schedule") }}
                />
                <ServiceButton
                    label={i18n.t("title.clinic")}
                    icon={HalalIcon}
                    onClick={() => { push("clinic") }}
                />
                <ServiceButton
                    label={i18n.t("title.fatwa")}
                    icon={BalanceIcon}
                    onClick={() => { push("guides") }}
                />
                <ServiceButton
                    label={i18n.t("title.report")}
                    icon={complainIcon}
                    onClick={() => { push("complaints") }}
                />
                <ServiceButton
                    label={i18n.t("title.stream")}
                    icon={CameraIcon}
                    onClick={() => { push("streams") }}
                />
            </div>
            <img className="w-full" src="/backgrounds/LowerService.png" />
        </div>
    )
}

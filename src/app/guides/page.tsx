"use client"
import React, { useEffect, useRef, useState } from 'react'
import { ActionButton } from '@/components/ServiceButton/ServiceButton';
import { i18n } from '@/config/translations.config';
import { PhoneIcon, BalanceIcon } from '@/config/icons';

const Page = () => {
    const phoneNumber = '+966580080933'; // Replace with your desired phone number

    const handleCall = () => {
        window.open(`tel:${phoneNumber}`);
    };

    const handleClick = () => {
        window.open("https://binbaz.org.sa/");
        // Or you can use any other method to handle the click event
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <ActionButton
                label={i18n.t("title.fatwa")}
                icon={BalanceIcon}
                onClick={handleClick} className='w-[90vw] mt-6 ml-5' />
            <ActionButton
                label={i18n.t("actions.callus")}
                icon={PhoneIcon}
                onClick={handleCall} className='w-[90vw] mt-6 ml-5' />
        </div>
    );

}

export default Page
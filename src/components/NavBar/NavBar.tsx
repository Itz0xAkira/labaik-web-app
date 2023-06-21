"use client"
import React, { FC } from 'react'
import { NavBarButton } from '../NavBarButton/NavBarButton'
import { useRouter } from 'next/navigation'

const HomeButton = () => {
    const { push } = useRouter();

    return (
        <div className="relative w-16 h-16 z-10 cursor-pointer transition-all duration-150 opacity-100 hover:opacity-90 drop-shadow-md"
            onClick={() => { push("/") }}
        >
            <div className="absolute -left-2 md:-left-5 w-14 h-14 md:w-20 md:h-20 rounded-full -top-[60%] md:-top-[100%] flex justify-center items-center">
                <div className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full drop-shadow-md bg-white">

                </div>
                <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full drop-shadow-md bg-[#404964] flex justify-center items-center">
                    <i className="pi pi-home text-3xl md:text-5xl" />
                </div>
            </div>
        </div>
    )
}


export const NavBar: FC<{ onSettingsClick: () => void; }> = ({ onSettingsClick }) => {
    const { push } = useRouter();

    return (
        <div id="tab-bar" className=" absolute bottom-0 left-0 w-full
         h-[10%] rounded-tr-[4rem] flex justify-between items-center px-5">

            <NavBarButton text={"Settings"} icon='pi pi-cog' onClick={() => { onSettingsClick() }} />
            <NavBarButton text={"Digital ID"} icon='pi pi-qrcode' onClick={() => { push("digitalID") }} />
            <HomeButton />
            <NavBarButton text={"Schedule"} icon='pi pi-calendar' onClick={() => { push("schedule") }} />
            <NavBarButton text={"Map"} icon='pi pi-map-marker' onClick={() => { }} />
        </div>
    )
}

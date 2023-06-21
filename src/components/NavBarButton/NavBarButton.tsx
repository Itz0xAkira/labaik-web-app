import React, { FC } from 'react'

export const NavBarButton: FC<{ className?: string; text: string; icon: string; onClick: () => void; }> = ({ className = "", text, icon, onClick }) => {
    return (
        <div className={`transition-all duration-150 opacity-100 hover:opacity-60 flex flex-col justify-center items-center gap-2 cursor-pointer ${className}`} {...{ onClick }}>
            <i className={`${icon} color-["] text-lg md:text-3xl`} style={{ color: "var(--secondary-color)" }}></i>
            <div className="text-center text-sm md:text-lg">{text}</div>
        </div>
    )
}

import React, { FC } from 'react'

export const ScheduleItem: FC<{ label: string; time: string; }> = ({ label, time }) => {
    return (
        <div className="flex justify-between items-center p-5 border-b-2 border-b-[#2d343630]">
            <div className="text-[#2d3436] text-2xl">{label}</div>
            <div className="text-[#2d3436] font-bold text-2xl">{time}</div>
        </div>
    )
}

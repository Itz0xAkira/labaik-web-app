import React, { FC } from 'react'

export const ScheduleItem: FC<{ label: string; time: string; }> = ({ label, time }) => {
    return (
        <div className="flex justify-between items-center p-5">
            <div className="text-[#2d3436] text-4xl">{label}</div>
            <div className="text-[#2d3436] font-bold text-2xl">{time}</div>
        </div>
    )
}

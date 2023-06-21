import React from 'react'
import { Counter } from '../Counter/Counter'

export const Banner = () => {
    return (
        <div className="w-full h-[15vh] overflow-hidden bg-[#2A2E34] rounded-bl-[4rem] flex">
            <img className='max-h-[20vh] relative -left-20 md:-left-28' src="/backgrounds/top-bar-background.png" />
            <Counter className='bg-gradient-to-b from-[#fffbf3c0] to-[#fff5e5c0] 
            p-5 flex flex-col justify-center gap-2 w-[80%] rounded-3xl absolute top-[5%] left-[10%]'
                counterContainerClassName="flex gap-4"
                title={"Next Prayer"}
                remainingTimeInSeconds={100} onFinish={() => { }} />
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Counter } from '../Counter/Counter'
import { getPrayers } from '@/config/prayers';
import { i18n } from '@/config/translations.config';
import { getGroupByNumber } from '@/db/groups';
import { getImportantNews } from '@/db/news';
import { getUserByPassport } from '@/db/user';
import moment from 'moment';
import { useAuth } from '@/hooks/useAuth';
import { ProgressSpinner } from 'primereact/progressspinner';

export const Banner = () => {
    const { passport, isLoading: isPassportLoading } = useAuth();
    const [countdownTime, setCountdownTime] = useState<number>(0);
    const [countdownTitle, setCountdownTitle] = useState("");
    const [refreshCounter, setRefreshCounter] = useState(false)
    const [news, setNews] = useState(i18n.t("messages.noNewsYet"));


    useEffect(() => {
        try {
            getImportantNews().then(importantNews => {
                if (importantNews) {
                    setNews(importantNews.content)
                } else {
                    setNews(i18n.t("messages.noNewsYet"));
                }
            })


            getPrayers().then((timings: any) => {
                let leastTime = Infinity;
                let leastTimeKey = "fajr";
                for (let timingKey in timings) {
                    const time = moment(timings[timingKey], "HH:mm");

                    if (time.isBefore(moment())) {
                        time.add(1, 'days');
                    }

                    const timeDifference = time.diff(moment()) / 1000;
                    if (timeDifference > 0 && timeDifference < leastTime) {
                        leastTime = timeDifference;
                        leastTimeKey = timingKey;
                    }
                }
                // setCountdownTime(leastTime);
                // setCountdownTitle(i18n.t(`prayers.${leastTimeKey}`));
                // console.log("LeastTime:", leastTime);
                // console.log("LeastTimeKey:", leastTimeKey);


                if (passport) {
                    getUserByPassport(passport).then(data => {
                        if (!data) {
                            return;
                        }

                        getGroupByNumber(data.groupNumber).then((groupData: any) => {
                            const { meals } = groupData;
                            let isMealEarlierThanPrayer = false;
                            for (let mealKey in meals) {
                                const mealName = meals[mealKey].name;
                                const mealTime = meals[mealKey].time;
                                const time = moment(mealTime, "HH:mmA");

                                if (time.isBefore(moment())) {
                                    time.add(1, 'days');
                                }

                                const timeDifference = time.diff(moment()) / 1000;

                                if (timeDifference > 0 && timeDifference < leastTime) {
                                    leastTime = timeDifference;
                                    leastTimeKey = mealName;
                                    isMealEarlierThanPrayer = true;
                                }
                            }

                            if (!isMealEarlierThanPrayer) {
                                // To setup early calculated Prayer Info
                                setCountdownTitle(i18n.t(`prayers.${leastTimeKey}`));
                                setCountdownTime(leastTime);
                                return;
                            }


                            switch (leastTimeKey.toLowerCase().trim()) {
                                case "breakfast":
                                    setCountdownTitle(i18n.t("meals.breakfastTime"));
                                    break;
                                case "lunch":
                                    setCountdownTitle(i18n.t("meals.lunchTime"));
                                    break;
                                case "dinner":
                                    setCountdownTitle(i18n.t("meals.dinnerTime"));
                                    break;
                            }
                            setCountdownTime(leastTime);
                        })
                    })

                } else {
                    setCountdownTitle(i18n.t(`prayers.${leastTimeKey}`));
                    setCountdownTime(leastTime);
                }
            })
        } catch (err) {
            console.log(`Home: useEffect: ${err}`)
        }
    }, [passport, refreshCounter]);


    return (
        <div className="w-full h-[15vh] overflow-hidden bg-[#2A2E34] rounded-bl-[4rem] flex">
            <img className='max-h-[20vh] relative -left-20 md:-left-28' src="/backgrounds/top-bar-background.png" />
            {
                !countdownTime || !countdownTitle || isPassportLoading ?
                    <ProgressSpinner />
                    :
                    <Counter className='bg-gradient-to-b from-[#fffbf3c0] to-[#fff5e5c0] 
            p-5 flex flex-col justify-center gap-2 w-[80%] rounded-3xl absolute top-[5%] left-[10%]'
                        counterContainerClassName="flex gap-4"
                        title={countdownTitle}
                        remainingTimeInSeconds={countdownTime} onFinish={() => { }} />
            }
        </div>
    )
}

"use client"
import { Counter } from '@/components/Counter/Counter';
import { ScheduleItem } from '@/components/ScheduleItem/ScheduleItem';
import { i18n } from '@/config/translations.config';
import { getGroupByNumber } from '@/db/groups';
import { getUserByPassport } from '@/db/user';
import { useAuth } from '@/hooks/useAuth';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';


type Meals = {
    breakfast: string;
    lunch: string;
    dinner: string;
}

const Page = () => {

    const { passport, getUserPassport } = useAuth();
    const [meals, setMeals] = useState<Meals | null>(null);
    const [timeTillNextMeal, setTimeTillMeal] = useState<number>(0);
    const [nextMeal, setNextMeal] = useState("");
    const [refreshCounter, setRefreshCounter] = useState(false)
    const { replace } = useRouter();


    const initScreen = async () => {
        try {
            const passport = await getUserPassport();
            if (passport) {
                getUserByPassport(passport).then((data: any) => {
                    getGroupByNumber(data.groupNumber).then((groupData: any) => {
                        let leastTime = Infinity;
                        let leastTimeKey = null;
                        const { meals } = groupData;
                        const formattedMeals: Meals = {
                            breakfast: "--:--",
                            lunch: "--:--",
                            dinner: "--:--"
                        };

                        meals.forEach((meal: any) => {
                            switch (meal.name.toLowerCase().trim()) {
                                case "breakfast":
                                    formattedMeals.breakfast = meal.time;
                                    break;
                                case "lunch":
                                    formattedMeals.lunch = meal.time;
                                    break;
                                case "dinner":
                                    formattedMeals.dinner = meal.time;
                                    break;
                            }
                        });

                        setMeals(formattedMeals);
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
                            }
                        }

                        switch (leastTimeKey.toLowerCase().trim()) {
                            case "breakfast":
                                setNextMeal(i18n.t("meals.breakfastTime"));
                                break;
                            case "lunch":
                                setNextMeal(i18n.t("meals.lunchTime"));
                                break;
                            case "dinner":
                                setNextMeal(i18n.t("meals.dinnerTime"));
                                break;
                        }
                        setTimeTillMeal(leastTime);
                    })
                })
            }

            if (!passport) {
                alert(i18n.t("messages.mealsLoginRequired"))
                replace("/");
            }
        } catch (err) {
            console.log(`Meals: useEffect: ${err}`)
        }
    }

    useEffect(() => {
        initScreen();
    }, [passport, refreshCounter]);

    if (!meals || !timeTillNextMeal || !nextMeal) {
        return (
            <div className="flex justify-center items-center">
                <ProgressSpinner />
            </div>
        )
    }


    return (
        <>
            <div className="w-full h-[25vh] overflow-hidden bg-gradient-to-b from-[#ffffffc0] to-[#ffffffb0] flex justify-center items-center">
                <Counter className=' 
            p-5 flex flex-col justify-center gap-2 w-[80%] rounded-3xl'
                    counterContainerClassName="flex gap-4"
                    title={nextMeal}
                    remainingTimeInSeconds={timeTillNextMeal} onFinish={() => { setRefreshCounter(!refreshCounter) }} />


            </div>
            <div className="w-full h-[65vh] bg-[#ffffff40]">
                <ScheduleItem label={i18n.t("meals.breakfastTime")} time={meals?.breakfast as any} />
                <ScheduleItem label={i18n.t("meals.lunchTime")} time={meals?.lunch as any} />
                <ScheduleItem label={i18n.t("meals.dinnerTime")} time={meals?.dinner as any} />
            </div>
        </>
    )
}

export default Page
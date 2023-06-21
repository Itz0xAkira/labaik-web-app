"use client"
import { Counter } from '@/components/Counter/Counter'
import { ScheduleItem } from '@/components/ScheduleItem/ScheduleItem'
import { i18n } from '@/config/translations.config'
import { getGroupByNumber } from '@/db/groups'
import { getUserByPassport } from '@/db/user'
import { useAuth } from '@/hooks/useAuth'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Activity = {
    name: string;
    time: string;
}

const Schedule = () => {

    const { passport, getUserPassport } = useAuth();
    const [activities, setActivities] = useState<Array<Activity>>([]);
    const [timeTillNextActivity, setTimeTillActivity] = useState<number>(0);
    const [loadingActivities, setLoadingActivities] = useState<boolean>(true);
    const [nextActivity, setNextActivity] = useState<any>("");
    const [refreshCounter, setRefreshCounter] = useState(false)
    const { replace } = useRouter();


    const initScreen = async () => {
        try {
            const passport = await getUserPassport();
            if (passport) {
                getUserByPassport(passport).then((data: any) => {
                    getGroupByNumber(data.groupNumber as any).then((groupData: any) => {
                        let leastTime = Infinity;
                        let leastTimeKey = null;
                        const { activities } = groupData;
                        const formattedActivities: Array<Activity> = activities.map((activity: any) => ({
                            name: activity.name,
                            time: moment(activity.time.toDate()).format("DD/MM HH:mm A")
                        }));

                        formattedActivities.forEach((activity) => {
                            const timeDifference = moment(activity.time, "DD/MM HH:mm A").diff(moment()) / 1000;
                            console.log("Evaluating Activity:", activity)
                            console.log("Evaluating Activity Time Difference:", timeDifference)
                            if (timeDifference > 0 && timeDifference < leastTime) {
                                leastTime = timeDifference;
                                leastTimeKey = activity.name;
                            }
                        });
                        setNextActivity(leastTimeKey)
                        if (isNaN(leastTime) || leastTime === Infinity) {
                            setTimeTillActivity(0)
                        } else {
                            setTimeTillActivity(leastTime);

                        }
                        formattedActivities.sort((a, b) => moment(a.time, "DD/MM HH:mm A").diff(moment()) - moment(b.time, "DD/MM HH:mm A").diff(moment()))
                        setActivities(formattedActivities);
                    })
                }).finally(() => {
                    setLoadingActivities(false)
                })
            }

            if (!passport) {
                alert(i18n.t("messages.scheduleLoginRequired"))
            }
        } catch (err) {
            console.log(`Schedule: useEffect: ${err}`)
        }
    }

    useEffect(() => {
        initScreen();
    }, [passport, refreshCounter]);

    return (
        <>
            <div className="w-full h-[25vh] overflow-hidden bg-gradient-to-b from-[#ffffffc0] to-[#ffffffb0] flex justify-center items-center">
                <Counter className=' 
            p-5 flex flex-col justify-center gap-2 w-[80%] rounded-3xl'
                    counterContainerClassName="flex gap-4"
                    showDays
                    title={nextActivity}
                    remainingTimeInSeconds={timeTillNextActivity} onFinish={() => { }} />


            </div>
            <div className="w-full h-[65vh] bg-[#ffffff40]">
                {activities.map(({ name, time }) => {
                    return (
                        <ScheduleItem label={name} time={time} />
                    )
                })}
            </div>
        </>
    )
}

export default Schedule
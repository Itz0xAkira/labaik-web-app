import moment from 'moment'
import { i18n } from '../../config/translations.config'
import React, { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

type CounterProps = {
    title: string;
    className?: string;
    counterContainerClassName?: string;
    remainingTimeInSeconds: number;
    onFinish: () => void;
    showDays?: boolean;
}

export const Counter: React.FC<CounterProps> = ({ className = "", counterContainerClassName = "", title, remainingTimeInSeconds, onFinish, showDays = false }) => {
    const [countDownInSeconds, { startCountdown, resetCountdown }] = useCountdown({ countStart: remainingTimeInSeconds, intervalMs: 1000 });
    useEffect(() => {
        resetCountdown();
        startCountdown();
    }, [remainingTimeInSeconds])

    useEffect(() => {
        if (countDownInSeconds <= 0) {
            onFinish();
        }
    }, [countDownInSeconds])

    const getRemainingHours = () => {
        const remainingHours = moment.duration(countDownInSeconds, 'seconds').hours();
        return remainingHours > 9 ? remainingHours : `0${remainingHours}`;
    }

    const getRemainingMinutes = () => {
        const remainingMinutes = moment.duration(countDownInSeconds, 'seconds').minutes();
        return remainingMinutes > 9 ? remainingMinutes : `0${remainingMinutes}`;
    }

    const getRemainingSeconds = () => {
        const remainingSeconds = moment.duration(countDownInSeconds, 'seconds').seconds();
        return remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`;
    }

    const getRemainingDays = () => {
        const remainingDays = moment.duration(countDownInSeconds, 'seconds').days();
        return remainingDays > 9 ? remainingDays : `0${remainingDays}`;
    }

    return (
        <div className={` ${className}`} style={styles.container}>
            <div className="text-[#24272C] text-2xl font-bold">{title}</div>
            <div className={` ${counterContainerClassName}`}>

                {showDays ? (
                    <div style={styles.countContainer}>
                        <div style={styles.countdivContainer}>
                            <div style={styles.countdiv}>{getRemainingDays()}</div>
                        </div>
                        <div style={styles.countLabel}>{i18n.t("time.day")}</div>
                    </div>
                ) : null}
                <div style={styles.countContainer}>
                    <div style={styles.countdivContainer}>
                        <div style={styles.countdiv}>{getRemainingHours()}</div>
                    </div>
                    <div style={styles.countLabel}>{i18n.t("time.hour")}</div>
                </div>
                <div style={styles.countContainer}>
                    <div style={styles.countdivContainer}>
                        <div style={styles.countdiv}>{getRemainingMinutes()}</div>
                    </div>
                    <div style={styles.countLabel}>{i18n.t("time.minute")}</div>
                </div>
                <div style={styles.countContainer}>
                    <div style={styles.countdivContainer}>
                        <div style={styles.countdiv}>{getRemainingSeconds()}</div>
                    </div>
                    <div style={styles.countLabel}>{i18n.t("time.second")}</div>
                </div>
            </div>
        </div>
    )
}


const styles: any = {
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute"
    }, countContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    }, countdivContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#24272C",
        height: 50,
        width: 45,
        textAlign: "center",
        borderRadius: 5
    }, countdiv: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 25,
    },
    countLabel: {
        marginTop: 2,
        fontSize: 15,
        textAlign: "center",
        color: "#24272C"
    }
};
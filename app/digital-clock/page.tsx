"use client"

import { useEffect, useState } from "react"

const DigitalClock = () => {
    const [time, setTime] = useState<Date | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            {time?.toString()}
        </div>
    )
}

export default DigitalClock
import {useEffect, useState} from 'react'


export default function TakeQuiz(){

    // Time in seconds
    const [timer, setTimer] = useState(65)
    const [timerString, setTimerString] = useState(new Date(timer * 1000).toISOString().substr(11, 8))

    const decreaseTimer = () => {
        setTimer(timer-1)
    }

    // Every time our timer changes, we want to decrease the time again in 1 second
    useEffect(()=>{
        // Decrease the time in 1 second
        // Retain ID so we can cancel the itnerval and only decrease 1 time
        const intervalId = setInterval(decreaseTimer, 1000)
        return () => clearInterval(intervalId)
    }, [timer])

    //
    useEffect(()=>{
        setTimerString(new Date(timer * 1000).toISOString().substr(11, 8))
    }, [timer])

    return (
        <div>
            <p>{timerString}</p>
        </div>
    )
}
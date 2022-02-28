import { useEffect, useState } from 'react'
import Head from 'next/head'


export default function TakeQuiz() {

    // Time in seconds
    const [timer, setTimer] = useState(5)
    const [timerString, setTimerString] = useState(new Date(timer * 1000).toISOString().substr(11, 8))

    const decreaseTimer = () => {
        setTimer(timer - 1)
    }

    // Every time our timer changes, we want to decrease the time again in 1 second
    useEffect(() => {

        if (timer > 0) {
            // Decrease the time in 1 second
            // Retain ID so we can cancel the itnerval and only decrease 1 time
            const intervalId = setInterval(decreaseTimer, 1000)
            return () => clearInterval(intervalId)
        }

    }, [timer])

    // Update time string when timer changes
    useEffect(() => {
        setTimerString(new Date(timer * 1000).toISOString().substr(11, 8))
    }, [timer])

    return (

        <div className="w-full">
            <Head>
                <title>Profile Page</title>
                <meta name="description" content="Software Programming Quiz" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w min-h-screen">


                <div className="mx-auto p-2 text-center">
                    <h1 className="text-2xl">Programming Fundamentals</h1>
                    <p className="font-light text-lg">{timerString}</p>
                </div>

                <form>

                <div className="my-11 border-2 w-2/4 mx-auto rounded-md">
                    <div>
                        <div className="px-4 py-2 border-b-2 bg-indigo-100 font-bold">
                            1. 
                        </div>

                        <div className="px-4 py-2">
                            <fieldset>
                                <legend className="my-1">
                                    What is your favorite programming language?
                                </legend>

                                <div className="my-1">
                                    <input type="radio"></input>
                                    <label className="mx-2">Python</label>
                                </div>

                                <div className="my-1">
                                    <input type="radio"></input>
                                    <label className="mx-2">JavaScript</label>
                                </div>

                                <div className="my-1">
                                    <input type="radio"></input>
                                    <label className="mx-2">Rust</label>
                                </div>

                                <div className="my-1">
                                    <input type="radio"></input>
                                    <label className="mx-2">Go</label>
                                </div>
                               
                            </fieldset>
                        </div>

                    </div>

                </div>

                <div className="my-3 w-2/4 mx-auto">   
                    <button className="text-white font-semibold bg-indigo-600 w-28 py-2 px-6 rounded-md">Submit</button>
                </div>  

                </form>

            </main>
        </div>
    )
}
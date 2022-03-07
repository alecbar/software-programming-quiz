import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getQuizData } from '../../../utils/quiz.js'
import QuestionInput from '../../../components/questionInput'
import Router from 'next/router'

export default function TakeQuiz(props) {

    const { quizData } = props
    const { questions, name } = quizData

    const [selectedAnswers, setSelectedAnswers ] = useState(questions.map((_)=> []))

    useEffect(()=>{
        console.log(selectedAnswers)
    }, [selectedAnswers])

    const updateSelectedAnswers = (index, newAnswers) => {
        setSelectedAnswers(selectedAnswers.map((oldAnswers, i)=> i == index ? newAnswers : oldAnswers))
    }

    // Time in seconds
    const [timer, setTimer] = useState(10)
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
        }else{
            // time is up so we can redirect to a completed page
            //Router.push("/")

        }

    }, [timer])

    // Update time string when timer changes
    useEffect(() => {
        setTimerString(new Date(timer * 1000).toISOString().substr(11, 8))
    }, [timer])

    return (

        <div className="w-full">
            <Head>
                <title>{`Quiz - ${name}`}</title>
                <meta name="description" content="Software Programming Quiz" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w min-h-screen">


                <div className="mx-auto p-2 text-center">
                    <h1 className="text-2xl">{name}</h1>
                    <p className="font-light text-lg">{timerString}</p>
                </div>

                <form>

                    {questions.map((question, index)=> {

                        return <QuestionInput key={index} index={index} question={question} saveAnswer={updateSelectedAnswers}></QuestionInput>
                    })}

                    <div className="my-3 md:w-2/4 w-3/4 mx-auto">
                        <button className="text-white font-semibold bg-indigo-600 w-28 py-2 px-6 rounded-md">Submit</button>
                    </div>

                </form>

            </main>
        </div>
    )
}

// This gets called on every request
export async function getServerSideProps() {

    const quizData = await getQuizData("d3fd8e30-99e7-11ec-9ad5-160e4ff4a65d")
  
    console.log(quizData)

    // Pass data to the page via props
    return { props: {quizData} }
  }
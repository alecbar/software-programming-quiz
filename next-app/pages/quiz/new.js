import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import QuestionEditor from '../../components/questionEditor'
import QuestionCard from '../../components/questionCard'

export default function NewQuiz() {

    const { data: session, status } = useSession()

    const [questions, setQuestion] = useState([])
    const [name, setName] = useState("")
    const [error, setError] = useState(false)

    // Add a new question
    const saveQuestion = (newQuestion) => {
        const newQuestions = [...questions, newQuestion]
        console.log(newQuestions)
        setQuestion(newQuestions)
    };

    //Save the quix
    const saveQuiz = async () => {

        // Validate data
        if (questions.length && name) {
            setError(false)

            const res = await fetch("/api/quiz/new",
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            quizName: name,
                            quizUser: session.user.email,
                            quizQuestions: questions
                        })
                })

            // Success on res

            console.log(res)

        } else {
            setError(true)
        }
    }

    return (
        <div className="w-full">
            <Head>
                <title>Profile Page</title>
                <meta name="description" content="Software Programming Quiz" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w min:h-screen">

                <h1 className="grid text-center text-2xl text-indigo-900 my-2">Create a New Quiz</h1>

                <div className="my-2 text-center ">

                    <div className="m-4 w-2/4 mx-auto">
                        <label className="block text-md">Quiz Name</label>
                        <input
                            className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block"
                            placeholder="Enter a name..."
                            onChange={e => { setName(e.target.value) }}
                        />
                    </div>

                    <div className="m-4 w-2/4 mx-auto">
                        <h3 className="my-8 text-lg">Add Questions</h3>

                        <QuestionEditor saveQuestionHandler={saveQuestion} />

                    </div>
                </div>


                <div className="grid grid-rows text-center my-12">
                    <h3 className="m-2 text-xl" >Quiz Questions</h3>

                    {
                        questions.map((question, i) => {
                            return (<QuestionCard question={question} key={i} index={i}></QuestionCard>)
                        })
                    }

                </div>

                <div className="text-center text-red-500 p-2 h-4">
                    {error &&
                        <p>Please a name and questions for to save this quiz</p>
                    }
                </div>

                <div className="p-4 text-center">
                    <button
                        className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md"
                        onClick={(e) => { saveQuiz() }}
                    >
                        Save
                    </button>
                </div>

            </main>
        </div>
    )
}
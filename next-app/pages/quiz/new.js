import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import QuestionEditor from '../../components/questionEditor'
import QuestionCard from '../../components/questionCard'

export default function NewQuiz() {

    const { data: session, status } = useSession()

    // Using as an example for now on how the quiz question UI might work
    // this should be encompased in its own component 
    // if each was a question we could pass in a prop to edit or delete after it exists
    const [displayQuestion, setDisplayQuestion] = useState(false)


    // Array of questions in state
    const [questions, setQuestion] = useState([])

    const saveQuestion = (newQuestion) => {
        
        const newQuestions = [...questions, newQuestion]
        console.log(newQuestions)
        setQuestion(newQuestions)
    };  

    // Example
    // {
    //     "type": "",
    //     "question": "",
    //     "answers":[
            
    //     ],
    //     "correctAnswer": 0
    // }

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
                        <input className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block" placeholder="Enter a name..." />
                    </div>

                    <div className="m-4 w-2/4 mx-auto">    
                        <h3 className="my-8 text-lg">Add Questions</h3>

                        <QuestionEditor saveQuestionHandler={saveQuestion}/>

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

            </main>
        </div>
    )
}
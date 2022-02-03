import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'

export default function NewQuiz() {

    const { data: session, status } = useSession()

    // Using as an example for now on how the quiz question UI might work
    // this should be encompased in its own component 
    // if each was a question we could pass in a prop to edit or delete after it exists
    const [displayQuestion, setDisplayQuestion] = useState(false)

    return (
        <div className="w-full">
            <Head>
                <title>Profile Page</title>
                <meta name="description" content="Software Programming Quiz" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w h-screen">

                <h1 className="grid text-center text-2xl text-indigo-900 my-2">Create a New Quiz</h1>

                <div className="my-2 text-center ">

                    <div className="m-4 w-2/4 mx-auto">
                        <label className="block text-lg">Quiz Name</label>
                        <input className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block" placeholder="Enter a name..." />
                    </div>

                    <div className="m-4 w-2/4 mx-auto">    
                        <label className="block text-lg">Question Type</label>
                        <select className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block">
                            <option>True False</option>
                            <option>Multiple Choice</option>
                            <option>Multiple Selection</option>
                        </select>
                    
                        <div className="p-4">
                            <button className="text-lg">Add Question</button>
                        </div>
                    </div>
                </div>


                <div className="grid grid-rows text-center mt-12">
                    <h3 className="m-2 text-xl" >Quiz Questions</h3>

                    <div className="h-auto my-2 w-2/4 mx-auto" onClick={()=>{setDisplayQuestion(!displayQuestion)}}>
                        <div className="h-auto bg-indigo-100 grid grid-cols-8 p-2 gap-1 rounded-t-md">
                            <div className="col-span-7 text-left">
                                <h4>Question 1</h4>
                            </div>

                            <div className="col-span-1 text-right mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {
                            displayQuestion &&
                            
                            <div className="h-44 rounded-b-md border-2 border-indigo-100">

                            </div>
                        }

                    </div>

                </div>

            </main>
        </div>
    )
}
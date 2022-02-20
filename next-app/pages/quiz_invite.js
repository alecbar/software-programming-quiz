import Head from 'next/head'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function Invite() {
  const [canFirstName, setCanFirstName] = useState('');
  const [canLastName, setCanLastName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [quizId, setQuizId] = useState('');
  const [emailMsg, setEmailMsg] = React.useState('Upon clicking the link, your quiz will begin.  You will have 30 minutes for the quiz.')
  const [userCreated, setUserCreated] = useState(false);

  // TOOD: indicate success/failure to user
  const sendDataToApi = async (data) => {
    let response = await axios.post('/api/quiz-invite', data)
  }


  const submit = (e) => {
    e.preventDefault()
    sendDataToApi({ canFirstName, canLastName, userId, email, quizId })
    setUserCreated(true)
  }
const createQuiz = () => {
console.log('create quiz!')

    let temp = quizzes
    temp.push({
        quizName: canFirstName,
        id: uuid()
    })
    setQuizzes([...temp])
}

const handleSelect = (id, canFirstName) => {
    setSelectedQuiz(canFirstName)
    setEmailMsg(emailMsg + `<a href="localhost:3000/quiz/${id}">TAKE QUIZ</a>`)
}
let data = [
  {quizId, canFirstName, canLastName}
]

  return (
    <div className="w-full">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w h-screen">
        <div className="my-4 grid grid-rows-2 text-center">
          <h4 className="text-center text-2xl text-indigo-900">Quiz Invitation</h4>
          <p className="my-2 text-center">Send a Candidate a Quiz.</p>
        </div>

        <div className="my-2 grid text-center">

          {
            userCreated ?
              <div className="my-6 grid">
                <div className="flex justify-center items-center text-center h-28 bg-indigo-100 w-64 border-indigo-200 border-2 mx-auto rounded-md">
                  <p className="text-indigo-500">Your request for a quiz has been emailed to your candidate</p>
                </div>

                <a href="profile" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Locate</a>
              </div>
              :


              <form onSubmit={submit} className="my-6 grid grid-rows-6 text-center h-96">
                <div className="my-2">
                  <input
                    value={canFirstName}
                    placeholder="Candidate First Name"
                    onChange={e => setCanFirstName(e.target.value)}
                    className="py-2 border-2 rounded-md text-center border-indigo-200 w-64"
                  />
                </div>
                <div className="my-2">
                  <input
                    value={canLastName}
                    placeholder="Candidate Last Name"
                    onChange={e => setCanLastName(e.target.value)}
                    className="py-2 border-2 rounded-md text-center border-indigo-200 w-64"
                  />
                  </div>
                <div className="my-2">
                  <input
                    value={userId}
                    placeholder="User ID"
                    onChange={e => setUserId(e.target.value)}
                    className="py-2 border-2 rounded-md text-center border-indigo-200 w-64"
                  />
                </div>
                <div className="my-2">
                  <input
                    value={quizId}
                    placeholder="Quiz ID"
                    onChange={e => setQuizId(e.target.value)}
                    className="py-2 border-2 rounded-md text-center border-indigo-200 w-64"
                  />
                </div>
                <div className="my-2">
                  <input
                    value={email}
                    placeholder="Email Address"
                    onChange={e => setEmail(e.target.value)}
                    className="py-2 border-2 rounded-md text-center border-indigo-200 w-64"
                  />
                </div>
                 <div>

       {/* <textarea name="message" rows="5" value={emailMsg} />*/}

        <p>Preview Email Message:</p>
        <div dangerouslySetInnerHTML={{__html: emailMsg}} />


        </div>
                <div className="my-2">
                  <button type="submit" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto w-64">Submit</button>
                </div>
              </form>

          }
        </div>
      </main>
    </div>
  )
}

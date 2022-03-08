import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Profile.module.css'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import Multiselect from "multiselect-react-dropdown";
import Link from 'next/link'

export default function Profile() {

  const { data: session, status } = useSession()
  const [quizzes, setQuizzes] = useState([])
  const [quizInviteId, setQuizInviteId] = useState(null)

  useEffect(async () => {
    console.log("loading quizzes for user")

    const res = await fetch("/api/quiz/view/all/b8ab4702-c36a-42e8-81ef-400299b2ed93")
    const data = await res.json()
    console.log(data)
    setQuizzes(data.quizzes)
  }, [])

  const generateQuizInvite = (e) => {
    event.preventDefault();
    setQuizInviteId(self.crypto.randomUUID())
  }
  

  return (
    <div className="w-full">
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Software Programming Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w min-h-screen p-2">

        {
          session &&
          <h1 className="text-3xl mt-3 text-center text-indigo-900">Welcome, {session.user.name} </h1>
        }

        <div className="my-20 text-center ">
          <Link href="/quiz/new">
            <a className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Create Quiz</a>
          </Link>
        </div>

        <div className="my-20 justify-center text-center">
          <h2 className="text-2xl text-indigo-900">New Quiz Invite</h2>

          <form className="w-4/6 mx-auto" onSubmit={generateQuizInvite}>
            <label className="block text-md">Select Quiz</label>
            <select
              className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block">
                {quizzes.map((quiz)=> <option key={quiz.id}>{quiz.name}</option>)}
            </select>

            <label className="block text-md my-2">Email</label>
            <input
              className="py-2 border-2 my-2 rounded-md text-center border-indigo-200 w-full block"
              placeholder="Question..."
            />

            <label className="block text-md my-2">Invite Link</label>   
            <input
              className="py-2 border-2 my-2 rounded-md text-center border-indigo-200 w-full block"
              placeholder="Invite Link"
              value={quizInviteId ? `${window.location.origin}/quiz/take/${quizInviteId}` : null}
              disabled
            />

            <input type="submit" value="Generate invite" className="text-white font-semibold bg-indigo-600 m-2 py-2 px-6 rounded-md"/>
          </form>

        </div>

        <h2 className="grid text-center text-2xl text-indigo-900">Your Quizzes</h2>

        <div className="mt-3 justify-center text-center text-xl font-light">
          <table className="mx-auto border-collapse">
            <thead className="font-bold">
              <tr className="border-2 border-indigo">
                <td>Name</td>
              </tr>
            </thead>
            <tbody>
              {
                quizzes.map((quiz) => {
                  return (<tr key={quiz.id} className="border-2">
                    <td className="p-2 w-80">{quiz.name}</td>
                  </tr>)
                }
                )
              }
            </tbody>
          </table>
        </div>

      </main>

    </div>
  )
}


export async function getServerSideProps(context) {
  const { res } = context;
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: { session }
  }
}
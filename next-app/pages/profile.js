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
  const [quiz, setQuiz] = useState(["Python", "DevOps", "Algorithms", "Databases", "Web Development", "Data Structures"]);


  const [quizzes, setQuizzes] = useState([])

  useEffect(async () => {
    console.log("loading quizzes for user")

    const res = await fetch("/api/quiz/view/all/b8ab4702-c36a-42e8-81ef-400299b2ed93")
    const data = await res.json()
    console.log(data)
    setQuizzes(data.quizzes)
  }, [])


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
        <div className="App">
          <Multiselect
            isObject={false}
            onRemove={(event) => {
              console.log(event);
            }}
            onSelect={(event) => {
              console.log(event);
            }}
            options={quiz}
            selectedValues={["Python"]}
            showCheckbox
          />
        </div>

        <div className="my-20 text-center ">
          <Link href="/quiz/new">
            <a className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Create Quiz</a>
          </Link>
        </div>

        <div className="my-20 text-center ">
          <a href="quiz_invite" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Quiz Invite</a>
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
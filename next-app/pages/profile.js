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

  return (
    <div className="w-full">
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Software Programming Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w h-screen">

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
          <a href="quiz_invite" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Create Quiz</a>
        </div>

        <h2 className="grid text-center text-2xl text-indigo-900">Your Recent Quizzes</h2>

        <div className="mt-3 grid grid-cols-5 justify-center text-center text-xl font-light">
<<<<<<< HEAD
          <p className="my-auto p-2 col-start-2">Quiz 1
          </p>
          <a href="results" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="send" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Delete</a>
          <p className="my-auto p-2 col-start-2">Quiz 2</p>
          <a href="results" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="send" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Delete</a>
          <p className="my-auto p-2 col-start-2">Quiz 3</p>
          <a href="results" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="send" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Delete</a>
=======
          <p className="my-auto p-2 col-start-2">Quiz 1</p>
          <a href="#" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="#" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Send</a>
          <p className="my-auto p-2 col-start-2">Quiz 2</p>
          <a href="#" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="#" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Send</a>
          <p className="my-auto p-2 col-start-2">Quiz 3</p>
          <a href="#" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="#" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Send</a>
>>>>>>> 715e7a6db78c1be20fb9873abba01524f62e2a3a
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
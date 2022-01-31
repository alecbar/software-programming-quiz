import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Profile.module.css'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'

export default function Profile() {

  const { data: session, status } = useSession()

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

        <div className="my-20 text-center ">
          <a href="new_quiz" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Create Quiz</a>
        </div>

        <h2 className="grid text-center text-2xl text-indigo-900">Your Quizzes</h2>

        <div className="mt-3 grid grid-cols-5 justify-center text-center text-xl font-light">
          <p className="my-auto p-2 col-start-2">Quiz 1</p>
          <a href="results" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="send" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Send</a>
          <p className="my-auto p-2 col-start-2">Quiz 2</p>
          <a href="results" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="send" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Send</a>
          <p className="my-auto p-2 col-start-2">Quiz 3</p>
          <a href="results" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Results</a>
          <a href="send" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Send</a>
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
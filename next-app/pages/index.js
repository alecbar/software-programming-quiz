import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {

  const { data: session } = useSession()

  return (
    <div className="w-full">
      <Head>
        <title>Software Programming Quiz</title>
        <meta name="description" content="Software Programming Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w h-screen">

        <h1 className="text-3xl mt-3 text-center text-indigo-900">Welcome to Software Engineering Quiz</h1>
        <div className="my-20 grid grid-rows-3 justify-center text-center text-xl font-light">
          <p className="my-auto p-2">Quiz candidates on the content you need.</p>
          <p className="my-auto p-2">Easily create and send inivites to your own quizzes.</p>
          <p className="my-auto p-2">Save time recruiting top talent.</p>
        </div>

        {
          session ?
            <div className="my-20 grid grid-rows-3 text-center ">
              <h2 className="text-center text-2xl text-indigo-900">Get Started</h2>
              <p className="my-2 text-center">Go to your profile to get started.</p>
              <Link href="profile">
                <a className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Profile</a>
              </Link>
            </div>
            :
            <div className="my-20 grid grid-rows-3 text-center ">
              <h2 className="text-center text-2xl text-indigo-900">Get Started</h2>
              <p className="my-2 text-center">Create your profile to start desigining your own quizzes for your candidates.</p>
                <button onClick={() => signIn('cognito', {
                  callbackUrl: `${window.location.origin}/profile`
                })} className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Sign In</button>
            </div>
        }

      </main>

    </div>
  )
}

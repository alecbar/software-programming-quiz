import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function Home() {

  return (
    <div className="w-full">
      <Head>
        <title>Software Programming Quiz</title>
        <meta name="description" content="Software Programming Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w h-screen">

            <div className="my-6 grid grid-rows-3 text-center ">
              <h4 className="text-center text-2xl text-indigo-900">Sign In</h4>
              <p className="my-2 text-center">Sign in to your existing account.</p>
              <button onClick={() => signIn('cognito', {
                callbackUrl: `${window.location.origin}/profile`
              })} className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Sign In</button>
            </div>

            <div className="my-6 grid grid-rows-3 text-center ">
              <h4 className="text-center text-2xl text-indigo-900">Sign Up</h4>
              <p className="my-2 text-center">Register for a new account.</p>
              <Link href="signup">
                <a className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Sign Up</a>
              </Link>
            </div>
              

      </main>

    </div>
  )
}

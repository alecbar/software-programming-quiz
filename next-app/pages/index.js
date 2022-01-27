import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Footer from '../components/footer'
import Navbar from '../components/navbar'

export default function Home() {
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

        <div className="my-20 grid grid-rows-3 text-center ">
          <h2 className="text-center text-2xl text-indigo-900">Get Started</h2>
          <p className="my-2 text-center">Create your profile to start desigining your own quizzes for your candidates.</p>
          <a href="signup" className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Sign Up</a>
        </div>
    
      </main>
      
    </div>
  )
}

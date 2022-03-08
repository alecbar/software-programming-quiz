import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Profile.module.css'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import Select from 'react-select'
import Multiselect from 'multiselect-react-dropdown'
import Link from 'next/link'

export default function Profile() {

  const { data: session, status } = useSession()
  const [quiz, setQuiz] = useState(["Python", "DevOps", "Algorithms", "Databases", "Web Development", "Data Structures"]);
  const quizzes = [
    { value: '7bc09d55-aed1-4d02-afcb-e467f7ba78b2', label: 'Python' },
    { value: 'c4d506b6-88b2-4795-b2ba-937be52bbbbc', label: 'DevOps' },
    { value: '95fa8211-7b63-4a29-a161-ea912dab64e6', label: 'Algorithms' }
  ]

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
          <h1 className="text-3xl mt-5 text-center text-indigo-900">Welcome, {session.user.name} </h1>
        }

        <div className="mt-10 text-center ">
          <h4 className="text-center text-2xl text-indigo-900">Create a New Quiz</h4>
          
        </div>
        <div className="mt-5 text-center ">
        <Link href="/quiz/new">
            <a className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Create Quiz</a>
          </Link>
        </div>
        
        <div className="mt-10 grid grid-rows-2 text-center">
          <h4 className="text-center text-2xl text-indigo-900">Send Quiz Invitation</h4>
          <p className="mb-5 text-center">Select Quiz to send to a candidate.</p>
        </div>
        <div className="w-1/2 mx-auto py-2 border-2 rounded-md text-center border-indigo-100 block">
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
        <div className="my-5 text-center ">
        <Link href="/quiz_invite">
            <a className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Send Invite</a>
          </Link>
        </div>

        <div className="mt-10 grid grid-rows-2 text-center">
          <h4 className="text-center text-2xl text-indigo-900">Check Quiz Results</h4>
          <p className="my-2 text-center">Select a Quiz to see candidate results.</p>
        </div>
        <div className="w-1/2 mx-auto py-2 border-2 rounded-md text-center border-indigo-100 block">
          <Select
                    onChange={(event) => {
                      console.log(event);
                    }}
                    options={quizzes}
                    className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block">
          </Select>
        </div>
        <div className="my-5 text-center ">
        <Link href="/results">
            <a className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md mx-auto">Check Results</a>
          </Link>
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
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
        <title>Results</title>
        <meta name="description" content="Software Programming Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w h-screen">
      <h2 className="grid text-center text-2xl text-indigo-900">Quiz Results - Dev Ops</h2>
      <br></br>

<div>
  <table className="mx-auto border-collapse">
    <thead className="font-bold text-left">
      <tr className="border-2 border-indigo">
      <th>Candidate Name</th>
      <th>Score</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td className="p-2 w-80">Candidate 01</td>
            <td>90</td>
        </tr>
        <tr>
            <td className="p-2 w-80">Candidate 02</td>
            <td>85</td>
        </tr>
        <tr>
            <td className="p-2 w-80">Candidate 03</td>
            <td>-</td>
        </tr>
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
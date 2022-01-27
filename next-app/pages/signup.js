import Head from 'next/head'
import React from 'react'
import {useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Signup.module.css'
import axios from 'axios'
import { Button } from 'reactstrap';

export default function Home() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    const sendDataToApi = async (data) => {
       let response = await axios.post('/api/create-user', data)
    }
const submit = (e) => {
e.preventDefault()
sendDataToApi({firstName, lastName, email, company, password})
}

 // create a form on this page, and when complete (on button click) send data to the 'api' rout
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Candidate Assessment
        </h1>
        <h3>
          A comprehensive database of quizzes
        </h3>

        <p className={styles.description}>
          Register/Login
        </p>
        <form onSubmit={submit}>
        <div>
        <input value={firstName} placeholder="First Name"onChange={e=>setFirstName(e.target.value)} />
        </div>
        <input value={lastName} placeholder="Last Name" onChange={e=>setLastName(e.target.value)} />
        <div>
        <input value={company} placeholder="Company Name" onChange={e=>setCompany(e.target.value)} />
        </div>
        <input value={email} placeholder="email" onChange={e=>setEmail(e.target.value)} />
        <div>
        </div>
        <input value={password} placeholder="password" onChange={e=>setPassword(e.target.value)} />
        <div>
        <button type="submit">submit</button>
        </div>
        </form>
      </main>

    </div>
  )
}

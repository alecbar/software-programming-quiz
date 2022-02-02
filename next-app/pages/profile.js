import * as React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Profile.module.css'
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { v4 as uuid } from 'uuid'

export default () => {
  const { register, control, handleSubmit, } = useForm({
    mode: "onChange",
  });

const [name, setName] = React.useState('')
const [quizzes, setQuizzes] = React.useState([])
const [selectedQuiz, setSelectedQuiz] = React.useState(null)
const [emailMsg, setEmailMsg] = React.useState('Upon clicking the link, your quiz will begin.  You will have 30 minutes for the quiz.')

const createQuiz = () => {
console.log('create quiz!')

    let temp = quizzes
    temp.push({
        quizName: name,
        id: uuid()
    })
    setQuizzes([...temp])
}

const handleSelect = (id, name) => {
    setSelectedQuiz(name)
    setEmailMsg(emailMsg + `<a href="localhost:3000/quiz/${id}">TAKE QUIZ</a>`)
}

// react-router
//<Router>
//    // navbar - always rendered
//    <Routes>
//        // one route at a time
//        <Route path='quiz/:id' element={<MyQuizPage />}
//    <Routes>
//</Router>

//const MyQuizPage = () => {
//    const {id} = useParams()
//    quizzes.filter(x => x.id = id)
    // display the quiz here
//}

  return (
    <>
      {/*<form onSubmit={handleSubmit(d => console.log(d))}>*/}
        <h3>Generate a Unique Quiz</h3>
        <pre>SELECTED: {selectedQuiz}</pre>

        <div>
        <label></label>
        <input
         //{...register("quizName", )}
         value={name}
         onChange={(e) => setName(e.target.value)}
         placeholder="Quiz Name" />
        <button onClick={createQuiz}>Create</button>
        <ul>
        {quizzes.map(x=>
            <li onClick={() => handleSelect(x.id, x.quizName)}>
                {x.quizName}
                <br />
                <small>{x.id}</small>
            </li>
        )}

        </ul>
        </div>
        <h3>Send an Invitation to a Candidate</h3>
        <div>
        <label></label>
        <input {...register("firstName", )} placeholder=" Candidate First Name" />
        </div>
        <div>
        <input {...register("lastName", )} placeholder="Candidate Last Name" />
        </div>
         <div>

       {/* <textarea name="message" rows="5" value={emailMsg} />*/}

        <p>Preview Email</p>
        <div dangerouslySetInnerHTML={{__html: emailMsg}} />


        </div>
        <input {...register("email", )} placeholder="Candidate Email" />

        <input type="submit" />
      {/*</form>*/}

      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
};



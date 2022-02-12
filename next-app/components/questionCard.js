import { useState } from 'react'

const QuestionCard = (props) => {

    const {question, index} = props

    const [displayQuestion, setDisplayQuestion] = useState(false)

    return (
        <div className="h-auto my-2 w-2/4 mx-auto" onClick={() => { setDisplayQuestion(!displayQuestion) }}>
            <div className="h-auto bg-indigo-100 grid grid-cols-8 p-2 gap-1 rounded-t-md">
                <div className="col-span-7 text-left">
                    <h4>Question {index+1}</h4>
                </div>

                <div className="col-span-1 text-right mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {
                displayQuestion &&

                <div className="rounded-b-md border-2 border-indigo-100 align-middle">
                    <p className="m-auto block py-14">
                        {question.prompt}
                    </p>
                </div>
            }
        </div>
    )

}

export default QuestionCard;
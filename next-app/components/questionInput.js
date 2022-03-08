import { useState, useEffect } from 'react'

const QuestionInput = (props) => {

    const { index, question, saveAnswer } = props
    const { prompt, type, answers } = question
    const inputType = type == "multiple-selection" ? "checkbox" : "radio"

    const [selectedAnswers, setSelectedAnswers] = useState(answers.map(answer => false))

    useEffect(()=>{
        saveAnswer(index, selectedAnswers)
    }, [selectedAnswers])

    const handleChange = (e) => {

        let value = e.target.value
        let newSelectedAnswers = selectedAnswers

        // We want to update answers differently based on question type
        if(type == "multiple-selection"){
            newSelectedAnswers = newSelectedAnswers.map((v, i) => i == value ? !v: v)
        }else{
            newSelectedAnswers = newSelectedAnswers.map((_, i) => i == value ? true: false)
        }
        setSelectedAnswers(newSelectedAnswers)
    }

    return (
        <div className="my-11 border-2 md:w-2/4 w-3/4 mx-auto rounded-md">
            <div>
                <fieldset>
                    <div className="px-4 py-2 border-b-2 bg-indigo-100 font-bold">
                        <legend className="my-1">
                            {index + 1}. {prompt}
                        </legend>
                    </div>

                    <div className="px-4 py-2">
                        <span className="font-light capitalize text-gray-600">{type.split("-").join(" ")}</span>

                        {
                            answers.map((answer, i) => {
                                return (
                                    <div className="my-1" key={i}>
                                        <input
                                            type={inputType}
                                            name={`q${index + 1}`}
                                            id={i}
                                            value={i}
                                            onChange={handleChange}
                                            checked={selectedAnswers[i]}    
                                        ></input>
                                        <label className="mx-2" htmlFor={i}>{answer}</label>
                                    </div>
                                )
                            })
                        }

                    </div>
                </fieldset>
            </div>

        </div>
    )
}

export default QuestionInput;
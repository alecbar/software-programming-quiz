import { useState, useEffect } from 'react'

const QuestionInput = (props) => {


    const { index, question, saveAnswer } = props
    const { prompt, type, answers } = question

    const inputType = type == "multiple-selection" ? "checkbox" : "radio"

    // Map or transform question type to formatted string
    const questionType = questionType

    return (
        <div className="my-11 border-2 md:w-2/4 w-3/4 mx-auto rounded-md">
            <div>
                <fieldset>
                    <div className="px-4 py-2 border-b-2 bg-indigo-100 font-bold">
                        <legend className="my-1">
                            {i}. {prompt}
                        </legend>
                    </div>

                    <div className="px-4 py-2">
                        <span className="font-light">{questionType}</span>

                        {
                            answers.map((answer)=>{
                                return (
                                    <div className="my-1">
                                        <input type={inputType}></input>
                                        <label className="mx-2">{answer}</label>
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
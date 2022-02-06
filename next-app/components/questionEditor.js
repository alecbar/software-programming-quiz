import { useEffect, useState } from 'react'

const QuestionEditor = () => {

    const [type, setType] = useState("true-false")
    const [answersCount, setAnswersCount] = useState(2)
    const [prompt, setPrompt] = useState()
    const [answers, setAnswers] = useState(Array(answersCount).fill(""))
    console.log(answers)
    const [correctAnswer, setCorrectAnswer] = useState(0)

    const questionTypes = {
        "true-false": "True False",
        "multiple-choice": "Multiple Choice",
        "multiple-selection": "Multiple Selection"
    }

    const updateAnswer = (answer, i) => {
        const newAnswers = [...answers]
        newAnswers[i] = answer
        setAnswers(newAnswers)
    }

    // When type changes we want to change the number of answers available
    useEffect(()=>{
        let newCount;

        console.log(type)
        switch(type) {
            case "true-false":
                newCount = 2
            case "multiple-choice":
                newCount = 4
            case "multiple-selection":
                newCount = 4
        }

        console.log(newCount)
        if(newCount != answersCount){
            setAnswersCount(newCount)
        }
    }, [type])

    useEffect(()=>{
        setAnswers(Array(answersCount).fill(""))
    }, [answersCount])


    return (
        <>
            <div className="m-4 mx-auto">
                <label className="block text-md">Question Type</label>
                <select onChange={e => { setType(e.target.value) }} value={type} className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block">
                    {
                        Object.entries(questionTypes)
                            .map(([value, name]) => <option value={value}>{name}</option>)
                    }
                </select>

                <label className="block text-md my-2">Question</label>
                <input className="py-2 border-2 my-2 rounded-md text-center border-indigo-200 w-full block" placeholder="Question..." />

                <div>
                    <label className="block text-md">Answers</label>
                    {
                        answers.map((answer, i) => {
                            return (
                                <input
                                    className="py-2 border-2 my-2 rounded-md text-center border-indigo-200 w-full block"
                                    key={i}
                                    value={answer}
                                    onChange={ e => {
                                        updateAnswer(e.target.value, i)
                                    }
                                    }
                                    placeholder="Answer..."
                                />
                            )
                        })
                    }
                    <label className="block text-md">Select the correct Answer</label>
                    <select onChange={e => { setType(e.target.value) }} value={type} className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block">
                        {
                            answers.map((answer, i) => <option value={i}>{answer}</option>)
                        }
                    </select>

                </div>

                <div className="p-4">
                    <button className="float-right text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md">Save</button>
                </div>
            </div>
        </>
    )

};

export default QuestionEditor;
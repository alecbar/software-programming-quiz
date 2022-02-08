import { useEffect, useState } from 'react'

const QuestionEditor = () => {

    const [type, setType] = useState("true-false")
    const [answersCount, setAnswersCount] = useState(2)
    const [prompt, setPrompt] = useState()
    const [answers, setAnswers] = useState(Array(answersCount).fill(""))
    const [correctAnswer, setCorrectAnswer] = useState()

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
    useEffect(() => {
        let newCount;

        switch (type) {
            case "true-false":
                newCount = 2
                break;
            case "multiple-choice":
                newCount = 4
                break;
            case "multiple-selection":
                newCount = 4
                break;
        }

        if (newCount != answersCount) {
            setAnswersCount(newCount)
        }
    }, [type])

    useEffect(() => {
        setAnswers(Array(answersCount).fill(""))
    }, [answersCount])


    return (
        <>
            <div className="m-4 mx-auto">
                <label className="block text-md">Question Type</label>
                <select
                    onChange={e => { setType(e.target.value) }}
                    value={type}
                    className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block">
                    {
                        Object.entries(questionTypes)
                            .map(([value, name]) => <option key={value} value={value}>{name}</option>)
                    }
                </select>

                <label className="block text-md my-2">Question</label>
                <input
                    className="py-2 border-2 my-2 rounded-md text-center border-indigo-200 w-full block"
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Question..."
                    value={prompt}
                />
                <div>
                    <label className="block text-md">Answers</label>
                    {
                        answers.map((answer, i) => {
                            return (
                                <input
                                    className="py-2 border-2 my-2 rounded-md text-center border-indigo-200 w-full block"
                                    key={i}
                                    value={answer}
                                    onChange={e => {
                                        updateAnswer(e.target.value, i)
                                    }
                                    }
                                    placeholder="Answer..."
                                />
                            )
                        })
                    }
                    <label className="block text-md">Select the correct Answer</label>
                    <select
                        onChange={e => { setCorrectAnswer(e.target.value) }}
                        value={correctAnswer}
                        className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block">
                        {
                            answers.map((answer, i) => <option key={i} value={i}>{answer}</option>)
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
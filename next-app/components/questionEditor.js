import { useEffect, useState } from 'react'

const QuestionEditor = (props) => {

    const { saveQuestionHandler } = props

    const [type, setType] = useState("true-false")
    const [answersCount, setAnswersCount] = useState(2)
    const [prompt, setPrompt] = useState("")
    const [answers, setAnswers] = useState(Array(answersCount).fill(""))
    const [answersAdded, setAnswersAdded] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState([0])
    const [error, setError] = useState(false)

    const questionTypes = {
        "true-false": "True False",
        "multiple-choice": "Multiple Choice",
        "multiple-selection": "Multiple Selection"
    }

    const updateAnswers = (answer, i) => {
        const newAnswers = [...answers]
        newAnswers[i] = answer
        setAnswers(newAnswers)
    }

    const updateCorrectAnswers = (e) => {
        let answers = Array.from(e.target.selectedOptions, option => option.value);

        setCorrectAnswers(answers.map(str => parseInt(str, 10)))
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
        if (type == "true-false") {
            setAnswers(["True", "False"])

        } else {
            setAnswers(Array(answersCount).fill(""))
        }
    }, [answersCount])


    useEffect(() => {

        // If there are any empty answers in the answers array
        // Then answers still need to be added
        // And we should not show the answer selection

        const emptyAnswers = answers.filter(answer => answer == "")

        if (emptyAnswers.length > 0) {
            setAnswersAdded(false)
        } else {
            setAnswersAdded(true)
        }

    }, [answers])

    const saveQuestion = () => {



        // Validate question before saving 
        if(!prompt || !answersAdded){
            setError(true)
        }else{
            setError(false)

            // Question object
            const question = {
                "type": type,
                "prompt": prompt,
                "answers": answers,
                "correctAnswers": correctAnswers
            }
    
            saveQuestionHandler(question)

            // Reset question form
            setPrompt("")
            setAnswers(Array(answersCount).fill(""))
            setAnswersAdded(false)
        }
    };

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
                                    disabled={type == "true-false" ? true : false}
                                    value={answer}
                                    onChange={e => {
                                        updateAnswers(e.target.value, i)
                                    }
                                    }
                                    placeholder="Answer..."
                                />
                            )
                        })
                    }

                    {answersAdded &&
                        <>
                            <label className="block text-md">Select the correct {type == "multiple-selection" ? "answers" : "answer"}</label>
                            <select
                                multiple={type == "multiple-selection" ? true : false}
                                onChange={e => { updateCorrectAnswers(e) }}
                                value={type == "multiple-selection" ? correctAnswers : correctAnswers[0]}
                                className="py-2 border-2 rounded-md text-center border-indigo-200 w-full block">
                                {
                                    answers.map((answer, i) => <option key={i} value={i}>{answer}</option>)
                                }
                            </select>
                        </>
                    }
                </div>

                <div className="text-center text-red-500 p-2 h-4">
                    {error &&
                        <p>Please enter a question and answers</p>
                    }
                </div>

                <div className="p-4 text-center">
                    <button
                        className="text-white font-semibold bg-indigo-600 w-28 m-2 py-2 px-6 rounded-md"
                        onClick={() => saveQuestion()}
                    >
                        Add
                    </button>
                </div>
            </div>
        </>
    )

};

export default QuestionEditor;
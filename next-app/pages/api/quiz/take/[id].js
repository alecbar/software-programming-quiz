import { getQuizData } from '../../../../utils/quiz.js'

export default (req, res) => {
    
    const { id } = req.query

    const data = getQuizData(id)

    quizData= JSON.parse(data)
    
    console.log(quizData)

    res.status(200)
    res.end()
    
}
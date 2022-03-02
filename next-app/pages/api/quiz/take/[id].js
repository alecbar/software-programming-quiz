import { getQuizData } from '../../../../utils/quiz.js'

export default (req, res) => {
    
    const { id } = req.query

    const data = getQuizData(id)
    
    console.log(data)

    res.status(200)
    res.end()
    
}
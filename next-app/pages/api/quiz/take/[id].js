import { getQuizData } from '../../../../utils/quiz.js'

export default (req, res) => {
    
    const { id } = req.query

    const data = getQuizData(id)

    res.status(200).json({"data": data})    
}
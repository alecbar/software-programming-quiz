
import { getSession } from "next-auth/react"
import { Lambda, AWS } from "aws-sdk"

export default async (req, res) => {
  const session = await getSession({ req })

  // Check for sign in and matching user id
  if (session && session.user.id == req.body.userId) {

    console.log(req.body)

    const { quizName, quizQuestions, userId } = req.body

    const quiz = { name: quizName, questions: quizQuestions }
    const payload = { userId, quiz }

    // Lambda setup
    const client = new Lambda()

    const lambdaParams = {
      FunctionName: "create-quiz-lambda",
      InvocationType: "Event",
      Payload: JSON.stringify(payload)
    };

    // Invoke function 
    client.invoke(lambdaParams, (err, data) => {

      // Callback
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })


  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
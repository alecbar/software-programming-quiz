import { getSession } from "next-auth/react"
import { Lambda } from "aws-sdk"

export default async (req, res) => {
  const session = await getSession({ req })

  // Check for sign in and matching user id
  if (session && session.user.id == req.body.userId) {

    console.log(req.body)

    const { quizName, quizQuestions, userId } = req.body

    const quiz = { name: quizName, questions: quizQuestions }
    const payload = { userId, quiz }

    // Lambda setup
    const client = new Lambda({region: process.env.NEXT_AWS_REGION, accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY})

    const lambdaParams = {
      FunctionName: "create-quiz-lambda",
      InvocationType: "Event",
      Payload: JSON.stringify(payload)
    };

    // Invoke function 
    client.invoke(lambdaParams, (err, data) => {

      // Callback
      if (err) {
        console.log("Error")
        console.log(err)
      } else {
        console.log("Success")
        console.log(data)
      }
    })


  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
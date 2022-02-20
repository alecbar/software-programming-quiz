import { Lambda } from "aws-sdk"
const aws = require("aws-sdk")

export default async (req, res) => {

  // Receive request
  console.log(req.body)
  const { email, userId, quizId } = req.body

  // Lambda setup
  const client = new Lambda({ region: process.env.NEXT_AWS_REGION, accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY })

  const payload = {
    "email": email,
    "userId": userId,
    "quizId": quizId
  };

  const lambdaParams = {
    FunctionName: "quiz-invite-lambda",
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

  res.end()
}

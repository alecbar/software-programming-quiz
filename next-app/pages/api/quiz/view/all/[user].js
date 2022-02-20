import { Lambda } from "aws-sdk"

export default (req, res) => {

    const { user } = req.query

    // Lambda setup
    const client = new Lambda({region: process.env.NEXT_AWS_REGION, accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY})

    const lambdaParams = {
        FunctionName: "get-quizzes-lambda",
        InvocationType: "Event",
        Payload: JSON.stringify({userId: user})
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
  

    res.status(200).json({ user: user })
  }
  
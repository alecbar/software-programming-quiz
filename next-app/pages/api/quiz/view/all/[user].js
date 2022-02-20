import { Lambda } from "aws-sdk"

export default (req, res) => {

    const { user } = req.query

    // Lambda setup
    const client = new Lambda({region: process.env.NEXT_AWS_REGION, accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY})

    const lambdaParams = {
        FunctionName: "get-quizzes-lambda",
        InvocationType: "RequestResponse",
        Payload: JSON.stringify({userId: user})
      };
      
    let quizzes = []

      // Invoke function 
      client.invoke(lambdaParams, (err, data) => {
  
        // Callback
        if (err) {
          console.log(err)
        } else {
          const json = JSON.parse(data.Payload)
          quizzes = json.data

          res.json({quizzes})
          res.status(200)
          res.end()
        }
      })
  }
  
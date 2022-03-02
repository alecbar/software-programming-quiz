import { Lambda } from "aws-sdk"

const getQuizData = (id) => {

    const client = new Lambda({ region: process.env.NEXT_AWS_REGION, accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY })

    const lambdaParams = {
        FunctionName: "get-quiz-lambda",
        InvocationType: "RequestResponse",
        Payload: JSON.stringify({ quizId: id })
    };

    // Invoke function 
    client.invoke(lambdaParams, (err, data) => {

        // Callback
        if (err) {
            console.log(err)
        } else {
            const json = JSON.parse(data.Payload)
            
            console.log(json)

        }
    })


}

export { getQuizData }
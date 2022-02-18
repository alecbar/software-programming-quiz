
import { Lambda, AWS } from "aws-sdk"

export default (req, res) => {

  // Receive request
  console.log(req.body)
  const { canFirstName, canLastName, email, userId, quizId } = req.body

  // Lambda setup
  const client = new Lambda()

  const payload = {
    "canfirstName": canFirstName,
    "canlastName": canLastName,
    "email": email,
    "userId": userId,
    "quizId": quizId
  };

  const lambdaParams = {
    FunctionName: "invite-user-lambda",
    InvocationType: "Event",
    Payload: JSON.stringify(payload)
  };

  // Invoke function
  client.invoke(lambdaParams, (err, data)=>{

    // Callback
    if(err){
      console.log(err)
    }else{
      console.log(data)
    }
  })

  res.status(200).json({ name: 'John Doe' })
}

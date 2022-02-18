
import { Lambda, AWS } from "aws-sdk"

export default (req, res) => {

  // Receive request
  console.log("======")
  console.log(req.body)
  const { canFirstName, canLastName, email, userId, quizId } = req.body

  // Lambda setup
  // skip this for local testing
  const client = new Lambda()

  const payload = {
    "canfirstName": canFirstName,
    "canlastName": canLastName,
    "email": email,
    "userId": userId,
    "quizId": quizId
  };

// skip for local testing
  const lambdaParams = {
    FunctionName: "quiz-invite-lambda",
    InvocationType: "Event",
    Payload: JSON.stringify(payload)
  };


// instead of lambda - call your custom function
//sendQuizInvite(payload)
  // Invoke function - skip for local testing
  console.log("AAA")
  client.invoke(lambdaParams, (err, data)=>{

     // Callback
     console.log("CCC")
     if(err){
      console.log("EEE:" + err)
    }else{
      console.log("DDD: " + JSON.stringify(data))
   }
  })
  console.log("BBB")

  res.status(200).json({ name: 'John Doe' })
}

// use sequelize or some js mysql framwork to connect to the db and send a query then send a res.status(200).json(data) response

// res.status(200).json({
//    quizId: the id of the quiz that was just created
//})

// on the page site.com/quizzes/:uuid
// get the uuid from url params and query the db to get the quiz
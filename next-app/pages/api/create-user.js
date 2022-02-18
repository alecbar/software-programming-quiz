import { Lambda, AWS } from "aws-sdk"

export default (req, res) => {

  // Receive request
  console.log(req.body)
  const { firstName, lastName, email, company } = req.body

  // Lambda setup
  const client = new Lambda()

  const payload = {
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "organization": company
  };

  const lambdaParams = {
    FunctionName: "create-user-lambda",
    InvocationType: "Event",
    Payload: JSON.stringify(payload)
  };

  // Invoke function 
  client.invoke(lambdaParams, (err, data)=>{

    // Callback
    if(err){
      console.log(err)
    }else{
      console.log("CREATE:" + JSON.stringify(data))
    }
  })
  
  res.status(200).json({ name: 'John Doe' })
}

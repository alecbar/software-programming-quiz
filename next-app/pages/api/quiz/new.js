
import { getSession } from "next-auth/react"

export default async (req, res) => {
  const session = await getSession({ req })

  // Check for sign in and matching user id
  if (session && session.user.id == req.body.userId) {

    console.log(req.body)

    const { quizName, quizQuestions, userId } = req.body 


  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
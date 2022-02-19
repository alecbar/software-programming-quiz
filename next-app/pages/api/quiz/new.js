
export default (req, res) => {

    console.log(req.body)

    // Call lambda

    // Send success back 

    res.status(200).json({ status: 'success' })
  }
  
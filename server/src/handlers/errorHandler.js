export default function errorHandler (err, req, res, next) {
  console.error(`ID: ${req.requestId} , Error: ${err.name}`)
  if (err.name === 'Not Found') {
    return res.status(404).json({ msg: 'Not Found' })
  }
  next(err)
}
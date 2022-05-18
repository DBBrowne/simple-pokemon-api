export default function errorHandler(err, _req, res, next){
  console.log(err)
  if ( err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not Found' })
  }

  next(err)
}
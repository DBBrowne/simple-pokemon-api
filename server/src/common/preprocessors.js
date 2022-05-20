import Crypto from 'crypto'

export function appendId (req, _res, next){
  req.requestId = Crypto.randomUUID().slice(-12)
  
  next()
}

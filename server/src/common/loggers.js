import { debugMode, nodeEnv } from '../config/environment.js'

export function logDebug (...message){
  debugMode && console.info(...message)
}

export function logError(...message){
  if ('test' !== nodeEnv){
    console.error(message)
  }
}

function buildObjectLog(obj) {
  if (!obj) return 'None'
  if (!Object.keys(obj).length) return 'None'
  const values = []
  for (const key in obj) {
    values.push([key, obj[key]])
  }
  return (
    values.reduce((str, curr) => {
      const [key, value] = curr
      return str + `    ${key}: ${value} \n`
    }, '{ \n') + '}'
  )
}

export function reqLogger(req, _res, next) {
  logDebug('' + // align message content below
`--------------------------------
🔴 INCOMING REQUEST!
🔴 Request Method: ${req.method}
🔴 Request URl: ${req.url}
😺‍ Request Headers: ${buildObjectLog(req.headers)}
📦 Request Body: ${buildObjectLog(req.body)}
❓ Request Query: ${buildObjectLog(req.query)}
--------------------------------`
  )

  next()
}
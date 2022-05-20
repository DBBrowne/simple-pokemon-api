import cors from 'cors'
import express from 'express'
import Http from 'http'

import cache from './db/cache.js'
import { logDebug, reqLogger } from './common/loggers.js'
import { port } from './config/environment.js'
import router from './config/router.js'
import errorHandler from './handlers/errorHandler.js'
import { appendId } from './common/preprocessors.js'

export let server

const app = express.Router()
app.use(cors())
app.use('/',  appendId)
app.use('/', reqLogger)
app.use('/api', router)
app.use('/', errorHandler)

const expressServer = express()
expressServer.use('/', app)

async function startServer(){
  cache.init()

  server = Http.createServer(expressServer)
  server.listen(port, ()=>{
    logDebug('Up and running on', server.address())
  })
}

startServer().catch(console.error)
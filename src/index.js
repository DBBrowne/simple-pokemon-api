import Http from 'http'
import express from 'express'

import cache from './db/cache.js'
import logDev from './common/logDev.js'
import { port } from './config/environment.js'
import router from './config/router.js'

export let server

const app = express.Router()
app.use('/api', router)

const expressServer = express()
expressServer.use('/', app)

async function startServer(){
  cache.init()

  server = Http.createServer(expressServer)
  server.listen(port, ()=>{
    logDev('Up and running on', server.address())
  })
}

startServer().catch(console.error)
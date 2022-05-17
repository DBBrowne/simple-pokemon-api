import express from 'express'

const router = express.Router()

export default router

router.route('/')
  .get(function(req, res){
    return res.sendStatus(200)
  })
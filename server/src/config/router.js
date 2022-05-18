import express from 'express'

import pokemonController from '../controllers/pokemon.js'

const router = express.Router()

export default router

router.route('/')
  .get(function(req, res){
    return res.sendStatus(200)
  })

router.route('/pokemon/:idOrName')
  .get(pokemonController.show)
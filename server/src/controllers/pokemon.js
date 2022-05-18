import pokemon from '../handlers/pokemon.js'

async function pokemonShow(req, res, next){
  const { idOrName } = req.params
  pokemon.byName(
    idOrName
  ).then(data=>{
    return res.status(200).json(data)
  }
  ).catch(err=>{
    next(err)
  })
}

export default {
  show: pokemonShow,
}
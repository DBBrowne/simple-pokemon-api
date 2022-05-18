import pokemon from '../handlers/pokemon.js'

async function pokemonShow(req, res, next){
  const { idOrName } = req.params
  const pokeData = await pokemon.byName(
    idOrName
  ).catch(err=>{
    next(err)
  })
  return res.status(200).json(pokeData)
}

export default {
  show: pokemonShow,
}
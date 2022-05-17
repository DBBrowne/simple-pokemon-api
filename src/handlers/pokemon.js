import cache from '../db/cache.js'

async function getPokemonDataByName(name){
  const fromCache = cache.getByName(name)



  return fromCache
}

export default {
  byName: getPokemonDataByName,
}
import storedData from './data/pokemonEntrypoints.js'


let cache = {}
const cacheIndex = {}

function init(){
  cache = storedData
  cache.forEach((pokemon, index) => {
    pokemon.id = index + 1
    cacheIndex[pokemon.name] = index
  })
  // Persist cache data
  global.pokeCache = cache
  global.pokeCacheIndex = cacheIndex
}

function getByName(name){
  return global.cache[global.cacheIndex[name]]
}

export default {
  init,
  getByName,
}
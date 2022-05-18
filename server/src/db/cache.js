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
  const cacheLocation = global.pokeCacheIndex[name]
  return global.pokeCache[cacheLocation]
}
function update(pokemon){
  const cacheLocation = pokemon.id - 1
  global.pokeCache[cacheLocation] = pokemon
  global.pokeCacheIndex[pokemon.name] = cacheLocation
  return pokemon
}

export default {
  init,
  getByName,
  update,
}
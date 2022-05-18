import cache from '../db/cache.js'
import pokeApi from '../external/pokeApi.js'

class Pokemon {
  constructor(
    id = 0,
    name = '',
    description = '',
    isLegendary = false
  ){
    this.id = id
    this.name = name
    this.description = description
    this.isLegendary = isLegendary
  }
}

const blankPokemon = new Pokemon()
export function isCompletePokemon(pokemon){
  return Object.keys(blankPokemon).every( prop => {
    return typeof blankPokemon[prop] === typeof pokemon[prop]
  })
}

async function getPokemonDataByName(name){
  let targetPokemon = cache.getByName(name)

  if (isCompletePokemon(targetPokemon)){
    return targetPokemon
  }

  // TODO: get from Database here.

  targetPokemon = await pokeApi.getDetails(name)
  cache.update(targetPokemon)
  return targetPokemon
}

export default {
  byName: getPokemonDataByName,
}
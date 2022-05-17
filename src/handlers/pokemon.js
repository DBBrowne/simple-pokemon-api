import cache from '../db/cache.js'

class Pokemon {
  constructor(
    id = 0,
    name = '',
    url = '',
    description = '',
    isLegendary = false
  ){
    this.id = id
    this.name = name
    this.url = url
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
  const fromCache = cache.getByName(name)

  return fromCache
}

export default {
  byName: getPokemonDataByName,
}
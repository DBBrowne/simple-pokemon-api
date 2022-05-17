import cache from '../../src/db/cache.js'
import pokemonHandler from '../../src/handlers/pokemon.js'
import { isCompletePokemon } from '../../src/handlers/pokemon.js'

const venusaur = {
  'id': 3,
  'name': 'venusaur',
  'url': 'https://pokeapi.co/api/v2/pokemon/3/',
  'description': 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
  'isLegendary': false,
}
const venusaurCacheIndex = venusaur.id - 1

describe('pokemon Handler', ()=>{
  it('gets pokemon from cache if cache data is complete', async ()=>{
    cache.init()
    global.pokeCache[venusaurCacheIndex] = venusaur

    const venusaurFromCache = await pokemonHandler.byName(venusaur.name)

    expect(venusaurFromCache).toMatchObject(venusaur)
  })
})

describe('isCompletePokemon', ()=>{
  it('returns true if cached data is complete',()=>{
    expect(isCompletePokemon(venusaur)).toBe(true)
  })
  it('returns false if cached data is not complete',()=>{
    const incompletePokemon = { ...venusaur, isLegendary: null }
    expect(isCompletePokemon(incompletePokemon)).toBe(false)
  })
  it('returns false if cached data is not valid',()=>{
    const incompletePokemon = { ...venusaur, url: Number(1) }
    expect(isCompletePokemon(incompletePokemon)).toBe(false)
  })
})
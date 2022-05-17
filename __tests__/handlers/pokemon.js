import cache from '../../src/db/cache.js'
import { isCompletePokemon } from '../../src/handlers/pokemon.js'
import pokemonHandler from '../../src/handlers/pokemon.js'
import pokeApi from '../../src/external/pokeApi.js'

const venusaur = {
  'id': 3,
  'name': 'venusaur',
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
  it('fetches data from pokeApi if cached data is incomplete', async()=>{
    pokeApi.getDetails = jest.fn(()=>venusaur)

    global.pokeCache = []
    global.pokeCache[venusaurCacheIndex] = { id: venusaur.id, name: venusaur.name }

    const venusaurFromMock = await pokemonHandler.byName(venusaur.name)

    expect(venusaurFromMock).toMatchObject(venusaur)
    expect(pokeApi.getDetails).toBeCalledTimes(1)
    expect(pokeApi.getDetails).toBeCalledWith(venusaur.name)
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
    const incompletePokemon = { ...venusaur, name: Number(1) }
    expect(isCompletePokemon(incompletePokemon)).toBe(false)
  })
})
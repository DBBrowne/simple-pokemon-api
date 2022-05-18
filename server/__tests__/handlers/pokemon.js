import cache from '../../src/db/cache.js'
import { isCompletePokemon } from '../../src/handlers/pokemon.js'
import pokemonHandler from '../../src/handlers/pokemon.js'
import pokeApi from '../../src/external/pokeApi.js'

beforeAll(()=>{
  pokeApi.getDetails = jest.fn(async ()=>Promise.resolve(venusaurComplete))
})
beforeEach(()=>{
  jest.clearAllMocks()
})


const venusaurIncomplete = {
  'id': 3,
  'name': 'venusaur',
}
const venusaurComplete = {
  ...venusaurIncomplete,
  'description': 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
  'isLegendary': false,
}
const venusaurCacheIndex = venusaurComplete.id - 1

describe('pokemon Handler', ()=>{
  it('gets pokemon from cache if cache data is complete', async ()=>{
    cache.init()
    global.pokeCache[venusaurCacheIndex] = venusaurComplete

    const venusaurFromCache = await pokemonHandler.byName(venusaurComplete.name)

    expect(venusaurFromCache).toMatchObject(venusaurComplete)
  })
  it('fetches data from pokeApi if cached data is incomplete', async()=>{
    global.pokeCache = []
    global.pokeCache[venusaurCacheIndex] = venusaurIncomplete

    const venusaurFromMock = await pokemonHandler.byName(venusaurComplete.name)

    expect(venusaurFromMock).toMatchObject(venusaurComplete)
    expect(pokeApi.getDetails).toBeCalledTimes(1)
    expect(pokeApi.getDetails).toBeCalledWith(venusaurComplete.name)
  })
  it('updates cache with new data on fetch', async()=>{
    global.pokeCache = []
    global.pokeCache[venusaurCacheIndex] = venusaurIncomplete

    
    await pokemonHandler.byName(venusaurComplete.name)
    
    expect(global.pokeCache[venusaurCacheIndex]).toMatchObject(venusaurComplete)
    expect(pokeApi.getDetails).toBeCalledTimes(1)
    expect(pokeApi.getDetails).toBeCalledWith(venusaurComplete.name)
  })
})

describe('isCompletePokemon', ()=>{
  it('returns true if cached data is complete',()=>{
    expect(isCompletePokemon(venusaurComplete)).toBe(true)
  })
  it('returns false if cached data is not complete',()=>{
    const incompletePokemon = { ...venusaurComplete, isLegendary: null }
    expect(isCompletePokemon(incompletePokemon)).toBe(false)
  })
  it('returns false if cached data is not valid',()=>{
    const incompletePokemon = { ...venusaurComplete, name: Number(1) }
    expect(isCompletePokemon(incompletePokemon)).toBe(false)
  })
})
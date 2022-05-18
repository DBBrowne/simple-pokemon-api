import request from 'supertest'

import { isCompletePokemon } from '../../src/handlers/pokemon.js'
import pokeApi from '../../src/external/pokeApi'
import { server } from '../../src/index.js'

beforeAll(()=>{
  pokeApi.getDetails = jest.fn(()=>uncachedPokemon)
})
beforeEach(()=>{
  jest.clearAllMocks()
})

afterAll(async () => {
  await global.tearDown({ server })
})


const uncachedPokemon = { 
  'name': 'charizard',
  'description': 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally',
  'is_legendary': false,
}

const cachedPokemon = {
  'id': 3,
  'name': 'venusaur',
  'description': 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
  'isLegendary': false,
}

describe('Poke API', ()=>{
  it('gets pokemon from the external pokeAPI if cached data is incomplete', async ()=>{
    const cacheIndex = global.pokeCacheIndex[uncachedPokemon.name]
    global.pokeCache[cacheIndex] = {}
    expect(isCompletePokemon(global.pokeCache[cacheIndex])).toBe(false)
    
    const response = await request(server).get(`/api/pokemon/${uncachedPokemon.name}`)
    
    expect(pokeApi.getDetails).toBeCalledWith(uncachedPokemon.name)
    expect(pokeApi.getDetails).toBeCalledTimes(1)
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(uncachedPokemon)
  })
  it('gets pokemon from cache', async ()=>{
    const cacheIndex = global.pokeCacheIndex[cachedPokemon.name]
    global.pokeCache[cacheIndex] = cachedPokemon
    expect(isCompletePokemon(cachedPokemon)).toBe(true)
    expect(isCompletePokemon(global.pokeCache[cacheIndex])).toBe(true)
    
    const response = await request(server).get(`/api/pokemon/${cachedPokemon.name}`)
    
    expect(pokeApi.getDetails).toBeCalledTimes(0)
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(cachedPokemon)
  })
})

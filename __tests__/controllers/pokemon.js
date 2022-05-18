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

})

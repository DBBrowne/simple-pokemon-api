import request from 'supertest'

import pokeApi from '../../src/external/pokeApi'

import { server } from '../../src/index.js'

afterAll(async () => {
  await global.tearDown({ server })
})

const charizard = { 
  'name': 'charizard',
  'description': 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally',
  'is_legendary': false,
}

describe('Poke API', ()=>{
  it('gets Charizard from the external pokeAPI', async ()=>{
    pokeApi.getDetails = jest.fn(()=>charizard)
    
    const response = await request(server).get(`/api/pokemon/${charizard.name}`)
    
    expect(pokeApi.getDetails).toBeCalledWith(charizard.name)
    expect(pokeApi.getDetails).toBeCalledTimes(1)
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(charizard)
  })
})
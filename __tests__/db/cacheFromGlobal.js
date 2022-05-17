import { server } from '../../src/index.js'

afterAll(async () => {
  await global.tearDown({ server })
})

const firstPokemon = {
  'id': 1,
  'name': 'bulbasaur',
  'url': 'https://pokeapi.co/api/v2/pokemon/1/',
}

describe('globalCache', ()=>{
  it('attaches at server start', ()=>{
    expect(global.pokeCache[0]).toMatchObject(firstPokemon)
  })
})
import cache from '../../src/db/cache.js'
import { server } from '../../src/index.js'


afterAll(async () => {
  await global.tearDown({ server })
})

const firstPokemon = {
  'id': 1,
  'name': 'bulbasaur',
  'url': 'https://pokeapi.co/api/v2/pokemon/1/',
}
const charmander = {
  id: 4,
  name: 'charmander',
  url: 'https://pokeapi.co/api/v2/pokemon/4/',
}

describe('globalCache', ()=>{
  it('attaches at server start', ()=>{
    expect(global.pokeCache[0]).toMatchObject(firstPokemon)
  })
  it('gets from cache',()=>{
    const charmanderFromCache = cache.getByName(charmander.name)

    expect(charmanderFromCache).toMatchObject(charmander)
  })
})
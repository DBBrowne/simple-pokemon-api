import cache from '../../src/db/cache.js'
import pokemonHandler from '../../src/handlers/pokemon.js'

const venusaur = {
  'id': 3,
  'name': 'venusaur',
  'url': 'https://pokeapi.co/api/v2/pokemon/3/',
  'description': 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
  'isLegendary': false,
}

describe('pokemon Handler', ()=>{
  it('gets pokemon from cache if cache data is complete', async ()=>{
    cache.init()
    global.pokeCache[venusaur.id - 1] = venusaur

    const venusaurFromCache = await pokemonHandler.byName(venusaur.name)

    expect(venusaurFromCache).toMatchObject(venusaur)
  })
})


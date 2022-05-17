import cache from '../../src/db/cache.js'

function resetGlobalCache (){
  global.pokeCache = {}
  global.pokeCacheIndex = {}
}
afterEach(resetGlobalCache)

const firstPokemon = {
  'id': 1,
  'name': 'bulbasaur',
  'url': 'https://pokeapi.co/api/v2/pokemon/1/',
}

const ivysaur = {
  'id': 2,
  'name': 'ivysaur',
  'url': 'https://pokeapi.co/api/v2/pokemon/2/',
}

describe('Cache',()=>{
  it('initialises to global var', ()=>{
    cache.init()

    expect(
      global.pokeCache[0]
    ).toMatchObject(
      firstPokemon
    )
  })
  it('gets Pokemon by name', ()=>{
    cache.init()

    const ivysaurFromCache = cache.getByName(ivysaur.name)

    expect(ivysaurFromCache).toMatchObject(ivysaur)
  })
  it('returns undefined if name is not cached', ()=>{
    cache.init()
    global.pokeCache['john'] = {}
    delete global.pokeCacheIndex['john']

    const cacheMiss = cache.getByName('john')

    expect(cacheMiss).toBe(undefined)
  })
})
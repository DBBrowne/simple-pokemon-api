import cache from '../../src/db/cache.js'

function resetGlobalCache (){
  global.pokeCache = {}
  global.pokeCacheIndex = {}
}
afterEach(resetGlobalCache)

const firstPokemon = {
  'id': 1,
  'name': 'bulbasaur',
}

const ivysaur = {
  'id': 2,
  'name': 'ivysaur',
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
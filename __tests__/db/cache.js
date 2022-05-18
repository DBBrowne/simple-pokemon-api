import cache from '../../src/db/cache.js'

function resetGlobalCache (){
  global.pokeCache = {}
  global.pokeCacheIndex = {}
}
beforeEach(cache.init)
afterEach(resetGlobalCache)

const firstPokemon = {
  'id': 1,
  'name': 'bulbasaur',
}

const ivysaur = {
  'id': 2,
  'name': 'ivysaur',
}

const incompletePokemon = {
  id: 6, 
  'name': 'charizard',
}

const completePokemon = {
  ...incompletePokemon,
  'description': 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally',
  'is_legendary': false,
}

describe('Cache',()=>{
  it('initialises to global var', ()=>{
    expect(
      global.pokeCache[0]
    ).toMatchObject(
      firstPokemon
    )
  })
  it('gets Pokemon by name', ()=>{
    const ivysaurFromCache = cache.getByName(ivysaur.name)

    expect(ivysaurFromCache).toMatchObject(ivysaur)
  })
  it('returns undefined if name is not cached', ()=>{
    global.pokeCache['john'] = {}
    delete global.pokeCacheIndex['john']

    const cacheMiss = cache.getByName('john')

    expect(cacheMiss).toBe(undefined)
  })
  describe('cache.replace', ()=>{
    it('replaces cached data', ()=>{
      const cacheIndex = global.pokeCacheIndex[incompletePokemon.name]
      global.pokeCache[cacheIndex] = incompletePokemon

      cache.update(completePokemon)

      expect(global.pokeCache[cacheIndex]).toMatchObject(completePokemon)
    })
  })
})
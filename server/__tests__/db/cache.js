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
      const cacheLocation = global.pokeCacheIndex[incompletePokemon.name]
      global.pokeCache[cacheLocation] = incompletePokemon

      cache.update(completePokemon)

      expect(global.pokeCache[cacheLocation]).toMatchObject(completePokemon)
    })
    it('updates cache index', ()=>{
      const unlistedPokemon = { ...completePokemon, name: 'definitelyNotAPokemon', id: 2000 }
      expect(global.pokeCacheIndex[unlistedPokemon.name]).toBe(undefined)
      expect(global.pokeCache[unlistedPokemon.id - 1]).toBe(undefined)

      cache.update(unlistedPokemon)

      expect(global.pokeCacheIndex[unlistedPokemon.name]).toBe(unlistedPokemon.id - 1)
      expect(global.pokeCache[unlistedPokemon.id - 1]).toBe(unlistedPokemon)
    })
  })
})
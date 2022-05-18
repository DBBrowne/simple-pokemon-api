import axios from 'axios'

import { tidyNewLines } from '../../src/common/stringUtils.js'
import { NotFound } from '../common/errors.js'
import { logDebug, logError } from '../common/loggers.js'


const pokeApiBase = 'https://pokeapi.co/api/v2' 

async function getFullList(){
  return await axios.get(`${pokeApiBase}/pokemon?&limit=2000`).then(res=>{
    return res.data
  }).catch(err=>console.log(err))
}
async function getDetails(nameOrId){
  logDebug(`Getting Data from external API: ${nameOrId}`)

  return axios.get(`${pokeApiBase}/pokemon-species/${nameOrId}`).then(res=>{
    const data = res.data
    const pokemon = {}
    
    pokemon.id = data.id
    pokemon.name = data.name
    pokemon.isLegendary = data.is_legendary
    pokemon.description = tidyNewLines(
      data.flavor_text_entries[0].flavor_text
    )
    
    return pokemon
  }).catch(err=>{
    logError({ 
      msg: 'Error getting pokemon data',
      query: nameOrId,
      status: err.status,
      text: err.statusText,
    })
    throw new NotFound()
  })
}

export default {
  getFullList,
  getDetails,
}
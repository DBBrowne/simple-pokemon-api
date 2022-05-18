import axios from 'axios'
import { apiBaseUrl } from '../config.js'

const pokeBaseUrl = `${apiBaseUrl}/pokemon`
export function getPokemonData(name) {
  return axios.get(`${pokeBaseUrl}/${name}`)
}
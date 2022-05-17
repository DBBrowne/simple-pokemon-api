import axios from 'axios'

async function getFullPokemonList(){
  await axios.get('https://pokeapi.co/api/v2/pokemon?&limit=2000').then(res=>{
    return res.data
  }).catch(err=>console.log(err))
}

export {
  getFullPokemonList,
}
import React from 'react';
import PokeInfo from './containers/PokeInfo';
import { getPokemonData } from './lib/api';

const initPokeData = {
  id: 0,
  name: ' ',
  description: ''
}

export default function App() {
  let [pokeData, setPokeData] = React.useState(initPokeData)

  React.useEffect(()=>{
    function getPokeData (name){
      getPokemonData(name).then(res=>{
        setPokeData(res.data)
      })
    }
    getPokeData('charmander')
    }, [])

  return (
    <section>
      <PokeInfo {...pokeData}/>
    </section>
  );
}

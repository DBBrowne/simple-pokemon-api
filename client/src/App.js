import React from 'react';

import './App.css'

import { getPokemonData } from './lib/api';
import PokeInfo from './containers/PokeInfo/PokeInfo.js';
import SearchBar from './containers/SearchBar/SearchBar';

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
    <section className="main">
      <SearchBar />
      <PokeInfo {...pokeData}/>
    </section>
  );
}

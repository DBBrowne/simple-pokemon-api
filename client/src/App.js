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
  let [searchEntry, setSearchEntry] = React.useState('')

  const getPokeData = (name)=>{
    getPokemonData(name).then(res=>{
      setPokeData(res.data)
    })
  }
  React.useEffect(()=>{
    getPokeData('charmander')
  }, [])

  const handleSearchChange = (e) =>{
    setSearchEntry(e.target.value)
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault()

    getPokeData(searchEntry)
  }

  return (
    <section className="main">
      <SearchBar onSubmit={handleSearchSubmit} onChange={handleSearchChange}/>
      <PokeInfo {...pokeData}/>
    </section>
  );
}

import React from 'react';

import './App.css'

import { getPokemonData } from './lib/api';
import PokeInfo from './containers/PokeInfo/PokeInfo.js';
import SearchBar from './containers/SearchBar/SearchBar';
import RecentSearches from './containers/RecentSearches/RecentSearches';

const maxRecentLength = 4

const initPokeData = {
  id: 0,
  name: ' ',
  description: ''
}

export default function App() {
  let [pokeData, setPokeData] = React.useState(initPokeData)
  let [searchEntry, setSearchEntry] = React.useState('')
  let [isError, setIsError] = React.useState(false)
  let [recentSearchList, setRecentSearchList] = React.useState([])

  const addToRecent = (item) =>{
    let newRecents = recentSearchList
    if(recentSearchList.length >= maxRecentLength){
      newRecents.pop()
    }
    newRecents.unshift(item)
    setRecentSearchList(newRecents)
  }

  const getPokeData = (name)=>{
    getPokemonData(name).then(res=>{
      setPokeData(res.data)
      setIsError(false)
    }).catch(err=>{
      console.log(err)
      setIsError(true)
    })
  }
  
  const handleSearchChange = (e) =>{
    setSearchEntry(e.target.value)
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault()
      
    getPokeData(searchEntry.toLocaleLowerCase())
    addToRecent(searchEntry)
  }

  const recentsClickHandler= (e) => {
    getPokeData(e.target.innerText)
  }
  
  React.useEffect(()=>{
    getPokeData('charmander')
  }, [])
    
  return (
    <>
      <section className="main">
        <SearchBar onSubmit={handleSearchSubmit} onChange={handleSearchChange} />
        <PokeInfo pokeData={pokeData} isError={isError}/>
      </section>
      <RecentSearches recentSearchList = {recentSearchList} onClick={recentsClickHandler}/>
    </>
  );
}

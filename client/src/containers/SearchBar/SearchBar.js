import './SearchBar.css'

export default function SearchBar () {
  return (
    <form className="search">
      <label />
      <input 
        type="text"
        className="search-input"
        placeholder="What are you catching?"
        name='search-input'
        id='search-input'
      />
      <button type="submit">Search!</button>
    </form>
  )
}
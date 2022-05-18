import './SearchBar.css'

export default function SearchBar ({onSubmit, onChange}) {
  return (
    <form className="search" onSubmit={onSubmit}>
      <label />
      <input 
        type="text"
        className="search-input"
        placeholder="What are you catching?"
        name='search-input'
        id='search-input'
        onChange={onChange}
      />
      <button type="submit">Search!</button>
    </form>
  )
}
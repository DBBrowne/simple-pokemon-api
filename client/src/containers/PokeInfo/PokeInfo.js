import './PokeInfo.css'

export default function PokeInfo({pokeData, isError}){
  const pokeId = String(pokeData.id).padStart(4, '0')
  let pokeName = pokeData.name
  pokeName = pokeName[0].toUpperCase() + pokeName.slice(1).toLowerCase()
  return (
    <article
      className={
        'poke-info elevate' + 
        (pokeData.isLegendary ? ' legendary' : '')
      }
    >
      <small>
      {isError ? ('We couldn\'t find that one.  How about:') : ''}
      </small>
      {/* eslint-disable-next-line jsx-a11y/aria-role*/}
      <h3 role="header">
        <span>{pokeId}: {pokeName}</span>
        {pokeData.isLegendary && <span className='legendary-notification'>Legendary!</span>}
      </h3>
      <p>{pokeData.description}</p>
    </article>
  )
}
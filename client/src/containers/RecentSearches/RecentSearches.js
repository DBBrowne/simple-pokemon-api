import './RecentSearches.css'
import {ReactComponent as PokeBall} from './pokeball.svg'

const liStyle= {
  height: '0.7rem',
  'margin-right': '0.3rem'
}

export default function RecentSearches({recentSearchList, onClick}){
  return (
    <section className="recent">
        <h4>Recently Caught:</h4>
        <ul>
          {recentSearchList.map((searchPhrase, i)=>{
            return <li
              key={`${searchPhrase}${i}`}
              onClick = {onClick}
            >
              <PokeBall style={liStyle}/>
              {searchPhrase}
            </li>
          })}
        </ul>
    </section>
  )
}
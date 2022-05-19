import './RecentSearches.css'

export default function RecentSearches({recentSearchList, onClick}){
  return (
    <section className="recent">
      <aside>
        <p>Recent Searches:</p>
        <ul>
          {recentSearchList.map((searchPhrase, i)=>{
            return <li
              key={`${searchPhrase}${i}`}
              onClick = {onClick}
            >{searchPhrase}</li>
          })}
        </ul>
      </aside>
    </section>
  )
}
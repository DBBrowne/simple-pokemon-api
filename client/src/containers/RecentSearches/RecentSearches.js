import './RecentSearches.css'

export default function RecentSearches({recentSearchList}){
  return (
    <section className="recent">
      <aside>
        <p>Recent Searches:</p>
        <ul>
          {recentSearchList.map((searchPhrase, i)=>{
            return <p key={`${searchPhrase}${i}`}>{searchPhrase}</p>
          })}
        </ul>
      </aside>
    </section>
  )
}
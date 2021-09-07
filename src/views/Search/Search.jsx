import styles from './search.module.css'
import { Nav, Hero, Loader } from '../../components'

const Search = ({ searchResults, onQueryChange, onAddHeroToTeam }) => {
  return (
    <main className={`${styles.search} w-100 h-100 d-flex flex-column`}>
      <Nav search={false} />
      <input
        type='text'
        className={`${styles.input} form-control-lg m-2 m-lg-4 py-3 bg-light`}
        placeholder='Enter a name...'
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <div
        className={`${styles.grid} w-100 d-flex flex-wrap p-3 justify-content-center`}
      >
        {searchResults.length === 0 && <Loader />}
        {searchResults.length > 0 &&
          searchResults.map((hero) => (
            <Hero
              key={hero.id}
              id={hero.id}
              name={hero.name}
              img={hero.image.url}
              alignment={hero.biography.alignment}
              intelligence={hero.powerstats.intelligence}
              strength={hero.powerstats.strength}
              speed={hero.powerstats.speed}
              durability={hero.powerstats.durability}
              power={hero.powerstats.power}
              combat={hero.powerstats.combat}
              onAddHeroToTeam={onAddHeroToTeam}
              addOption={true}
            />
          ))}
      </div>
    </main>
  )
}

export default Search

import styles from './search.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import axios from 'axios'
import { Nav, Hero, Loader } from '../../components'

const Search = ({ onAddHeroToTeam }) => {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // Use the Redux store and the useDispatch hook
  const store = useStore()
  const dispatch = useDispatch()

  // Subscribe to changes in the store and set the component state of the query
  store.subscribe(() => {
    setQuery(store.getState().query)
  })

  async function getResults(query) {
    // Dispatch the Redux action
    dispatch({ type: 'UPDATE_QUERY', payload: query })

    // Initialize an empty array to store the results
    let updSearchResults = []

    // Fetch the results from the API using the query
    await axios
      .get(`https://superheroapi.com/api/4681260101897134/search/${query}`)
      .then((res) => {
        // Loop through the response from the API and push the objects to the updSearchResults array
        if (res.data.results) {
          res.data.results.forEach((result) => {
            const hero = {
              appearance: result.appearance,
              biography: result.biography,
              connections: result.connections,
              id: result.id,
              image: result.image,
              name: result.name,
              powerstats: result.powerstats,
              work: result.work,
            }

            updSearchResults.push(hero)
          })
        }
      })
      .catch((err) => console.log(err))

    // Set the search results to the updated results
    setSearchResults([...updSearchResults])
  }

  async function getAllResults() {
    // Initialize the variable
    let updSearchResults = []

    // Set 100 as an arbitrary limit to prevent high loading times and fetch the first 100 heroes retrieved from the API
    for (let i = 1; i <= 100; i++) {
      await axios
        .get(`https://superheroapi.com/api/4681260101897134/${i}`)
        .then((res) => {
          const hero = {
            appearance: res.data.appearance,
            biography: res.data.biography,
            connections: res.data.connections,
            id: res.data.id,
            image: res.data.image,
            name: res.data.name,
            powerstats: res.data.powerstats,
            work: res.data.work,
          }

          updSearchResults.push(hero)
        })
        .catch(() => console.log('No match.'))
    }

    // Set the search results to the updated results
    setSearchResults([...updSearchResults])
  }

  useEffect(() => {
    if (query) getResults(query)
    else getAllResults()
  }, [query]) // eslint-disable-line

  return (
    <main className={`${styles.search} w-100 h-100 d-flex flex-column`}>
      <Nav search={false} />
      <input
        type='text'
        className={`${styles.input} form-control-lg m-2 m-lg-4 py-3 bg-light`}
        placeholder='Enter a name...'
        onChange={(e) => getResults(e.currentTarget.value)}
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

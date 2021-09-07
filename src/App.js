import { useState, useEffect } from 'react'
import './styles/App.css'
import { Login, Home, Search, HeroDetails } from './views/index'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

function App() {
  const [userToken, setUserToken] = useState('')
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [heroes, setHeroes] = useState([])
  const [teamStats, setTeamStats] = useState({})

  const updateQuery = (value) => {
    setQuery(value)
  }

  async function getResults(query = '') {
    let updSearchResults = []
    await axios
      .get(`https://superheroapi.com/api/4681260101897134/search/${query}`)
      .then((res) => {
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

    setSearchResults([...updSearchResults])
  }

  async function getAllResults() {
    let updSearchResults = []
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
        .catch((err) => console.log('No match.'))
    }

    setSearchResults([...updSearchResults])
  }

  function handleUserToken() {
    const userToken = localStorage.getItem('userToken')
    if (userToken) setUserToken(userToken)
    else return
  }

  function addHeroToTeam(hero) {
    const team = localStorage.getItem('team')

    if (!team) {
      let updHeroes = JSON.stringify(hero)
      localStorage.setItem('team', updHeroes)
      setHeroes(JSON.parse('[' + updHeroes + ']'))
    } else if (team.split('}').length <= 6) {
      let updHeroes = [...heroes]
      updHeroes.push(hero)
      localStorage.setItem('team', JSON.stringify(updHeroes))
      setHeroes(JSON.parse(localStorage.getItem('team')))
    }
  }

  function removeHeroFromTeam(hero) {
    const team = JSON.parse(localStorage.getItem('team'))

    const updTeam = team.filter((teamHero) => teamHero.id !== hero.id)

    if (updTeam.length === 0) localStorage.removeItem('team')
    else {
      localStorage.setItem('team', JSON.stringify(updTeam))
    }
    setHeroes(updTeam)

    let { intelligence, strength, speed, durability, power, combat } = teamStats

    intelligence -= parseInt(hero.intelligence)
    strength -= parseInt(hero.strength)
    speed -= parseInt(hero.speed)
    durability -= parseInt(hero.durability)
    power -= parseInt(hero.power)
    combat -= parseInt(hero.combat)

    let updStats = { intelligence, strength, speed, durability, power, combat }

    console.log(updStats)

    setTeamStats(updStats)
  }

  function loadTeam() {
    const team = JSON.parse(localStorage.getItem('team'))
    setHeroes(team)

    if (team) {
      let intelligence = 0
      let strength = 0
      let speed = 0
      let durability = 0
      let power = 0
      let combat = 0

      let stats = {}

      team.forEach((hero) => {
        intelligence += parseInt(hero.intelligence)
        strength += parseInt(hero.strength)
        speed += parseInt(hero.speed)
        durability += parseInt(hero.durability)
        power += parseInt(hero.power)
        combat += parseInt(hero.combat)
      })

      stats = { intelligence, strength, speed, durability, power, combat }
      setTeamStats(stats)
    }
  }

  useEffect(() => {
    handleUserToken()
    loadTeam()
  }, [])

  useEffect(() => {
    if (query) getResults(query)
    else getAllResults()
  }, [query])

  return (
    <div className='App bg-light w-100 d-flex flex-column my-0 mx-auto'>
      {userToken ? (
        <Switch>
          <Route exact path='/'>
            <Home
              heroes={heroes}
              teamStats={teamStats}
              onRemoveHeroFromTeam={removeHeroFromTeam}
            />
          </Route>
          <Route exact path='/search'>
            <Search
              searchResults={searchResults}
              onQueryChange={updateQuery}
              onAddHeroToTeam={addHeroToTeam}
            />
          </Route>
          <Route exact path='/hero/:id'>
            <HeroDetails />
          </Route>
        </Switch>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App

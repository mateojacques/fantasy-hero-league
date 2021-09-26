import styles from './home.module.css'
import { useState, useEffect } from 'react'
import { useStore } from 'react-redux'
import { Nav, Hero, TeamStats } from '../../components'
import speedIcon from '../../assets/svg/speed.svg'
import strengthIcon from '../../assets/svg/strength.svg'
import intelligenceIcon from '../../assets/svg/intelligence.svg'
import durabilityIcon from '../../assets/svg/durability.svg'
import powerIcon from '../../assets/svg/power.svg'
import combatIcon from '../../assets/svg/combat.svg'

const Home = () => {
  // Component State
  const [heroes, setHeroes] = useState([])
  const [teamStats, setTeamStats] = useState({})
  const { intelligence, strength, speed, durability, power, combat } = teamStats

  // Use the Redux store and subscribe to changes to update the heroes state

  const store = useStore()

  store.subscribe(() => {
    setHeroes(store.getState().heroes)
  })

  // Load team initially when the component is mounted

  function loadTeam() {
    // Get the team from the localStorage and parse it from string to JSON
    const team = JSON.parse(localStorage.getItem('team'))

    if (team) {
      // Initialize the stats variables
      let intelligence = 0
      let strength = 0
      let speed = 0
      let durability = 0
      let power = 0
      let combat = 0

      let stats = {}

      // If the team is parsed as an array, loop through it and add every stat to get the total amount of the team
      if (Array.isArray(team)) {
        team.forEach((hero) => {
          intelligence += parseInt(hero.intelligence)
          strength += parseInt(hero.strength)
          speed += parseInt(hero.speed)
          durability += parseInt(hero.durability)
          power += parseInt(hero.power)
          combat += parseInt(hero.combat)
        })
      }

      // Else if the team is a single object, assign its values to the team stats value
      else {
        intelligence += parseInt(team.intelligence)
        strength += parseInt(team.strength)
        speed += parseInt(team.speed)
        durability += parseInt(team.durability)
        power += parseInt(team.power)
        combat += parseInt(team.combat)
      }

      // Assign the values to a 'stats' object and set it in the component state
      stats = { intelligence, strength, speed, durability, power, combat }
      setTeamStats(stats)
    }
  }

  function generateTeamBadge() {
    // Check the largest value of the stats and set it into a variable
    const stats = [intelligence, strength, speed, durability, power, combat]
    const maxStat = Math.max.apply(Math.max, stats)
    const statNames = [
      'intelligence',
      'strength',
      'speed',
      'durability',
      'power',
      'combat',
    ]
    const maxStatName = statNames[stats.indexOf(maxStat)]

    // Based on the value of maxStatName, display the corresponding badge for the team
    switch (maxStatName) {
      case 'intelligence':
        return (
          <div className={`d-flex align-items-center`}>
            <img src={intelligenceIcon} alt={intelligenceIcon} />
            <h3 className='m-0'>Intelligence</h3>
          </div>
        )
      case 'strength':
        return (
          <div className={`d-flex align-items-center`}>
            <img src={strengthIcon} alt={strengthIcon} />
            <h3 className='m-0'>Strength</h3>
          </div>
        )
      case 'speed':
        return (
          <div className={`d-flex align-items-center`}>
            <img src={speedIcon} alt={speedIcon} />
            <h3 className='m-0'>Speed</h3>
          </div>
        )
      case 'durability':
        return (
          <div className={`d-flex align-items-center`}>
            <img src={durabilityIcon} alt={durabilityIcon} />
            <h3 className='m-0'>Durability</h3>
          </div>
        )
      case 'power':
        return (
          <div className={`d-flex align-items-center`}>
            <img src={powerIcon} alt={powerIcon} />
            <h3 className='m-0'>Power</h3>
          </div>
        )
      case 'combat':
        return (
          <div className={`d-flex align-items-center`}>
            <img src={combatIcon} alt={combatIcon} />
            <h3 className='m-0'>Combat</h3>
          </div>
        )
      default:
        return
    }
  }

  useEffect(() => {
    // Load the team and set the component state to match the Redux store
    loadTeam()
    setHeroes(store.getState().heroes)
  }, []) //eslint-disable-line

  return (
    <main className={`${styles.home} w-100 h-100 d-flex flex-column`}>
      <Nav search={true} />
      <div
        className={`${styles.header} d-flex justify-content-between align-items-center pt-4 pt-lg-5 pb-2 px-2 mx-auto`}
      >
        <h2 className='m-0'>YOUR TEAM</h2>
        {generateTeamBadge()}
      </div>

      <TeamStats teamStats={teamStats} />

      <div
        className={`${styles.team} w-100 d-flex flex-wrap py-5 justify-content-center`}
      >
        {heroes.length === 0 ? (
          <h3>Add some heroes to start!</h3>
        ) : (
          heroes.map((hero) => (
            <Hero
              key={hero.id}
              id={hero.id}
              name={hero.name}
              img={hero.img}
              alignment={hero.alignment}
              intelligence={hero.intelligence}
              strength={hero.strength}
              speed={hero.speed}
              durability={hero.durability}
              power={hero.power}
              combat={hero.combat}
              addOption={false}
              heroes={heroes}
              teamStats={teamStats}
              setTeamStats={setTeamStats}
            />
          ))
        )}
      </div>
    </main>
  )
}

export default Home

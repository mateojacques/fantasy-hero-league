import { useDispatch, useStore } from 'react-redux'
import styles from './hero.module.css'
import speedIcon from '../../assets/svg/speed.svg'
import strengthIcon from '../../assets/svg/strength.svg'
import intelligenceIcon from '../../assets/svg/intelligence.svg'
import durabilityIcon from '../../assets/svg/durability.svg'
import powerIcon from '../../assets/svg/power.svg'
import combatIcon from '../../assets/svg/combat.svg'
import defaultImg from '../../assets/defaultImg.png'

const Hero = ({
  id,
  name,
  img,
  alignment,
  intelligence,
  strength,
  speed,
  durability,
  power,
  combat,
  addOption,
  teamStats,
  setTeamStats,
}) => {
  // Create the 'hero' object to pass it to functions later
  const hero = {
    id,
    name,
    img,
    alignment,
    intelligence,
    strength,
    speed,
    durability,
    power,
    combat,
  }

  // Use the Redux store and assign the useDispatch hook to a variable
  const store = useStore()
  const dispatch = useDispatch()

  function handleImageError(e) {
    // If there is not image available for the 'hero' component, set a default one
    const img = e.target
    img.src = defaultImg
  }

  function addHeroToTeam(hero) {
    // Dispatch the Redux action
    dispatch({ type: 'ADD_HERO_TO_TEAM', payload: hero })

    // Get the team from the local storage
    const team = localStorage.getItem('team')

    // If there is no team in the local storage, create it
    if (!team) {
      let updHeroes = JSON.stringify(hero)
      localStorage.setItem('team', updHeroes)
    }
    // Else, add a new hero to the team until the team reaches a length of 6
    else if (team.split('}').length <= 6) {
      const heroes = store.getState().heroes
      let updHeroes = [...heroes]
      localStorage.setItem('team', JSON.stringify(updHeroes))
    }
  }

  function removeHeroFromTeam(hero) {
    // Dispatch the Redux action
    dispatch({ type: 'REMOVE_HERO_FROM_TEAM', payload: hero })

    // Get the team from the local storage and create a updatedTeam variable
    const team = JSON.parse(localStorage.getItem('team'))
    let updTeam

    // If the team is parsed into an array, filter through it and remove the hero from the team
    if (Array.isArray(team))
      updTeam = team.filter((teamHero) => teamHero.id !== hero.id)
    // Else the team is empty because the last member is being removed
    else updTeam = []

    // If the team is empty, remove the localStorage item
    if (updTeam.length === 0) localStorage.removeItem('team')
    // Else, set it as a string
    else {
      localStorage.setItem('team', JSON.stringify(updTeam))
    }

    // Recalculate the stats for the entire team and set them to the component state

    let { intelligence, strength, speed, durability, power, combat } = teamStats

    intelligence -= parseInt(hero.intelligence)
    strength -= parseInt(hero.strength)
    speed -= parseInt(hero.speed)
    durability -= parseInt(hero.durability)
    power -= parseInt(hero.power)
    combat -= parseInt(hero.combat)

    let updStats = { intelligence, strength, speed, durability, power, combat }

    setTeamStats(updStats)
  }

  return (
    <article
      key={id}
      className={`${styles.hero} d-flex flex-column col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3`}
    >
      <h3 className={`${styles.name} w-100 my-0 mx-auto text-center`}>
        {name}
      </h3>
      <img src={img} alt={name} onError={(e) => handleImageError(e)} />
      {alignment === 'good' ? (
        <div className='w-100 bg-success p-2 d-flex justify-content-center align-items-center'>
          <h4 className='h5 m-0 text-light'>{alignment}</h4>
        </div>
      ) : (
        <div className='w-100 bg-danger p-2 d-flex justify-content-center align-items-center'>
          <h4 className='h5 m-0 text-light'>{alignment}</h4>
        </div>
      )}

      <div
        className={`${styles.stats} w-100 justify-content-center align-items-center py-3`}
      >
        <div className='d-flex w-100 justify-content-center align-items-center'>
          <img src={intelligenceIcon} alt={intelligence} />
          <p className='m-0'>{intelligence}</p>
        </div>
        <div className='d-flex w-100 justify-content-center align-items-center'>
          <img src={strengthIcon} alt={strength} />
          <p className='m-0'>{strength}</p>
        </div>
        <div className='d-flex w-100 justify-content-center align-items-center'>
          <img src={speedIcon} alt={speed} />
          <p className='m-0'>{speed}</p>
        </div>
        <div className='d-flex w-100 justify-content-center align-items-center'>
          <img src={durabilityIcon} alt={durability} />
          <p className='m-0'>{durability}</p>
        </div>
        <div className='d-flex w-100 justify-content-center align-items-center'>
          <img src={powerIcon} alt={power} />
          <p className='m-0'>{power}</p>
        </div>
        <div className='d-flex w-100 justify-content-center align-items-center'>
          <img src={combatIcon} alt={combat} />
          <p className='m-0'>{combat}</p>
        </div>
      </div>
      <div
        className={`${styles.buttons} w-100 d-flex justify-content-between align-items-center mt-2`}
      >
        {addOption && (
          <button
            className={`btn btn-success w-50`}
            onClick={() => addHeroToTeam(hero)}
          >
            ADD
          </button>
        )}
        {!addOption && (
          <button
            className={`btn btn-danger w-50`}
            onClick={() => removeHeroFromTeam(hero)}
          >
            REMOVE
          </button>
        )}
        <a href={`/hero/${id}`} className={`btn btn-primary w-50 ms-auto`}>
          DETAILS
        </a>
      </div>
    </article>
  )
}

export default Hero

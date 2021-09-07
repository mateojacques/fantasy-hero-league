import styles from './home.module.css'
import { Nav, Hero, TeamStats } from '../../components'
import speedIcon from '../../assets/svg/speed.svg'
import strengthIcon from '../../assets/svg/strength.svg'
import intelligenceIcon from '../../assets/svg/intelligence.svg'
import durabilityIcon from '../../assets/svg/durability.svg'
import powerIcon from '../../assets/svg/power.svg'
import combatIcon from '../../assets/svg/combat.svg'

const Home = ({ heroes, teamStats, onRemoveHeroFromTeam }) => {
  const { intelligence, strength, speed, durability, power, combat } = teamStats

  function generateTeamBadge() {
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
        {!heroes && <h3>Add some heroes to start!</h3>}

        {heroes &&
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
              onRemoveHeroFromTeam={onRemoveHeroFromTeam}
            />
          ))}
      </div>
    </main>
  )
}

export default Home

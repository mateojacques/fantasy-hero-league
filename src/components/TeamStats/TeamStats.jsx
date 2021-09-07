import { useState, useEffect } from 'react'
import styles from './teamStats.module.css'
import speedIcon from '../../assets/svg/speed.svg'
import strengthIcon from '../../assets/svg/strength.svg'
import intelligenceIcon from '../../assets/svg/intelligence.svg'
import durabilityIcon from '../../assets/svg/durability.svg'
import powerIcon from '../../assets/svg/power.svg'
import combatIcon from '../../assets/svg/combat.svg'

const TeamStats = ({ teamStats }) => {
  const { intelligence, strength, speed, durability, power, combat } = teamStats

  const [teamIntelligence, setTeamIntelligence] = useState(0)
  const [teamStrength, setTeamStrength] = useState(0)
  const [teamSpeed, setTeamSpeed] = useState(0)
  const [teamDurability, setTeamDurability] = useState(0)
  const [teamPower, setTeamPower] = useState(0)
  const [teamCombat, setTeamCombat] = useState(0)

  useEffect(() => {
    setTeamIntelligence(intelligence)
    setTeamStrength(strength)
    setTeamSpeed(speed)
    setTeamDurability(durability)
    setTeamPower(power)
    setTeamCombat(combat)
  }, [teamStats]) //eslint-disable-line

  return (
    <div
      className={`${styles.teamStats} w-100 d-flex flex-wrap justify-content-center bg-dark mt-4 py-5 px-4`}
    >
      <div className={`col-3 d-flex align-items-center justify-content-center`}>
        <img
          className={`w-100`}
          src={intelligenceIcon}
          alt={intelligenceIcon}
        />
        <p className='m-0 text-light h5'>{teamIntelligence}</p>
      </div>
      <div className={`col-3 d-flex align-items-center justify-content-center`}>
        <img className={`w-100`} src={strengthIcon} alt={strengthIcon} />
        <p className='m-0 text-light h5'>{teamStrength}</p>
      </div>
      <div className={`col-3 d-flex align-items-center justify-content-center`}>
        <img className={`w-100`} src={speedIcon} alt={speedIcon} />
        <p className='m-0 text-light h5'>{teamSpeed}</p>
      </div>
      <div className={`col-3 d-flex align-items-center justify-content-center`}>
        <img className={`w-100`} src={durabilityIcon} alt={durabilityIcon} />
        <p className='m-0 text-light h5'>{teamDurability}</p>
      </div>
      <div className={`col-3 d-flex align-items-center justify-content-center`}>
        <img className={`w-100`} src={powerIcon} alt={powerIcon} />
        <p className='m-0 text-light h5'>{teamPower}</p>
      </div>
      <div className={`col-3 d-flex align-items-center justify-content-center`}>
        <img className={`w-100`} src={combatIcon} alt={combatIcon} />
        <p className='m-0 text-light h5'>{teamCombat}</p>
      </div>
    </div>
  )
}

export default TeamStats

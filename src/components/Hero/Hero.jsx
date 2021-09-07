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
  onAddHeroToTeam,
  onRemoveHeroFromTeam,
  addOption,
}) => {
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

  function handleImageError(e) {
    const img = e.target
    img.src = defaultImg
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
            onClick={() => onAddHeroToTeam(hero)}
          >
            ADD
          </button>
        )}
        {!addOption && (
          <button
            className={`btn btn-danger w-50`}
            onClick={() => onRemoveHeroFromTeam(hero)}
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

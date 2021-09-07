import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Nav } from '../../components'
import styles from './heroDetails.module.css'

const HeroDetails = () => {
  const { id } = useParams()
  const [heroDetails, setHeroDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchHero() {
      await axios
        .get(`https://superheroapi.com/api/4681260101897134/${id}`)
        .then((res) => setHeroDetails(res.data))
        .catch((err) => console.log(err))

      setIsLoading(false)
    }

    fetchHero()
  }, []) //eslint-disable-line

  return (
    <section className={`${styles.heroDetails} w-100 d-flex flex-column`}>
      <Nav />
      {isLoading ? (
        <h4 className='m-5'>Loading...</h4>
      ) : (
        <>
          <div className={` ${styles.header} w-100 text-light p-5`}>
            <h1>{heroDetails.name}</h1>
          </div>
          <div className={`w-100 h-100 d-flex p-3 bg-dark flex-wrap`}>
            <img src={heroDetails.image.url} alt={heroDetails.id} />
            <div
              className={`pt-4 pt-lg-0 px-lg-5 d-flex flex-column gap-5 my-auto`}
            >
              <p className='text-light h5'>
                <span>Weight:</span> {heroDetails.appearance.weight[1]}
              </p>
              <p className='text-light h5'>
                <span>Height:</span> {heroDetails.appearance.height[1]}
              </p>
              <p className='text-light h5'>
                <span>Alias:</span> {heroDetails.biography.aliases[0]}
              </p>
              <p className='text-light h5'>
                <span>Eye color:</span> {heroDetails.appearance['eye-color']}
              </p>
              <p className='text-light h5'>
                <span>Hair color:</span> {heroDetails.appearance['hair-color']}
              </p>
              <p className='text-light h5'>
                <span>Workplace:</span> {heroDetails.work.base}
              </p>
            </div>
          </div>{' '}
        </>
      )}
    </section>
  )
}

export default HeroDetails

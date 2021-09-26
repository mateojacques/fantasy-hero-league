import { useState, useEffect } from 'react'
import styles from './nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ search }) => {
  const [windowWidth, setWindowWidth] = useState(0)
  function widthUpdate() {
    setWindowWidth(window.innerWidth)
  }

  // Handle resizing with an event listener
  useEffect(() => {
    window.addEventListener('resize', widthUpdate)

    return () => window.removeEventListener('resize', widthUpdate)
  }, [])

  return (
    <nav
      className={`${styles.nav} w-100 d-flex justify-content-between align-items-center bg-dark py-3 px-4 px-lg-5`}
    >
      <a className='text-light' href='/'>
        <h1 className='m-0'>
          F<span>H</span>L
        </h1>
      </a>
      {windowWidth < 768 && search && (
        <a href='/search'>
          <FontAwesomeIcon icon={faSearch} className='text-light' size='lg' />
        </a>
      )}
      {windowWidth >= 768 && search && (
        <div className='d-flex align-items-center'>
          <FontAwesomeIcon icon={faSearch} className='text-light' size='lg' />
          <a href='/search'>
            <input
              className='form-control'
              type='search'
              placeholder='Enter a name...'
            />
          </a>
        </div>
      )}
    </nav>
  )
}

export default Nav

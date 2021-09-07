import styles from './loader.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loader = () => {
  return (
    <div
      className={`${styles.spinner} w-100 h-100 d-flex justify-content-center align-items-center`}
    >
      <FontAwesomeIcon icon={faSpinner} spin className={`h1`} />
    </div>
  )
}

export default Loader

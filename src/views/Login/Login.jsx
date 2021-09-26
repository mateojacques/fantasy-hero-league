import { useState, useEffect } from 'react'
import styles from './login.module.css'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userToken, setUserToken] = useState('')

  function handleUserLogin(e, email, password) {
    e.preventDefault()

    // Create the user object
    const user = { email, password }

    // Clear the input values
    setEmail('')
    setPassword('')

    // Make the post request to the Alkemy API and set the user token
    // Then, refresh the page to access the app
    axios
      .post('http://challenge-react.alkemy.org', user)
      .then((res) => {
        setUserToken(res.data.token)
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // If there is a userToken, set it to the localStorage
    if (userToken) {
      localStorage.setItem('userToken', userToken)
    }
  }, [userToken])

  return (
    <section className={`w-100 d-flex bg-dark ${styles.login}`}>
      <div
        className={`h-100 col-12 col-md-6 d-flex flex-column align-items-center justify-content-center py-5 bg-light ${styles.form}`}
      >
        <h1 className='mb-5'>LOGIN</h1>
        <form
          onSubmit={(e) => handleUserLogin(e, email, password)}
          className={`d-flex flex-column align-items-center `}
        >
          <div className='d-flex flex-column'>
            <label htmlFor='email' className='h5 mb-3'>
              E-mail
            </label>
            <input
              type='email'
              name='email'
              placeholder='challenge@alkemy.org'
              className='form-control-lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='d-flex flex-column mb-4'>
            <label htmlFor='password' className='h5 mb-3'>
              Password
            </label>
            <input
              type='password'
              name='password'
              placeholder='react'
              className='form-control-lg'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type='submit'
            value='SIGN IN'
            className={`btn btn-lg ${styles.submit}`}
          />
        </form>
      </div>
      <div
        className={`h-100 col-12 col-md-6 d-flex justify-content-center align-items-center ${styles.graphics}`}
      >
        <h1 className='text-light'>
          FANTASY <br /> <span>HERO</span> <br />
          LEAGUE
        </h1>
      </div>
    </section>
  )
}

export default Login

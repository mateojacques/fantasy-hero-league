import './styles/App.css'
import { useState, useEffect } from 'react'
import { Login, Home, Search, HeroDetails } from './views/index'
import { Switch, Route } from 'react-router-dom'

function App() {
  const [userToken, setUserToken] = useState('')

  function handleUserToken() {
    // Get userToken from the local storage
    const userToken = localStorage.getItem('userToken')

    // If the token exists, setUserToken
    if (userToken) setUserToken(userToken)
    else return
  }

  useEffect(() => {
    handleUserToken()
  }, [])

  return (
    <div className='App bg-light w-100 d-flex flex-column my-0 mx-auto'>
      {/* If userToken exists show the app, else show the Login component */}
      {userToken ? (
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/search'>
            <Search />
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

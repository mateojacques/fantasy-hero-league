// Get the team (as a string) from the localStorage
const teamInLocalStorage = localStorage.getItem('team')

// Set a defaultState
const defaultState = {
  query: '',
  heroes: [],
}

// Initialize the initialState variable
let initialState

if (teamInLocalStorage) {
  // If the team is not empty, check the objects length on the parsing of the team
  // If the parsing returns a string containing only one object, set the initial 'heroes' state as an array containing the object
  if (teamInLocalStorage.split('}').length === 2) {
    initialState = {
      query: '',
      heroes: [JSON.parse(teamInLocalStorage)],
    }
  }
  // Else if the parsing returns an array, set it as the initial state for 'heroes'
  else {
    initialState = {
      query: '',
      heroes: JSON.parse(teamInLocalStorage),
    }
  }
}
// Else if the team is empty, set the initialState to be the defaultState (empty)
else {
  initialState = defaultState
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_QUERY':
      // Return a copy of the state with the query updated
      return { ...state, query: action.payload }
    case 'ADD_HERO_TO_TEAM':
      // Only execute the action if the team length is less than 6
      if (state.heroes.length < 6) {
        // If the team is not empty, get the previous state and use it to set the new 'heroes' state
        if (state.heroes.length !== 0) {
          const previousHeroesState = state.heroes
          return { ...state, heroes: [...previousHeroesState, action.payload] }
        }
        // Else, return a copy of the state with the 'heroes' state updated as an array containing the new hero
        else return { ...state, heroes: [action.payload] }
      } else return state
    case 'REMOVE_HERO_FROM_TEAM':
      // Filter through the current state of 'heroes' and remove the hero that matches the id on the state
      let updatedTeam = state.heroes.filter(
        (hero) => hero.id !== action.payload.id
      )
      // If updated team is not empty, return a copy of the state with the 'heroes' state updated
      if (updatedTeam) return { ...state, heroes: updatedTeam }
      // Else return the defaultState
      else return defaultState

    default:
      return state
  }
}

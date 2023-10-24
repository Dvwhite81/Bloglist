import loginService from '../services/login'
import blogService from '../services/blogs'
import { changeNotification } from './notificationReducer'

let initialUser = null
const userJSON = window.localStorage.getItem('loggedBlogAppUser')
if (userJSON) {
  initialUser = JSON.parse(userJSON)
  blogService.setToken(initialUser.token)
}

const loginReducer = (state = initialUser, action) => {
  switch (action.type) {
  case 'INITIALIZE_USER':
  case 'SET_USER':
    return action.payload
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const userLogin = (creds) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(creds)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch({
        type: 'SET_USER',
        payload: user
      })
      blogService.setToken(user.token)

      const message = `Logged in ${user.username}!`
      const messageType = 'success'
      dispatch(changeNotification(message, messageType))
    } catch (exception) {
      const message = 'Wrong credentials'
      const messageType = 'error'
      dispatch(changeNotification(message, messageType))
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'CLEAR_USER'
    })
    blogService.setToken(null)
    const message = 'Logged out'
    const messageType = 'success'
    dispatch(changeNotification(message, messageType))
  }
}

export const setCurrentUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'INITIALIZE_USER',
      payload: user
    })
    blogService.setToken(user.token)
  }
}

export default loginReducer

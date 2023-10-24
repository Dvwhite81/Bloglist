import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import allUsersReducer from './reducers/allUsersReducer'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    loggedInUser: loginReducer,
    allUsers: allUsersReducer
  }
})

export default store

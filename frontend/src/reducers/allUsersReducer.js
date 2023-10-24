import { createSlice } from '@reduxjs/toolkit'
import allUsersService from '../services/allUsers'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    }
  }
})

export const getInitialUsers = () => {
  return async (dispatch) => {
    const allUsers = await allUsersService.getAll()
    dispatch(setAllUsers(allUsers))
  }
}

export const { setAllUsers } = allUsersSlice.actions
export default allUsersSlice.reducer

import allUsersService from '../services/allUsers'

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
  case 'ALL_USERS':
    return action.payload
  default:
    return state
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    const allUsers = await allUsersService.getAll()
    dispatch({
      type: 'ALL_USERS',
      payload: allUsers
    })
    return allUsers
  }
}

export default allUsersReducer

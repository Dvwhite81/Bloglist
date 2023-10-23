import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  messageType: ''
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      const message = action.payload.message
      const messageType = action.payload.messageType
      return {
        message,
        messageType
      }
    }
  }
})

export const changeNotification = (message, messageType) => {
  return (dispatch) => {
    dispatch(setNotification({ message, messageType }))

    setTimeout(() => {
      dispatch(setNotification(initialState))
    }, 5000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer

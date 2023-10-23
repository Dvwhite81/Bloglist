import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)
  const message = notifications.message
  const type = notifications.messageType
  if (message === null) {
    return null
  }
  return (
    <div id="myModal">
      <div className={type}>{message}</div>
    </div>
  )
}

export default Notification

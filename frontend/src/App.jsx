import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AllBlogs from './components/AllBlogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import { changeNotification } from './reducers/notificationReducer'
import { initialBlogs } from './reducers/blogReducer'
import { setCurrentUser, userLogout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [containerDisplay, setContainerDisplay] = useState('one-column')

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setCurrentUser(user))
    }
  }, [dispatch])

  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const blogFormRef = useRef()

  return (
    <div className="main-container">
      <h2>Blog App</h2>
      <Notification />
      {user === null ? (
        <div className="logged-out-container">
          <LoginForm />
        </div>
      ) : (
        <div className={`logged-in-container ${containerDisplay}`}>
          <div className="user-logged-in">
            {user.username} logged in
            <button onClick={handleLogout}>Log Out</button>
          </div>
          <Toggleable
            type={'display'}
            divClass={'blog-form-container'}
            containerDisplay={containerDisplay}
            setContainerDisplay={setContainerDisplay}
            buttonClass={'toggle-display-button'}
            buttonLabel="New Blog"
            buttonId="new-blog-btn"
            ref={blogFormRef}
          >
            <BlogForm user={user} innerRef={blogFormRef} />
          </Toggleable>
          <div className="blogs-container">
            <AllBlogs user={user} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

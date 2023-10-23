import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import AllBlogs from './components/AllBlogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { changeNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [containerDisplay, setContainerDisplay] = useState('one-column')

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setContainerDisplay('one-column')
      const message = `Logged in ${username}!`
      const messageType = 'success'
      dispatch(changeNotification(message, messageType))
    } catch (exception) {
      const message = 'Wrong credentials'
      const messageType = 'error'
      dispatch(changeNotification(message, messageType))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')
    const message = `Logged out ${user.username}`
    const messageType = 'success'
    dispatch(changeNotification(message, messageType))
    setUser(null)
  }

  const blogFormRef = useRef()

  const addBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blog)
      newBlog.user = user
      setBlogs(blogs.concat(newBlog))
      const message = `Added your blog: ${blog.title}!`
      const messageType = 'success'
      dispatch(changeNotification(message, messageType))
    } catch (exception) {
      const message = 'There was a problem adding your blog. Try logging out and back in'
      const messageType = 'error'
      dispatch(changeNotification(message, messageType))
    }
  }

  return (
    <div className="main-container">
      <h2>Blog App</h2>
      <Notification />
      {user === null ? (
        <div className="logged-out-container">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
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
            <BlogForm addBlog={addBlog} />
          </Toggleable>
          <div className="blogs-container">
            <AllBlogs blogs={blogs} user={user} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

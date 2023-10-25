import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AllBlogs from './components/AllBlogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import AllUsersView from './components/AllUsersView'
import UserView from './components/UserView'
import Menu from './components/Menu'
import { initialBlogs } from './reducers/blogReducer'
import { setCurrentUser, userLogout } from './reducers/loginReducer'
import SingleBlogView from './components/SingleBlogView'
import { getAllUsers } from './reducers/allUsersReducer'

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

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const loggedInUser = useSelector((state) => state.loggedInUser)

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const blogFormRef = useRef()

  return (
    <div className='main-container'>
      <Router>
        <Menu />
        <h2>Blog App</h2>
        <Notification />
        {loggedInUser === null ? (
          <div className='logged-out-container'>
            <LoginForm />
          </div>
        ) : (
          <div className='logged-in-container'>
            <div className='user-logged-in'>
              {loggedInUser.username} logged in
              <button onClick={handleLogout}>Log Out</button>
            </div>
            <div className={`routes-container ${containerDisplay}`}>
              <Routes>
                <Route path='/' element={
                  <><Toggleable
                    type={'display'}
                    divClass={'blog-form-container'}
                    containerDisplay={containerDisplay}
                    setContainerDisplay={setContainerDisplay}
                    buttonClass={'toggle-display-button'}
                    buttonLabel='New Blog'
                    buttonId='new-blog-btn'
                    ref={blogFormRef}
                  >
                    <BlogForm user={loggedInUser} innerRef={blogFormRef} />
                  </Toggleable><AllBlogs user={loggedInUser} /></>
                }
                />
                <Route path='/blogs/:id' element={<SingleBlogView />} />
                <Route path='/users' element={<AllUsersView />} />
                <Route path='/users/:id' element={<UserView />} />
              </Routes>
            </div>
          </div>
        )}
      </Router>
    </div>
  )
}

export default App

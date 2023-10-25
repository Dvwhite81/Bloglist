import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserView = () => {
  const id = useParams()
  const allUsers = useSelector(state => state.allUsers)
  const user = allUsers.find(u => u.id === id.id)
  const blogs = user.blogs

  return (
    <div className='single-view'>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {blogs.map(blog =>
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <li key={blog.id}>{blog.title}</li>
          </Link>
        )}
      </ul>
    </div>
  )
}

export default UserView

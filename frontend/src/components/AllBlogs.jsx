import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const AllBlogs = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const [blogsToShow, setBlogsToShow] = useState([])

  const sortBlogs = async () => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    setBlogsToShow(sorted)
  }

  useEffect(() => {
    const sortBlogs = () => {
      const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
      setBlogsToShow(sorted)
    }
    sortBlogs()
  }, [blogs])

  return (
    <div className="blogs-container">
      {blogsToShow.map((blog) => (
        <Blog key={blog.id} id={blog.id} blog={blog} user={user} blogs={blogsToShow} sortBlogs={sortBlogs} />
      ))}
    </div>
  )
}

export default AllBlogs

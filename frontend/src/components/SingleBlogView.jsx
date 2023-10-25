import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { changeNotification } from '../reducers/notificationReducer'
import { likeBlog, commentBlog, deleteBlog } from '../reducers/blogReducer'

const SingleBlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams()
  const blog = blogs.find(b => b.id === id.id)
  const user = useSelector(state => state.loggedInUser)

  const like = async () => {
    dispatch(likeBlog(blog))
    const message = `Liked blog: ${blog.title}`
    const messageType = 'success'
    dispatch(changeNotification(message, messageType))
  }

  const [inputVal, setInputVal ] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    const newComment = event.target.comment.value
    event.target.comment.value = ''
    const message = 'Added comment'
    const messageType = 'success'
    dispatch(changeNotification(message, messageType))
    dispatch(commentBlog(blog, newComment))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        const message =`Successfully removed ${blog.title}!`
        const messageType = 'success'
        dispatch(changeNotification(message, messageType))
      } catch(exception) {
        const message = 'There was a problem adding your blog. Try logging out and back in'
        const messageType = 'error'
        dispatch(changeNotification(message, messageType))
      }
    }
  }

  return (
    <div className='single-view'>
      <h2>{blog.title}</h2>
      <div>
        <p><a>{blog.url}</a></p>
        <div className='likes-container'>
          <p>{blog.likes} likes</p>
          <button className='like-btn' onClick={like}>Like</button>
        </div>
        <Link to={`/users/${blog.user.id}`}>
          <div className='likes-container'>
            <p>added by {blog.user.name || user.name}</p>
            {user.name === blog.user.name ?
              <button className='delete-blog' onClick={() => removeBlog(blog)}>Remove</button>
              : null}
          </div>
        </Link>
      </div>
      <div>
        <h4>comments</h4>
        <div>
          <form onSubmit={(event) => addComment(event)}>
            <input type='text' name='comment' onChange={(event) => setInputVal(event.target.value)} />
            <button type='submit' disabled={!inputVal}>Add Comment</button>
          </form>
          <div className='comments-list'>
            <ul>
              {blog.comments.map(comment =>
                <li key={comment}>{comment}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBlogView

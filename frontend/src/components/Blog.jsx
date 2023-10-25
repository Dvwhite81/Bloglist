import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Toggleable from './Toggleable'
import { changeNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const dispatch = useDispatch()

  const like = async () => {
    dispatch(likeBlog(props.blog))
    props.sortBlogs()
    const message = `Liked blog: ${props.blog.title}`
    const messageType = 'success'
    dispatch(changeNotification(message, messageType))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        const message =`Successfully removed ${blog.title}!`
        const messageType = 'success'
        dispatch(changeNotification(message, messageType))
        props.sortBlogs()
      } catch(exception) {
        const message = 'There was a problem adding your blog. Try logging out and back in'
        const messageType = 'error'
        dispatch(changeNotification(message, messageType))
      }
    }
  }

  return (
    <div className='single-blog'>
      <div className='word-wrap'>
        <Link to={`/blogs/${props.id}`}>
          <strong>{props.blog.title}</strong> by <em>{props.blog.author}</em>
        </Link>
      </div>
      <Toggleable
        type={'null'}
        divClass={'blog-view-container'}
        containerDisplay={props.containerDisplay}
        setContainerDisplay={props.setContainerDisplay}
        buttonClass={'toggle-blog-view-button'}
        buttonLabel="View"
      >
        <div className='blog-details'>
          <div className='word-wrap'>{props.blog.url}</div>
          <div className='likes-container'>
            <div className='blog-likes'>{props.blog.likes} likes</div>
            <button className='like-btn' onClick={like}>Like</button>
          </div>
          <div>{props.blog.user.name || props.user.name}</div>
          {props.user.name === props.blog.user.name ?
            <button className='delete-blog' onClick={() => removeBlog(props.blog)}>Remove</button>
            : null}
        </div>
      </Toggleable>
    </div>
  )
}

export default Blog

import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { changeNotification } from '../reducers/notificationReducer'

const BlogForm = ({ user, innerRef }) => {
  const dispatch = useDispatch()

  const createNewBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    try {
      dispatch(createBlog({ title, author, url, user }))
      const message = `Added your blog: ${title}!`
      const messageType = 'success'
      dispatch(changeNotification(message, messageType))
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
      innerRef.current.toggleVisibility()
    } catch (exception) {
      const message = 'There was a problem adding your blog. Try logging out and back in'
      const messageType = 'error'
      dispatch(changeNotification(message, messageType))
    }
  }

  return (
    <div>
      <form onSubmit={createNewBlog}>
        <div>
          Title: <input id='title-input' name='title' />
        </div>
        <div>
          Author: <input id='author-input' name='author' />
        </div>
        <div>
          Url: <input id='url-input' name='url' />
        </div>
        <button id='new-blog-submit' type="submit">Save</button>
      </form>
    </div>
  )}

export default BlogForm

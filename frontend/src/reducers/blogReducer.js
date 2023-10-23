import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    addLike(state, action) {
      const blog = action.payload
      console.log('addLike blog:', blog)
      const id = blog.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(b => b.id !== id ? b : changedBlog)
    },
  }
})

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ({ title, author, url, user }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({ title, author, url })
    newBlog.user = user
    dispatch(addBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog)
    console.log('updatedBlog', updatedBlog)
    dispatch(addLike(updatedBlog))
  }
}

export const { setBlogs, addBlog, removeBlog, addLike } = blogSlice.actions
export default blogSlice.reducer

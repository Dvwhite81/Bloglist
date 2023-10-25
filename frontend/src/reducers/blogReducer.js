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
      const id = blog.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(b => b.id !== id ? b : changedBlog)
    },
    addComment(state, action) {
      const blog = action.payload.blog
      const id = blog.id
      const comment = action.payload.comment
      return state.map(b => b.id !== id ? b : {
        ...blog, comments: [...blog.comments, comment]
      } )
    }
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
    const likes = {
      likes: blog.likes + 1
    }
    await blogService.update(blog, likes)
    dispatch(addLike(blog))
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const comments = {
      comments: [...blog.comments, comment]
    }
    const payload = {
      blog: blog,
      comment: comment
    }
    await blogService.update(blog, comments)
    dispatch(addComment(payload))
  }
}

export const { setBlogs, addBlog, removeBlog, addLike, addComment } = blogSlice.actions
export default blogSlice.reducer

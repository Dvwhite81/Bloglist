import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialUsers } from '../reducers/allUsersReducer'

const AllUsersView = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInitialUsers())
  }, [dispatch])

  const allUsers = useSelector(state => state.allUsers)

  return (
    <div className='all-users-container'>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody className='all-users-list'>
          {allUsers.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsersView

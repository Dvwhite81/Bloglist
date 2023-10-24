import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const login = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const user = { username, password }
    await dispatch(userLogin(user))

    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <div className="login-form-container">
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
        username
          <input
            id='username-input'
            type="text"
            name="username"
          />
        </div>
        <div>
        password
          <input
            id='password-input'
            type="password"
            name="password"
          />
        </div>
        <button id='login-submit' type="submit">Log In</button>
      </form>
    </div>
  )}

export default LoginForm

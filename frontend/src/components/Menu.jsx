import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <nav id='nav-menu'>
      <NavLink to='/'>Blogs</NavLink>
      <NavLink to='/users'>Users</NavLink>
    </nav>
  )
}

export default Menu

import { Link } from "react-router-dom";

import '../style/navbar.css'

export function NavBar(props) {
  return(
    <nav>
      <ul>
        <Link to='/'>Home</Link>
        {
          !props.user ? <Link to='/login'>Login</Link>
        : <Link to='/create'>Create Post</Link>}
      </ul>
    </nav>
  )
}
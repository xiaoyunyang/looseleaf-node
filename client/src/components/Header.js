import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <h1>Your Name</h1>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/book'>Book</Link></li>
				<li><Link to='/about'>About</Link></li>
				<li><Link to='/movie'>Movie/Redirect</Link></li>
				<li><Link to='/signup'>Signup</Link></li>
				<li><Link to='/login'>Login</Link></li>
				<li><Link to='/user'>User</Link></li>
				<li><Link to='/foop'>404</Link></li>
			</ul>
		</nav>
	</header>
)

export default Header

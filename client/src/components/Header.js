import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

class Header extends React.Component {
  componentDidMount() {
    $(".dropdown-button").dropdown()
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="grey lighten-4">
          <div className="nav-wrapper-white nav-text-links">
            <ul className="right">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/book'>Book</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/movie'>Movie/Redirect</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/user'>User</Link></li>
              <li><Link to='/foop'>404</Link></li>
              <li>
                <a href="#" className="navbar-img dropdown-button" data-activates="user-dropdown">
                  <img className="mod-round" src={'http://looseleafapp.com/assets/data/profile/photo/looseleaf.png'}/>
                  <div className="arrow-down"></div>
                </a>
                <ul id="user-dropdown" className="dropdown-content">
                  <li><a href="/user">Profile</a></li>
                  <li><a href="/user">Stats</a></li>
                  <li className="divider"></li>
                  <li><a href="/logout">Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header

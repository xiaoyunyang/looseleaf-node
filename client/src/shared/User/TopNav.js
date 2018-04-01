import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { getNav, root } from './routes';
import { getPageName } from '../../lib/helpers';

// const username = store.username;

const MobileSideNav = ( {username} ) => (
  <ul id="mobile-menu" className="side-nav">
    <li>
      <div className="user-view">
        <div className="background">
          <img alt="looseleaf" src="http://xiaoyunyang.github.io/serverless-webapp/assets/images/table3.png"/>
        </div>
        <img alt={`looseleaf user ${username}`}  className="circle" src="http://xiaoyunyang.github.io/assets/data/profile/photo/xyang.png"/>
         <div className="row">
           <div className="col l2 m2 s2">
             <a href="https://github.com/xiaoyunyang"><i className="fa fa-github fa-lg"></i></a>
           </div>
           <div className="col l2 m2 s2">
             <a href="https://www.linkedin.com/in/xiaoyun-yang"><i className="fa fa-linkedin fa-lg"></i></a>
           </div>
           <div className="col l2 m2 s2">
             <a href="https://medium.com/@xiaoyunyang"><i className="fa fa-medium fa-lg"></i></a>
           </div>
           <div className="col l2 m2 s2">
             <a href="mailto:xiaoyun@looseleafapp.com"><i className="fa fa-envelope fa-lg"></i></a>
           </div>
          </div>
      </div>
    </li>
    <li><Link to={getNav(username).home} className="active">Home</Link></li>
    <li><Link to={getNav(username).profile}>Profile</Link></li>
  </ul>
);

const UserDropdown = ( {username, userPic} ) => (
  <li id="dropdown-block">
    <a className="navbar-img dropdown-button" data-activates="user-dropdown">
      <img alt={`looseleaf user ${username}`} className="mod-round" src={userPic} />
      <div className="arrow-down" />
    </a>
    <ul id="user-dropdown" className="dropdown-content">
      <li><Link to={getNav(username).profile}>Profile</Link></li>
      <li><a href="/user">Stats</a></li>
      <li className="divider" />
      <li><Link to={getNav(username).settings}>Settings</Link></li>
      <li><a href="/auth/logout">Log out</a></li>
    </ul>
  </li>
);

export default class TopNav extends React.Component {
  componentDidMount() {
    $('.button-collapse').sideNav({
      edge: 'left',
      closeOnClick: true
    });
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    if(typeof window !== undefined) {
      $(window).scroll(function(){
        this.toggleNavbarBoxShadow()
      }.bind(this))
    }
  }
  // TODO: I don't know if there's a more elegant way to do this in css
  // This function is essentially doing the same thing as the one in the topNav
  // component of the Guest App. Can we create a template for it somehow?
  toggleNavbarBoxShadow() {
    const boxShadow = "0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)";
    const topNav = $("#user-navbar-fixed .navbar-fixed nav");
    const tabs = $('.tabs-container');
    if(tabs.hasClass('pinned')) {
      topNav.css('box-shadow', 'none');
    } else if(tabs.hasClass('pin-top')) {
      topNav.css('box-shadow', boxShadow);
    }
  }
  render() {
    const username = this.props.user.username;
    const userPic = this.props.user.picture;
    let selected = (typeof this.props.route.path === 'string')
                    ? getPageName(this.props.route.path) : '';
    
    // TODO: Still need the code below?
/*
    if (typeof document !== 'undefined') {
        selected = document.location.pathname.split('/').pop();
        console.log('client rendered...selected=', selected)
        $(`#nav-${selected}`).trigger('click');
    }
*/
    return (
      <div id="user-navbar-fixed">
        <div className="navbar-fixed">
          <nav className="grey lighten-4">
            <div className="nav-wrapper-white nav-text-links">
              <div className="brand-logo hide-on-med-and-down">
                <Link className="navbar-brand" to={getNav(username).home}>
                  <img src="http://looseleafapp.com/assets/images/logo/logo.png" alt="LooseLeaf" />
                </Link>
              </div>
              <ul className="right hide-on-small-only">
                <li className={selected === root ? 'active' : ''}>
                  <Link id={`nav-${root}`} to={getNav(username).home}>Home</Link>
                </li>
                <li className={selected === username ? 'active' : ''}>
                  <Link id={`nav-${username}`} to={getNav(username).profile}>Profile</Link>
                </li>
                <li><Link to={`${getNav(username).home}foo`}>Foo</Link></li>
                <li><button><i className="material-icons">notifications_none</i></button></li>
                <UserDropdown username={username} userPic={userPic}/>
              </ul>
              <ul className="left">
                <li>
                  <a data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <MobileSideNav username={username} />
      </div>

    );
  }
}

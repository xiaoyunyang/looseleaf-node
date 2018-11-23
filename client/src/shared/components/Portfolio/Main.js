import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom';
import { polyfill } from 'es6-promise';
import { renderRoutes } from 'react-router-config';
import $ from 'jquery';
import { getRoot, getRoutes, tabs } from './routes';
import About from './About';
import TopNavUser from '../TopNavUser/Main';
import TopNavGuest from '../TopNavSimple';

polyfill();
export default class Main extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
    this.initializeSticky();
  }
  initializeSticky() {
    const tabs = $('.tabs-container');
    if (tabs.length) {
      tabs.pushpin({
        top: tabs.offset().top - 48
      });
    }
  }
  // TODO: need to display "follow" or "unfollow" button next to user picture.
  // TODO: should be able to hover over user pic to reveal username
  renderProfileUserpic(username, userPic) {
    return (
      <div className="row" id='profile-userpic-tab'>
        <div className="col">
          <img src={userPic} alt={username}/>
        </div>
        {
          <div className="col hide-on-med-only">
            <p>
              <span className="nowrap">{`@${username}`}</span>
            </p>
          </div>
        }
      </div>
    );
  }
  renderTabsNav(selected, root) {
    return (
      <div id="profile-tabs" className="tabs-container pin-top" style={{top: 0}}>
        <div className="row">
          <div className="col">
            {this.renderProfileUserpic(
              this.props.user.info.username,
              this.props.user.info.picture,
            )}
          </div>
          <ul className="tabs section-white">
            {
            tabs.map((tab, i) => {
              return (
                <li key={i} className="tab col">
                  <Link
                    id={`tab-${tab}`}
                    to={`${root}/${tab}`}
                    className={selected === tab ? 'active' : ''}
                  >
                    {tab}
                  </Link>
                </li>);
            })
          }
          </ul>
        </div>
      </div>
    );
  }
  updateState() {
    this.props.actions.getUserFollowers(this.props.user.info.username);
  }
  render() {
    // TODO: The code below is an ugly hac but it works. I don't know why
    // this.props.match.slug no longer provides the tab name
    // It worked before ... not sure why it doesn't work now
    const selected = this.props.location.pathname.split('/').pop() || 'projects';
    let location = (typeof this.props.route.path === 'string') ? this.props.route.path : '/';
    if (typeof window !== 'undefined' &&
        (selected === tabs[0] || selected === tabs[1] || selected === tabs[2] || selected === tabs[3])
    ) {
      $(`#tab-${selected}`).trigger('click');
      location = this.props.location.pathname;
    }
    const root = getRoot(this.props.user.info.username);
    const username = this.props.user.info.username;
    const portfolioProps = {
      userId: this.props.user.info._id, // TODO: remove this
      user: this.props.user.info,
      loggedinAs: this.props.user.loggedinUser,
      actions: this.props.actions
    };

    return (
      <div className="section-white" style={{minHeight: '100vh'}}>
        {
          this.props.user.loggedinUser ?
            <TopNavUser
              route={this.props.route}
              user={this.props.user.loggedinUser}
              useExternLinks={!(this.props.user.loggedinUser._id === this.props.user.info._id)}
              redirPath={location}
            />
            :
            <TopNavGuest redirPath={location} />
        }
        <div className="container">
          <div className="row">
            <div className="col l12 m12 s12">
              <About
                user={this.props.user.info}
                loggedinUser={this.props.user.loggedinUser}
                updateState={this.updateState.bind(this)}
              />
            </div>
          </div>
        </div>
        { this.renderTabsNav(selected, root) }
        <div className="row">
          <div className="col l12 m12 s12">
            <Switch>
              {renderRoutes(getRoutes(username).routes, portfolioProps)}
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { polyfill } from 'es6-promise';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import $ from 'jquery';
import { getRoot, getRoutes, tabs } from './routes';
import About from './About';
import TopNav from '../../../components/TopNavUser';

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
  renderTabsNav(selected, root) {
    const style = {
      top: 0
    };
    return (
      <div id="profile-tabs" className="tabs-container pin-top" style={style}>
        <ul className="tabs">
          {
          tabs.map((tab, i) => {
            return (
              <li key={i} className="tab col l3 m2 s3">
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
    );
  }
  render() {
    const selected = this.props.match.params.slug || 'one';
    if (typeof window !== 'undefined') {
      $(`#tab-${selected}`).trigger('click');
    }
    const root = getRoot(this.props.user.username);
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user}/>
        <div className="container">
          <div className="row">
            <div className="col l12 m12 s12">
              <About user={this.props.user}/>
            </div>
          </div>
        </div>
        { this.renderTabsNav(selected, root) }
        <div className="container">
          <div className="row">
            <div className="col l10 m10 s12">
              <Switch>
                {renderRoutes(getRoutes(this.props.user.username).routes)}
              </Switch>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

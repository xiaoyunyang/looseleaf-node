import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { polyfill } from 'es6-promise';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import $ from 'jquery';
import { routes, root, tabs } from './routes';
import About from './About';
import TopNav from '../TopNav';

polyfill();

class Tab extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    const selected = this.props.match.params.slug || 'one';
    if (typeof window !== 'undefined') {
      $(`#tab-${selected}`).trigger('click');
    }
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user}/>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <About user={this.props.user}/>
              <ul id="profile-tabs" className="tabs">
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
            <Switch>
              {renderRoutes(routes)}
            </Switch>
          </div>
        </div>
      </div>

    );
  }
}

export default Tab;

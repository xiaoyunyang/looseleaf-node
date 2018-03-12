import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { polyfill } from 'es6-promise';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import $ from 'jquery';
import { routes, root, tabs } from './routes';

polyfill();

class Tab extends Component {
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    const selected = this.props.match.params.slug;
    if(window) {
      $(`#tab-${selected}`).trigger('click');
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="hero-profile">
              <div className="row">
                <div className="col l4 m3 12">
                  <img src="https://res.cloudinary.com/closebrace/image/upload/w_400/v1491315007/usericon_id76rb.png" alt="" className="circle" />
                </div>
                <div className="col l5 m3 12 hero-info">
                  <h3>Xiaoyun Yang</h3>
                  <p>Bio</p>
                  <p>Website</p>
                </div>
              </div>
            </div>
            <ul id="profile-tabs" className="tabs">
            {
              tabs.map((tab, i) => {
                return (
                  <li key={i} className="tab col l3 m2 s3">
                    <Link id={`tab-${tab}`}
                          to={`${root}/${tab}`}
                          className={tab === selected ? "active" : ""}>
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
    );
  }
}

export default Tab;

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
    console.log('componentDidMount')
  }
  render() {
    const selected = this.props.match.params.slug;

    $(`#tab-${selected}`).trigger('click');
    console.log('selected', selected)
    return (
      <div className="row">
        <div className="col s12">
          <h2>About</h2>
          <ul className="tabs">
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
    );
  }
}

export default Tab;

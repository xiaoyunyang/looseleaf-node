import React from 'react';
import { Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import $ from 'jquery';
import NotFound from './NotFound';

const root = '/profile/about';


const One = () => (
  <div id="one" className="col s12">
    One
  </div>
);
const Two = () => (
  <div id="two" className="col s12">
    Two
  </div>
);
const Three = () => (
  <div id="three" className="col s12">
    Three
  </div>
);
const routes = [
  {
    path: `${root}/about/one`,
    exact: true,
    component: One
  },
  {
    path: `${root}/about/two`,
    component: Two
  },
  {
    path: `${root}/about/three`,
    component: Three
  },
  {
    path: `${root}/about/three`,
    restricted: false,
    component: NotFound
  }
];


class Tabs extends React.Component  {
  componentDidMount() {
    $('ul.tabs').tabs('select_tab', 'three');
  }
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s3"><Link to={`${root}/about/one`}>One</Link></li>
            <li className="tab col s3"><Link to={`${root}/about/two`}>Two</Link></li>
            <li className="tab col s3"><Link to={`${root}/about/three`}>Three</Link></li>
          </ul>
        </div>
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </div>
    );
  }
}


export default Tabs;

import React from 'react';
import { Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import $ from 'jquery';
const root = '/profile/about';


const Two = () => (
  <div id="two" className="col s12">
    Two
  </div>
);


class Tabs extends React.Component  {
  constructor() {
    super();
    this.state = {
      pages: {
        'one': {'route':  ''},
        'two': {'route':  'two'},
        'three': {'route':  'three'}
      }
    };
  }
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    const selected = window.location.href.split(/\/about\//).pop();
    console.log('selected', selected)

    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
          {
            Object.keys(this.state.pages).map((d, i) => {
              return (
                <li key={i} className="tab col l3 m2 s3">
                  <Link onClick={this.handleClick}
                        className={this.state.pages[d].route===selected ? "active" : ""}
                        to={`${root}/${this.state.pages[d].route}`}>
                    {d}
                  </Link>
                </li>);
            })
          }
          </ul>
        </div>
        <Two />
      </div>
    );
  }
}


export default Two;

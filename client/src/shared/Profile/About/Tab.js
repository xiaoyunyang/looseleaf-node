import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { polyfill } from 'es6-promise';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import $ from 'jquery';
import NotFound from '../NotFound';
import Home from '../Home';

polyfill();

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
    path: `${root}/`,
    exact: true,
    component: Home
  },
  {
    path: `${root}/one`,
    exact: true,
    component: One
  },
  {
    path: `${root}/two`,
    component: Two
  },
  {
    path: `${root}/three`,
    component: Three
  },
  {
    path: `${root}/*`,
    restricted: false,
    component: NotFound
  }
];



class Tab extends Component {
  constructor(props) {

    super(props);
    let books = ['one', 'two', 'three'];
    this.state = {
      books: books
    }

  }
  componentDidMount() {
    $('ul.tabs').tabs();
  }

  render() {
    const selected = this.props.match.params.slug;

    return (
      <div className="row">
        <div className="col s12">
          <h2>About</h2>
          <ul className="tabs">
          {
            this.state.books.map((book, i) => {
              return (
                <li key={i} className="tab col l3 m2 s3">
                  <Link to={`${root}/${book}`}
                        className={book === selected ? "active" : ""}>
                    {book}
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

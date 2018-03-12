import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';

polyfill();

const root = '/profile/book';

const One = () => (
  <div id="one" className="col s12">
    One
  </div>
);


class BookAll extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.staticContext || { books: [] };
  }

  componentDidMount() {
		fetch('/books.json')
		.then(res => res.json())
		.then((json) => {
			this.setState({
				books: json.books
			})
		})
	}

	render() {
		let books = this.state.books.map(book => (
			<li key={book.id}>
				<Link to={`${root}/${book.slug}`}><b>{book.title}</b></Link> by <em>{book.author}</em>
			</li>
		))
    const selected = 'one';
		return (
      <div className="row">
        <div className="col s12">
          <h2>Books</h2>
          <ul className="tabs">
          {
            this.state.books.map(book => {
              return (
                <li key={book.id} className="tab col l3 m2 s3">
                  <Link to={`${root}/${book.slug}`}><b>{book.title}</b></Link>
                </li>);
            })
          }
          </ul>
        </div>
        <div className="col s12">
          <ul>{books}</ul>
        </div>
      </div>
		)
	}
}

export default BookAll;

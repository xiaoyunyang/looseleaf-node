import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';

polyfill();

class BookSingle extends Component {
  constructor(props) {
    super(props);
    let book = {};
    const slug = this.props.match.params.slug;

    // Set 'book' if it’s on server-side
    if (this.props.staticContext) {
      book = this.props.staticContext.books.find(book => book.slug === slug);
    }

    this.state = { book, slug };
  }

  componentDidMount() {
    const slug = this.state.slug;
    fetch('/books.json')
      .then(res => res.json())
      .then((json) => {
        const book = json.books.find(book => book.slug === slug);
        this.setState({ book });
      });
  }

  render() {
    const book = this.state.book;
    return (
      <div>
        <h3>{book.title}</h3>
        <h5 style={{ textAlign: 'right' }}><em>{book.author}</em></h5>
        <p>{book.description}</p>
        <p style={{ color: '#aaa' }}>
          <small>The text above was copied and pasted from Amazon.com.</small>
        </p>
        <br />
        <p><Link to="/book">Back to all books</Link></p>
      </div>
    );
  }
}

export default BookSingle;

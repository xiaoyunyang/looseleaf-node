import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { polyfill }  from 'es6-promise'
import fetch from 'isomorphic-fetch'

polyfill()

class BookAll extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.staticContext || { books: [] }
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
				<Link to={`/book/${book.slug}`}><b>{book.title}</b></Link> by <em>{book.author}</em>
			</li>
		))
		return (
			<div>
				<div>
					<h2>Books</h2>
					<ul>{books}</ul>
				</div>
			</div>
		)
	}
}

export default BookAll

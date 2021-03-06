import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import BookContainer from '../../components/BookContainer';
import BookShelfBody from '../../components/BookShelfBody';

export default class HomePage extends Component {
	render() {
		const { booksApi, onChange } = this.props

		const currentlyReading = booksApi.filter((shelf) => shelf.shelf === 'currentlyReading');
		const wantToRead = booksApi.filter((shelf) => shelf.shelf === 'wantToRead');
		const read = booksApi.filter((shelf) => shelf.shelf === 'read');
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<BookShelfBody title="Currently Reading">
							{currentlyReading.map((bookData) => {
								return (
									<li key={bookData.id}>
										<BookContainer bookData={bookData} updateShelf={onChange} />
									</li>
								);
							})}
						</BookShelfBody>
						<BookShelfBody title="Want To Read">
							{wantToRead.map((bookData) => {
								return (
									<li key={bookData.id}>
										<BookContainer bookData={bookData} updateShelf={onChange} />
									</li>
								);
							})}
						</BookShelfBody>
						<BookShelfBody title="Read">
							{read.map((bookData) => {
								return (
									<li key={bookData.id}>
										<BookContainer bookData={bookData} updateShelf={onChange} />
									</li>
								);
							})}
						</BookShelfBody>
					</div>
				</div>
				<Link id="search-page" className="open-search" style={{ cursor: 'pointer' }} to="/search">
					Add a book
				</Link>
			</div>
		);
	}
}
HomePage.propTypes = {
	currentlyReading: PropTypes.array,
	wantToRead: PropTypes.array,
	read: PropTypes.array,
	bookData: PropTypes.object,
	updateShelf: PropTypes.func
}

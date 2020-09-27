import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookFunctionality from '../../components/BookFunctionality';
import BookShelfBody from '../../components/BookShelfBody';

export default class HomePage extends Component {
	render() {
		const currentlyReading = this.props.booksApi.filter((shelf) => shelf.shelf === 'currentlyReading');
		const wantToRead = this.props.booksApi.filter((shelf) => shelf.shelf === 'wantToRead');
		const read = this.props.booksApi.filter((shelf) => shelf.shelf === 'read');
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
										<BookFunctionality bookData={bookData} updateShelf={this.props.onChange} />
									</li>
								);
							})}
						</BookShelfBody>
						<BookShelfBody title="Want To Read">
							{wantToRead.map((bookData) => {
								return (
									<li key={bookData.id}>
										<BookFunctionality bookData={bookData} updateShelf={this.props.onChange} />
									</li>
								);
							})}
						</BookShelfBody>
						<BookShelfBody title="Read">
							{read.map((bookData) => {
								return (
									<li key={bookData.id}>
										<BookFunctionality bookData={bookData} updateShelf={this.props.onChange} />
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

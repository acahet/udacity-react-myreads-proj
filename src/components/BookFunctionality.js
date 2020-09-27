import React, { Component } from 'react';
import BooksInterface from './BooksInterface';

export default class BookFunctionality extends Component {
	getBookAndShelf = (book, shelf) => {
		this.props.updateShelf(book, shelf);
	};
	render() {
		const { bookData } = this.props;
		return (
			<ol className="books-grid">
				{
					<BooksInterface
						backgroundImage={bookData.imageLinks !== undefined ? bookData.imageLinks.thumbnail : null}
						bookTitle={bookData.title}
						bookAuthors={bookData.authors}
						shelf={bookData.shelf}
						onChange={(e) => {
							this.getBookAndShelf(bookData, e.target.value);
						}}
					/>
				}
			</ol>
		);
	}
}

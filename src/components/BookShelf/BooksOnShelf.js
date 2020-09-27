import React, { Component } from 'react';
import BooksInterface from '../BookInterface/BooksInterface';

export default class BookOnShelf extends Component {
	getBookAndShelf = (book, shelf) => {
		this.props.updateShelf(book, shelf);
	};
	render() {
		const { shelfTitle, booksApi, shelf } = this.props;
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfTitle}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{booksApi
							.filter((bshelf) => bshelf.shelf === shelf)
							.map((bookData) => {
								return (
									<li key={bookData.id}>
										<BooksInterface
											backgroundImage={bookData.imageLinks !== undefined ? bookData.imageLinks.thumbnail : null}
											shelf={shelf}
											bookTitle={bookData.title}
											bookAuthors={bookData.authors}
											onChange={(e) => {
												this.getBookAndShelf(bookData, e.target.value);
											}}
										/>
									</li>
								);
							})}
					</ol>
				</div>
			</div>
		);
	}
}

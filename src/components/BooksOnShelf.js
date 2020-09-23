import React, { Component } from 'react';
import BooksInterface from './BookInterface/BooksInterface';

export default class BookOnShelf extends Component {
	getBookAndShelf = (book, shelf) => {
		console.log('getBookAndShelf', book, 'shelf is: ', shelf);
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
								console.log(Object.keys(bookData.authors), 'shelfLength');
								return (
									<li key={bookData.id}>
										<BooksInterface
											backgroundImage={bookData.imageLinks.thumbnail}
											shelf={shelf}
											onChange={(e) => {
												this.getBookAndShelf(bookData, e.target.value);
											}}
											bookTitle={bookData.title}
											bookAuthors={bookData.authors}
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

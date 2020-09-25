import React from 'react';
import { Link } from 'react-router-dom';
import BookOnShelf from '../../components/BooksOnShelf';

const HomePage = ({ booksApi, onChange }) => {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					<BookOnShelf
						shelfTitle="Currently Reading"
						booksApi={booksApi}
						shelf="currentlyReading"
						updateShelf={onChange}
					/>
					<BookOnShelf
						shelfTitle="Want To Read"
						booksApi={booksApi}
						shelf="wantToRead"
						updateShelf={onChange}
					/>
					<BookOnShelf shelfTitle="Read" booksApi={booksApi} shelf="read" updateShelf={onChange} />
				</div>
			</div>
			<Link id="search-page" className="open-search" style={{ cursor: 'pointer' }} to="/search">
				Add a book
			</Link>
		</div>
	);
};

export default HomePage;

import React from 'react';
import { getAll, update } from './BooksAPI';
import './App.css';
import BookOnShelf from './components/BooksOnShelf';
import SearchPage from './components/SearchPage/SearchPage';

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		showSearchPage: false,
    bookList: [],
		searchBookList: [],
	};

	componentDidMount() {
		this.getBooks();
	}

	getBooks() {
		getAll().then((books) => {
			this.setState(() => ({
				bookList: books,
			}));
		});
	}
	updateBookShelf = (book, shelf) => {
		update(book, shelf).then(() => {
			if (!book.hasOwnProperty('shelf')) {
				const newObject = { shelf: shelf };
				Object.assign(book, newObject);
				// this.setState(() => ({
				// 	searchBookList: [...this.state.bookList],
				// }));
				this.getBooks();
			} else {
				this.getBooks();
			}
		});
	};

	render() {
		const { bookList } = this.state;
		return (
			<div className="app">
				{this.state.showSearchPage ? (
					<div className="search-books">
						<div className="search-books-bar">
							<button className="close-search" onClick={() => this.setState({ showSearchPage: true })}>
								Close
							</button>
							<div className="search-books-input-wrapper">
								{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
								<input type="text" placeholder="Search by title or author" />
							</div>
						</div>
						<div className="search-books-results">
							<ol className="books-grid" />
						</div>
					</div>
				) : (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<BookOnShelf
									shelfTitle="Currently Reading"
									booksApi={bookList}
									shelf="currentlyReading"
									updateShelf={this.updateBookShelf}
								/>
								<BookOnShelf
									shelfTitle="Want To Read"
									booksApi={bookList}
									shelf="wantToRead"
									updateShelf={this.updateBookShelf}
								/>
								<BookOnShelf
									shelfTitle="Read"
									booksApi={bookList}
									shelf="read"
									updateShelf={this.updateBookShelf}
								/>
							</div>
						</div>
						<div className="open-search">
							<button style={{cursor: "pointer"}} onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
						</div>
						<SearchPage />
					</div>
					
				)}
			</div>
		);
	}
}

export default BooksApp;

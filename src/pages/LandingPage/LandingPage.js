import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll, update } from '../../BooksAPI';
import BookOnShelf from '../../components/BooksOnShelf'

export default class LandingPage extends Component {
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
						{/* <div className="open-search"> */}
						<Link className="open-search" style={{cursor: "pointer"}} to='/search'>Add a book</Link>
							{/* <button style={{cursor: "pointer"}} onClick={() => this.setState({ showSearchPage: true })}>Add a book</button> */}
						{/* </div> */}
						
					</div>
        )
    }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAll, update } from '../../BooksAPI';
import BookOnShelf from '../../components/BooksOnShelf'

export default class LandingPage extends Component {
    state = {
		bookList:[]
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
						<Link className="open-search" style={{cursor: "pointer"}} to='/search'>Add a book</Link>
				</div>
        )
    }
}

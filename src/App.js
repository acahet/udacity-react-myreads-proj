import React from 'react';
import { Route } from 'react-router-dom'

import './App.css';
import { getAll, update } from './BooksAPI'
import SearchPage from './components/SearchPage/SearchPage';
import LandingPage from './pages/HomePage/HomePage';

class BooksApp extends React.Component {
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
			<div className="app">
				<Route exact path='/' render={() => (
					<LandingPage booksApi={bookList} onChange={this.updateBookShelf}/>
				)} />

				<Route exact path='/search' render={() => (
					<SearchPage />
				)} />
			</div>
		)
	}
}

export default BooksApp;

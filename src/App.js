import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import { getAll, update } from './BooksAPI';
import SearchPage from './components/SearchPage/SearchPage';
import LandingPage from './pages/HomePage/HomePage';

class BooksApp extends React.Component {
	state = {
		bookList: [],
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
		update(book,shelf).then((response) => {
			console.log('RESPONSE ', response)
			this.setState(currentState => ({
				bookList: currentState.bookList.filter((c) =>{
					return c.id !== book.id
				}).concat({...book, shelf})
			}))
		})
	};


	render() {
		const { bookList } = this.state;
		return (
			<div className="app">
				<Route
					exact
					path="/"
					render={() => <LandingPage booksApi={bookList} onChange={this.updateBookShelf} />}
				/>

				<Route exact path="/search" render={() => <SearchPage books={bookList} />} />
			</div>
		);
	}
}

export default BooksApp;

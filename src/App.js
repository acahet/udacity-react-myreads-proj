import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import { getAll, search, update } from './BooksAPI';
import SearchPage from './components/SearchPage/SearchPage';
import LandingPage from './pages/HomePage/HomePage';

class BooksApp extends React.Component {
	state = {
		bookList: [],
		query: '',
		searchResult: [],
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
	//looks for select book and updates shelf
	updateBookShelf = (book, shelf) => {
		update(book, shelf).then(() => {
			this.setState((currentState) => ({
				bookList: currentState.bookList
					.filter((c) => {
						return c.id !== book.id;
					})
					.concat({ ...book, shelf }),
				searchResult: currentState.searchResult
					.filter((c) => {
						return c.id !== book.id;
					})
					.concat({ ...book, shelf }),
			}));
		});
	};

	getSearch = (query) => {
		search(query).then((results) => {
			console.log('shelf ', results);
			//during the search books do not have a shelf
			// use for each to retrieve each book
			results.forEach((book) => {
				let booksWithShelf = this.state.bookList;
				//use for each to retriev e each for that already has a shelf
				booksWithShelf.forEach((hasShelf) => {
					// compare ID from the books with shelf matches with search results
					if(hasShelf.id===book.id) {
						//match occurs and shelf is added to book/s is search
						book.shelf = hasShelf.shelf
					} 
				});
			});
			this.setState(() => ({
				searchResult: results
			}))
		});
	};

	handleChange = (query) => {
		if (query === null || query === '') {
			this.setState(() => ({
				query: '',
				books: [],
			}));
		} else {
			// this.searchBooks(query);
			this.getSearch(query);
			this.setState({
				query: query,
			});
		}
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
				<Route
					exact
					path="/search"
					render={() => (
						<SearchPage
							getSearch={this.getSearch}
							query={this.state.query}
							searchResult={this.state.searchResult}
							inputOnChange={(e) => {
								this.handleChange(e.target.value);
							}}
							onChange={this.updateBookShelf}
						/>
					)}
				/>
			</div>
		);
	}
}

export default BooksApp;

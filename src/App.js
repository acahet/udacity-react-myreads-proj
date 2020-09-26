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
		// this.compare(this.state.bookList, this.state.searchResult)
	};

	compare(array1, array2) {
		array1.forEach((e1) => {
			array2.forEach((e2) => {
				if (e1.id === e2.id) {
					this.setState((c) => ({
						array2: array2.concat(...array1, e2.shelf),
					}));
				}
			});
		});
	}

	getSearch = (query) => {
		search(query).then((results) => {
			if (results.error === 'empty query' && query.length > 0) {
				this.setState(() => ({
					query: '',
					searchResult: [],
				}));
				return false;
			} else {
				this.compare(this.state.bookList, this.state.searchResult)
				this.setState(() => ({
					searchResult: results,
				}));
			}
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

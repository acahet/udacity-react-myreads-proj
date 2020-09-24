import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search, update } from '../../BooksAPI';
import BooksInterface from '../BookInterface/BooksInterface';

export default class SearchPage extends Component {
	state = {
		query: '',
		queryResults: []
	};

	updateQuery = (query) => {
		if (query === null || query === '') {
			this.setState(() => ({
				query: '',
				queryResults: [],
			}));
		} else {
			this.searchAction(query);
			this.setState({
				query: query,
			});
		}
	};

	searchAction = (query) => {
		search(query).then((response) => {
			//query returns no books
			if (response.error === 'empty query' && query.length > 0) {
				this.setState(() => ({
					queryResults: [],
				}));

				return;
			} else {
				return this.setState(() => ({
					queryResults: response,
				}));
			}
		});
	};

	updateBookShelf = (book, shelf) => {
		update(book, shelf).then(() => {
            const getQuery = this.state.queryResults
			const index = getQuery.findIndex((q) => q.id === book.id);
			if (index >= 0) {
				getQuery[index].shelf = shelf;
			}
			this.setState({ getQuery });
		});
	};

	getBookAndShelf = (book, shelf) => {
		this.updateBookShelf(book, shelf);
	};

	render() {
		const { query, queryResults } = this.state;
		const emptySearchField = <h1>Search for books based on author or title</h1>;
		const searchFilter =
			query === ''
				? ''
				: queryResults.filter((q) => {
						return q.title.toLowerCase().includes(query.toLowerCase());
				  });

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link style={{ cursor: 'pointer' }} className="close-search" to="/" />
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={query}
							autoFocus={true}
							onChange={(e) => this.updateQuery(e.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{
						<span>
							Now showing {searchFilter.length} of {queryResults.length} Books
						</span>
					}
					<ol className="books-grid">
						{query.length > 0
							? searchFilter.map((bookData) => {
                                
									return (
										<li key={bookData.id}>
											<BooksInterface
												backgroundImage={bookData.imageLinks.thumbnail}
												bookTitle={bookData.title}
												bookAuthors={bookData.authors}
												shelf={bookData.shelf}
												onChange={(e) => {
													this.updateBookShelf(bookData, e.target.value);
												}}
											/>
										</li>
									);
							  })
							: emptySearchField}
					</ol>
				</div>
			</div>
		);
	}
}

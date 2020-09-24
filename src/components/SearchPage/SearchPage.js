import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../../BooksAPI';
import BooksInterface from '../BookInterface/BooksInterface';

export default class SearchPage extends Component {
	state = {
		query: '',
		queryResults: [],
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
			console.log('response from books search query is: ', response);
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
	getBookAndShelf = (book, shelf) => {
		console.log('getBookAndShelf', book, 'shelf is: ', shelf);
		this.props.updateShelf(book, shelf);
	};
	render() {
		const { query, queryResults } = this.state;
		const emptySearchField = <h1>Search for books based on author or title</h1>;
		const booksFromQuery =
			query === ''
				? ''
				: queryResults.filter((q) => {
						if (!q.hasOwnProperty('authors')) {
							return q.title.toLowerCase().includes(query.toLocaleLowerCase());
						} else {
							return (
								q.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
								q.authors.toLowerCase().includes(query.toLocaleLowerCase())
							);
						}
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
							Now showing {booksFromQuery.length} of {queryResults.length} Books
						</span>
					}
					<ol className="books-grid">
						{query.length > 0
							? booksFromQuery.map((bookData) => {
									return (
										<li key={bookData.id}>
											<BooksInterface
												backgroundImage={bookData.imageLinks.thumbnail}
												shelf={bookData.shelf}
												bookTitle={bookData.title}
												bookAuthors={bookData.authors}
												onChange={(e) => {
													this.getBookAndShelf(bookData, e.target.value);
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

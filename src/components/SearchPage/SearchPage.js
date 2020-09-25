import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAll, search, update } from '../../BooksAPI';
import BooksInterface from '../BookInterface/BooksInterface';

export default class SearchPage extends Component {
	state = {
		query: ''
	};

	handleChange=(query)=>{
		this.setState(() =>({
			query: query
		}))
	}
	clearQuery=()=> {
		this.handleChange('')
	}
	

	

	render() {
		const { query } = this.state;
		const { books } = this.props
		const emptySearchField = <h1>Search for books based on author or title</h1>;
		const searchFilter =
			query === ''
				? ''
				: books.filter((q)=>(
					q.title.toLowerCase().includes(query.toLowerCase())
				))

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
							onChange={(event) => this.handleChange(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{
						<span>
							Now showing {searchFilter.length} of {books.length} Books
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

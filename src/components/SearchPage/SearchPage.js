import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksInterface from '../BookInterface/BooksInterface';

export default class SearchPage extends Component {
	render() {
		const emptySearchField = <h1>Search for books based on author or title</h1>;
		const searchFilter =
			this.props.query === ''
				? ''
				: this.props.searchResult.filter((q) => {
						return q.title.toLowerCase().includes(this.props.query.toLowerCase());
				  });
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link style={{ cursor: 'pointer' }} className="close-search" to="/" />
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={this.props.query}
							autoFocus={true}
							onChange={this.props.inputOnChange}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.props.query.length > 0
							? searchFilter.map((bookData) => {
									return (
										<li key={bookData.id}>
											<BooksInterface
												backgroundImage={bookData.imageLinks.thumbnail}
												bookTitle={bookData.title}
												bookAuthors={bookData.authors}
												shelf={bookData.shelf}
												onChange={(e) => {
													this.props.onChange(bookData, e.target.value);
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

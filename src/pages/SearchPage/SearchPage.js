import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookFunctionality from '../../components/BookFunctionality';

export default class SearchPage extends Component {
	render() {
		const { query, searchResult, inputOnChange, onChange } = this.props;
		const emptySearchField = <h1>Search for books based on author or title</h1>;
		const searchFilter =
			query === ''
				? ''
				: searchResult.filter((q) => {
						if (!q.hasOwnProperty('authors')) {
							return q.title.toLowerCase().includes(query.toLowerCase());
						} else {
							return (
								q.title.toLowerCase().includes(query.toLowerCase()) ||
								q.authors.includes(query.toLowerCase())
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
							onChange={inputOnChange}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{query.length > 0 && searchResult.length !== undefined ? (
						<span>
							<strong>Based on your search we have found {searchFilter.length} book(s)</strong>
						</span>
					) : (
						''
					)}
					<ol className="books-grid">
						{query.length > 0
							? searchFilter.map((bookData) => {
									return (
										<li key={bookData.id}>
											<BookFunctionality bookData={bookData} updateShelf={onChange} />
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
SearchPage.propTypes = {
	emptySearchField: PropTypes.string,
	searchFilter: PropTypes.array,
	bookData: PropTypes.object,
	query: PropTypes.string,
	inputOnChange: PropTypes.func,
};

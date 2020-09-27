import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import BookFunctionality from '../../components/BookFunctionality';

export default class SearchPage extends Component {
	render() {
		const emptySearchField = <h1>Search for books based on author or title</h1>;
		const searchFilter =
			this.props.query === ''
				? ''
				: this.props.searchResult.filter((q) => {
						if (!q.hasOwnProperty('authors')) {
							return q.title.toLowerCase().includes(this.props.query.toLowerCase());
						} else {
							return (
								q.title.toLowerCase().includes(this.props.query.toLowerCase()) ||
								q.authors.includes(this.props.query.toLowerCase())
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
							value={this.props.query}
							autoFocus={true}
							onChange={this.props.inputOnChange}
						/>
					</div>
				</div>
				<div className="search-books-results">
					{this.props.query.length > 0 && this.props.searchResult.length !== undefined ? (
						<span>
							<strong>Based on your search we have found {searchFilter.length} book(s)</strong>
						</span>
					) : (
						''
					)}
					<ol className="books-grid">
						{this.props.query.length > 0
                            ? 
							searchFilter.map((bookData) =>{
								return (
									<li key={bookData.id}>
										<BookFunctionality bookData={bookData} updateShelf={this.props.onChange} />
									</li>
								)
							})
							: emptySearchField
						}
						</ol>
					</div>

			</div>
		);
	}
}
SearchPage.propTypes = {
	emptySearchField: PropTypes.string,
	searchFilter: PropTypes.any,

}

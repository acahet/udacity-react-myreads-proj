import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksInterface from '../BookInterface/BooksInterface';

export default class SearchPage extends Component {
	state = {
        query: '',
        queryResults:[]
	};
	render() {
        const { query, queryResults } = this.state;
        
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
							Add functionality to show number of books filtered
							{/* Now showing {filterBooks.length} of {queryResults.length} Books */}
						</span>
					}
                    <ol className='books-grid'>
                        <BooksInterface />
                    </ol>
				</div>
			</div>
		);
	}
}

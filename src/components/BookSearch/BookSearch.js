import React, { Component } from 'react'
import BooksInterface from '../BookInterface/BooksInterface';

export default class BookSearch extends Component {
    getBookAndShelf = (book, shelf) => {
		this.props.updateShelf(book, shelf);
	};
    render() {
        const { query, searchFilter, emptySearchField } = this.props
        return (
            <ol className="books-grid">
						{query.length > 0
							? searchFilter.map((bookData) => {
									return (
										<li key={bookData.id}>
											<BooksInterface
												backgroundImage={
													bookData.imageLinks !== undefined
														? bookData.imageLinks.thumbnail
														: null
												}
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
        )
    }
}

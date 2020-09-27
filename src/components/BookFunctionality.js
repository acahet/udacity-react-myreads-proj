import React from 'react';
import PropTypes from 'prop-types'
import BookInterface from './BookInterface';

const BookFunctionality = ({ bookData, updateShelf }) => {
	const getBookAndShelf = (book, shelf) => {
		updateShelf(book, shelf);
	};

	return (
		<ol className="books-grid">
			{
				<BookInterface
					backgroundImage={bookData.imageLinks !== undefined ? bookData.imageLinks.thumbnail : null}
					bookTitle={bookData.title}
					bookAuthors={bookData.authors}
					shelf={bookData.shelf}
					onChange={(e) => {
						getBookAndShelf(bookData, e.target.value);
					}}
				/>
			}
		</ol>
	);
};
BookFunctionality.propTypes = {
    getBookAndShelf: PropTypes.func,
    updateShelf: PropTypes.func,
    bookData: PropTypes.object
}


export default BookFunctionality;

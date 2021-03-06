import React from 'react';
import PropTypes from 'prop-types'
import Book from './Book';
import noCoverImage from '../icons/no-image-placeholder.png'

const BookContainer = ({ bookData, updateShelf }) => {
	const onChange = (book, shelf) => {
		updateShelf(book, shelf);
	};

	return (
		<ol className="books-grid">
			{
				<Book
				preview={bookData.previewLink}
					backgroundImage={bookData.imageLinks !== undefined ? bookData.imageLinks.thumbnail : noCoverImage}
					bookTitle={bookData.title}
					bookAuthors={bookData.authors}
					shelf={bookData.shelf}
					onChange={(e) => {
						onChange(bookData, e.target.value);
					}}
				/>
			}
		</ol>
	);
};
BookContainer.propTypes = {
    getBookAndShelf: PropTypes.func,
    updateShelf: PropTypes.func,
    bookData: PropTypes.object
}


export default BookContainer;

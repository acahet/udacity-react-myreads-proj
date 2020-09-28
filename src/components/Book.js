import React from 'react';
import PropTypes from 'prop-types'

const Book = ({ backgroundImage, shelf, onChange, bookTitle, bookAuthors }) => {
	return (
		<div className="bookshelf-books">
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${backgroundImage})`,
						}}
					/>
					<div className="book-shelf-changer">
						<select value={shelf !== undefined ? shelf : 'none'} onChange={onChange}>
							<option value="move" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{bookTitle}</div>
				<div className="book-authors">{bookAuthors}</div>
			</div>
		</div>
	);
};

Book.propTypes = {
	backgroundImage: PropTypes.string,
	shelf: PropTypes.string,
	onChange: PropTypes.func,
	bookTitle: PropTypes.string,
	bookAuthors: PropTypes.arrayOf(PropTypes.string)
}
export default Book;

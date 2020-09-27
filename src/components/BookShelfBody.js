import React from 'react';
import PropTypes from 'prop-types'
const BookShelfBody = ({ title, children }) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<ol className="books-grid">{children}</ol>
		</div>
	);
};
BookShelfBody.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.array
}
export default BookShelfBody;

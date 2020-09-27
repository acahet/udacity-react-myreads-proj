import React from 'react';

const BookShelfBody = ({ title, children }) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<ol className="books-grid">{children}</ol>
		</div>
	);
};

export default BookShelfBody;

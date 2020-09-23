import React from 'react';
import ShelfChanger from '../ShelfChanger/ShelfChanger';
const BooksInterface = ({ backgroundImage, shelf, onChange, bookTitle, bookAuthors }) => {
	return (
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
					<ShelfChanger value={shelf} onChange={onChange} />
				</div>
			</div>
			<div className="book-title">{bookTitle}</div>
			<div className="book-authors">{bookAuthors}</div>
		</div>
	);
};
export default BooksInterface;

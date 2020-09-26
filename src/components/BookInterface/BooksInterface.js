import React from 'react';
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
					{/* <ShelfChanger value={shelf} onChange={onChange} /> */}
					<select value={shelf !==undefined ? shelf : 'none'} onChange={onChange}>
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
	);
};
export default BooksInterface;

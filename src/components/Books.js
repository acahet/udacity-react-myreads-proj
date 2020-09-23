import React, { Component } from 'react';
import ShelfChanger from './ShelfChanger/ShelfChanger';
class BookDisplay extends Component {
	render() {
		const { shelf, book, bookTitle, bookAuthors } = this.props;
		return (
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${this.props.backgroundImage})`,
						}}
					/>
					<div className="book-shelf-changer">
						<ShelfChanger
							value={shelf}
							onChange={(e) => {
								this.getBookAndShelf(book, e.target.value);
							}}
						/>
					</div>
				</div>
				<div className="book-title">{bookTitle}</div>
				<div className="book-authors">{bookAuthors}</div>
			</div>
		);
	}
}

export default BookDisplay;

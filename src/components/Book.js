import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, shelves, onUpdateBook }) => {
    return (
        <li>
            <div className='book'>
                <div className='book-top'>
                    <div
                        className='book-cover'
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url("${book.imageLinks.thumbnail}")`,
                        }}></div>
                    <div className='book-shelf-changer'>
                        <select onChange={onUpdateBook}>
                            <option value='move' disabled>
                                Move to...
                            </option>
                            {shelves.map(shelf => (
                                <option key={shelf.categ} value={shelf.categ}>{shelf.text}</option>
                            ))}
                            <option value='none'>None</option>
                        </select>
                    </div>
                </div>
                <div className='book-title'>{book.title}</div>
                <div className='book-authors'>{book.authors}</div>
            </div>
        </li>
    )
};

Book.propsTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
}

export default Book;
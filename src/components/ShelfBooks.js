import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const ShelfBooks = ({ books, shelves, onUpdateBook, title }) => {
  return (
    <div className='bookshelf'>
      {title && <h2 className='bookshelf-title'>{title}</h2>}
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books &&
            books.map((book) => (
              <Book
                book={book}
                key={`${book.title}-${book.id}`}
                shelves={shelves}
                onUpdateBook={onUpdateBook}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

ShelfBooks.propTypes = {
  books: PropTypes.array,
  shelves: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default ShelfBooks;

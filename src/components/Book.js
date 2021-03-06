import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  state = {
    shelf: this.props.book.shelf,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.book.shelf !== prevState.shelf) {
      return {
        shelf: nextProps.book.shelf,
      };
    }

    return null;
  }
  handleUpdateBook = (event, book) => {
    this.props.onUpdateBook(event, book);
  };

  render() {
    const { book, shelves } = this.props;

    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks && book.imageLinks.thumbnail
                    ? `${book.imageLinks.thumbnail}`
                    : `http://via.placeholder.com/128x193?text=No%20Cover`
                })`,
              }}></div>
            <div className='book-shelf-changer'>
              <select
                value={this.state.shelf}
                onChange={(event) => this.handleUpdateBook(event, book)}>
                <option value='move' disabled>
                  Move to...
                </option>
                {shelves.map((shelf) => (
                  <option key={shelf.categ} value={shelf.categ}>
                    {shelf.text}
                  </option>
                ))}
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>{book.title}</div>
          {book.authors && (
            <div className='book-authors'>
              {Array.isArray(book.authors) ? book.authors.join(', ') : ''}
            </div>
          )}
        </div>
      </li>
    );
  }
}

Book.propsTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default Book;

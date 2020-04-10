import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

class Book extends Component {
  state = {
    shelf: this.props.book.shelf,
  };

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
                backgroundImage: `url("${
                  book.imageLinks ? book.imageLinks.thumbnail : ''
                }")`,
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
          <div className='book-authors'>{book.authors}</div>
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

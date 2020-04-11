import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfBooks from '../components/ShelfBooks';
import { Link } from 'react-router-dom';
import SearchBooks from '../components/SearchBooks';

class SearchBookPage extends Component {
  render() {
    const { books, shelves, onUpdateBook, onSearchBooks } = this.props;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <SearchBooks onSearchBooks={onSearchBooks} />
        </div>
        <div className='search-books-results'>
          <ShelfBooks
            books={books}
            shelves={shelves}
            onUpdateBook={onUpdateBook}
          />
        </div>
      </div>
    );
  }
}

SearchBookPage.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onSearchBooks: PropTypes.func.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default SearchBookPage;

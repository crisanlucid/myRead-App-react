import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SEARCH_BOOK_KEY = 'searchBook';
class SearchBooks extends Component {
  state = {
    text: localStorage.getItem(SEARCH_BOOK_KEY) || '',
  };

  handleOnChangeInput = (event) => {
    const { value: searchQueryBook } = event.target;
    this.props.onSearchBooks(searchQueryBook);

    this.setState(
      () => ({ text: searchQueryBook }),
      localStorage.setItem(SEARCH_BOOK_KEY, searchQueryBook),
    );
  };

  render() {
    return (
      <div className='search-books-input-wrapper'>
        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
        <input
          type='text'
          onChange={this.handleOnChangeInput}
          value={this.state.text}
          placeholder='Search by title or author'
        />
      </div>
    );
  }
}

SearchBooks.propTypes = {
  onSearchBooks: PropTypes.func.isRequired,
};

export default SearchBooks;

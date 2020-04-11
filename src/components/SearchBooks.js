import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SEARCH_BOOK_KEY = 'searchBook';
const DEBOUNCE_MILISECONDS = 400;

const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
class SearchBooks extends Component {
  constructor(props) {
    super(props);

    let currentSearchBook = localStorage.getItem(SEARCH_BOOK_KEY) || '';

    this.state = {
      text: currentSearchBook,
    };
  }

  handleOnChangeInput = debounce((searchQueryBook) => {
    this.setState(
      () => ({ text: searchQueryBook }),
      localStorage.setItem(SEARCH_BOOK_KEY, searchQueryBook),
    );

    console.log('hello');
    //call again the function until a certain amount of  time has passed since last call
    //200 ms
    this.props.onSearchBooks(searchQueryBook);
  }, DEBOUNCE_MILISECONDS);

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
          onChange={(event) => this.handleOnChangeInput(event.target.value)}
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

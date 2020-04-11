import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

import { Route } from 'react-router-dom';
import ListBooksPage from './pages/ListBooksPage';
import SearchBooksPage from './pages/SearchBooksPage';

const SHELF_LIST = [
  { categ: 'currentlyReading', text: 'Currently Reading' },
  { categ: 'wantToRead', text: 'Want to Read' },
  { categ: 'read', text: 'Read' },
];
class BooksApp extends React.Component {
  state = {
    bookList: JSON.parse(localStorage.getItem('books')) || [],
    shelfList: [],
  };

  componentDidMount = () => {
    const queryBooks = localStorage.getItem('searchBook');

    this.setState(() => ({ shelfList: SHELF_LIST }));

    if (queryBooks) {
      //search from API
      this.searchBooksAPI(queryBooks);
    }
  };

  handleUpdateBook = (event, book) => {
    const { value: newShelf } = event.target;

    if (newShelf === 'none') return;
    //create a new list and update the book with the correct shelf position
    /* eslint-disable no-sequences */
    const newBookList = this.state.bookList.map(
      (item) => (item.id === book.id ? (item.shelf = newShelf) : null, item),
    );

    this.setState(
      () => ({
        bookList: newBookList,
      }),
      localStorage.setItem('books', JSON.stringify([...newBookList])),
    );
  };

  handleSearchBooks = (queryBooks) => {
    //clear flag
    localStorage.removeItem('clearSearch');

    //validation
    if (!queryBooks) {
      this.setState(
        () => ({
          bookList: [],
        }),
        localStorage.setItem('books', JSON.stringify([])),
      );
      return;
    }
    //search from API
    this.searchBooksAPI(queryBooks);
  };

  searchBooksAPI = (queryBooks) => {
    BooksAPI.search(queryBooks).then((response) => {
      let newBookList = [];
      if (Array.isArray(response)) {
        newBookList = response.map((book) => ((book.shelf = 'none'), book));
      }
      this.setState(
        () => ({
          bookList: [...newBookList],
        }),
        localStorage.setItem('books', JSON.stringify([...newBookList])),
      );
    });
  };

  render() {
    const { bookList, shelfList } = this.state;
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          component={() => (
            <ListBooksPage
              books={bookList}
              shelves={shelfList}
              onUpdateBook={this.handleUpdateBook}
            />
          )}
        />
        <Route
          path='/search'
          component={() => (
            <SearchBooksPage
              books={bookList}
              shelves={shelfList}
              onUpdateBook={this.handleUpdateBook}
              onSearchBooks={this.handleSearchBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

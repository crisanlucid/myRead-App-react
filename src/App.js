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
    const bookList = JSON.parse(localStorage.getItem('books'));

    let isUpdate = false;

    if (Array.isArray(bookList) && bookList.length === 0) {
      isUpdate = true;
    }

    //update
    if (queryBooks && isUpdate) {
      this.setState(() => ({ shelfList: SHELF_LIST }));
      //search from API
      this.searchBooksAPI(queryBooks);
    }
    //init data
    if (!queryBooks) {
      BooksAPI.getAll().then((data) =>
        this.setState(() => ({ bookList: data, shelfList: SHELF_LIST })),
      );
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
          render={() => (
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

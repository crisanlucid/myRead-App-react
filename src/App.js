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
    bookList: [],
    shelfList: [],
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((response) =>
      this.setState(() => ({ bookList: [...response], shelfList: SHELF_LIST })),
    );
  };

  handleUpdateBook = (event, book) => {
    // console.log('parent update Book with custom Shelf...')
    const { value: newShelf } = event.target;

    if (newShelf === 'none') return;
    //create a new list and update the book with the correct shelf position
    const newBookList = this.state.bookList.map(
      (item) => (item.id === book.id ? (item.shelf = newShelf) : null, item),
    );

    this.setState(() => ({
      bookList: newBookList,
    }));
  };

  handleSearchBooks = (queryBooks) => {
    // console.log('parent update List of Books...');

    //clear flag
    localStorage.removeItem('clearSearch');

    //validation
    if (!queryBooks) {
      const cachedBooks = localStorage.getItem('books');

      if (!cachedBooks) {
        BooksAPI.getAll().then((response) =>
          this.setState(() => ({
            bookList: [...response],
          })),
        );
      } else {
        this.setState(() => ({
          bookList: [...JSON.parse(cachedBooks)],
        }));
      }

      return;
    }
    //search from API
    BooksAPI.search(queryBooks).then((response) => {
      console.log(response);
      let newBookList = [];
      if (Array.isArray(response)) {
        newBookList = [...response];
      }
      this.setState(() => ({
        bookList: [...newBookList],
      }));
    });
  };

  render() {
    console.log('this.state.bookList', this.state.bookList);
    console.log('this.state.shelfList', this.state.shelfList);
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

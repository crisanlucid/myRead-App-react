import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

import { Route, Switch } from 'react-router-dom';
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
    BooksAPI.getAll()
      .then((data) =>
        this.setState(() => ({ bookList: data, shelfList: SHELF_LIST })),
      )
      .catch((err) => {
        console.log(err);
      });
  };

  handleUpdateBook = (event, book) => {
    const { value: newShelf } = event.target;

    if (book.shelf === newShelf) return;

    //optimistic approach
    const initBookList = this.state.bookList;
    try {
      //create a new list and update the book with the correct shelf position/
      const updateBook = { ...book, shelf: newShelf };
      const newBookList = initBookList
        .filter((b) => b.id !== updateBook.id)
        .concat([updateBook]);

      this.setState(
        () => ({
          bookList: newBookList,
        }),
        localStorage.setItem('books', JSON.stringify([...newBookList])),
      );

      BooksAPI.update(book, newShelf);
    } catch (error) {
      console.log('Something had gone wrong');
      alert('Something had gone wrong');

      const defaultBookList = initBookList
        .filter((b) => b.id !== book.id)
        .concat([book]);
      this.setState(
        () => ({
          bookList: defaultBookList,
        }),
        localStorage.setItem('books', JSON.stringify([...defaultBookList])),
      );
    }
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
        /* eslint-disable no-sequences */
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
        <Switch>
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
        </Switch>
      </div>
    );
  }
}

export default BooksApp;

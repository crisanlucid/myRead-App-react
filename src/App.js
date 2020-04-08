import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'


import { Route } from 'react-router-dom';
import ListBooksPage from './pages/ListBooksPage';

const SHELF_LIST = ['currShelf', 'wishlistShelf', 'readShelf'];
class BooksApp extends React.Component {
  state = {
    bookList: [],
    shelfList: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(response => this.setState(() => ({ bookList: [...response], shelfList: SHELF_LIST })));
  }


  handleUpdateBook = () => {
    console.log('parent update Book with custom Shelf...')
  }
  render() {
    console.log('this.state.bookList', this.state.bookList)
    console.log('this.state.shelfList', this.state.shelfList)
    const { bookList, shelfList } = this.state;
    return (
      <div className="app">
        <Route exact path='/' component={() => (
          <ListBooksPage
            books={bookList}
            shelves={shelfList}
            onUpdateBook={this.handleUpdateBook}
          />
        )} />
        <Route path='/search' component={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />


      </div>
    )
  }
}

export default BooksApp

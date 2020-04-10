import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ShelfBook from '../components/ShelfBooks';
import { Link } from 'react-router-dom';

class ListBooksPage extends PureComponent {
  constructor(props) {
    super(props);
    /* eslint-disable no-sequences */
    const {
      currentlyReading: booksCurrentlyReading,
      read: booksRead,
      wantToRead: booksWantToRead,
    } = this.props.books.reduce(
      (acc, book) => (
        (acc[book.shelf] = [...(acc[book.shelf] || []), book]), acc
      ),
      {},
    );
    this.state = {
      booksCurrentlyReading,
      booksRead,
      booksWantToRead,
      books: this.props.books,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.books) === JSON.stringify(prevState.books)) {
      /* eslint-disable no-sequences */
      const {
        currentlyReading: booksCurrentlyReading,
        read: booksRead,
        wantToRead: booksWantToRead,
      } = nextProps.books.reduce(
        (acc, book, i) => (
          (acc[book.shelf] = [...(acc[book.shelf] || []), book]), acc
        ),
        {},
      );

      return {
        booksCurrentlyReading,
        booksRead,
        booksWantToRead,
        books: nextProps.books,
      };
    }
  }

  redirectLink = () => {
    localStorage.setItem('clearSearch', true);
    return {
      pathname: '/search',
    };
  };

  render() {
    const { booksCurrentlyReading, booksRead, booksWantToRead } = this.state;
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {booksCurrentlyReading && (
              <ShelfBook
                books={booksCurrentlyReading}
                title='Currently Reading'
                shelves={this.props.shelves}
                onUpdateBook={this.props.onUpdateBook}
              />
            )}
            {booksWantToRead && (
              <ShelfBook
                books={booksWantToRead}
                title='Want to Read'
                shelves={this.props.shelves}
                onUpdateBook={this.props.onUpdateBook}
              />
            )}
            {booksRead && (
              <ShelfBook
                books={booksRead}
                title='Read'
                shelves={this.props.shelves}
                onUpdateBook={this.props.onUpdateBook}
              />
            )}
          </div>
        </div>
        <div className='open-search'>
          <Link to={this.redirectLink}>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

ListBooksPage.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default ListBooksPage;

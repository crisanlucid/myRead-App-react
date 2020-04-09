import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ShelfBook from '../components/ShelfBooks';
import { Link } from 'react-router-dom'

class ListBooksPage extends PureComponent {
    constructor(props) {
        super(props);
        const { currentlyReading, read, wantToRead } = this.props.books.reduce((acc, book, i) => (acc[book.shelf] = [...acc[book.shelf] || [], book], acc), {})
        this.state = { currentlyReading, read, wantToRead, books: this.props.books }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.books) === JSON.stringify(prevState.books)) {
            const { currentlyReading, read, wantToRead } = nextProps.books.reduce((acc, book, i) => (acc[book.shelf] = [...acc[book.shelf] || [], book], acc), {})

            return { currentlyReading, read, wantToRead, books: nextProps.books }
        }
    }
    render() {
        const { currentlyReading, read, wantToRead } = this.state;
        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                    <div>
                        {currentlyReading && (
                            <ShelfBook
                                books={currentlyReading}
                                title='Currently Reading'
                                shelves={this.props.shelves}
                                onUpdateBook={this.props.onUpdateBook}
                            />
                        )}
                        {wantToRead && (
                            <ShelfBook
                                books={wantToRead}
                                title='Want to Read'
                                shelves={this.props.shelves}
                                onUpdateBook={this.props.onUpdateBook}
                            />
                        )}
                        {read && (
                            <ShelfBook
                                books={read}
                                title='Read'
                                shelves={this.props.shelves}
                                onUpdateBook={this.props.onUpdateBook}
                            />
                        )}
                    </div>
                </div>
                <div className='open-search'>
                    <Link to='/search'>
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

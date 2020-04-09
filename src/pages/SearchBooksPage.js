import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShelfBooks from '../components/ShelfBooks';
import { Link } from 'react-router-dom';

class SearchBookPage extends Component {

    handleUpdateBook = () => {
        console.log('update shelf...')
    }

    handleSearchBox = () => {
        console.log('child search books...')
    }

    render() {
        const { books, shelves } = this.props;
        return (<div className="search-books">
            <div className="search-books-bar">
                <Link to="/"><button className="close-search">Close</button></Link>
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
                <ShelfBooks
                    books={books}
                    shelves={shelves}
                    onUpdateBook={this.handleUpdateBook}
                />
            </div>
        </div>)
    }
}

SearchBookPage.propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onSearchBook: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
}

export default SearchBookPage;
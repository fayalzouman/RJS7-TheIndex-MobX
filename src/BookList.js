import React, { Component } from "react";
import { observer } from "mobx-react";

// Components
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import Loading from "./Loading";

// Store
import bookStore from "./stores/bookStore";

class BookList extends Component {
  filterBooksByColor = bookColor =>
    bookStore.books.filter(book => book.color === bookColor);

  render() {
    const bookColor = this.props.match.params.bookColor;
    let books = bookStore.books;

    if (bookColor) {
      books = this.filterBooksByColor(bookColor);
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable books={books} />
      </div>
    );
  }
}

export default observer(BookList);

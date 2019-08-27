import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];
  loading = true;
  query = "";

  fetchBook = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;
      this.books = books;
      console.log(books);
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };

  get filteredBooks() {
    return this.books.filter(book =>
      `${book.title} `.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  getBookById = id => this.books.find(book => +book.id === +id);
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();

bookStore.fetchBook();

export default bookStore;

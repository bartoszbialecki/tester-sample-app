import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    fetch("/api/books")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ books: responseJson });
      });
  };

  render() {
    const { books } = this.state;

    return (
      <div>
        <h1>My collection of books</h1>

        <div className="nav">
          <Link to="./new-book">
            <button type="button" className="button">
              Add new book
            </button>
          </Link>
        </div>

        {books.length ? (
          <ul className="books-list">
            {books.map(book => {
              return (
                <li key={book.isbn} className="book-item">
                  <Book {...book} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div>
            <h2>There are no books saved yet.</h2>
          </div>
        )}
      </div>
    );
  }
}

export default Home;

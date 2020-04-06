import React from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";

export default function Home() {
  return (
    <div>
      <h1>My collection of books</h1>

      <div className="nav">
        <Link to="./new-book">
          <button
            data-testid="add-book-button"
            id="add-book-button"
            type="button"
            className="button"
          >
            Add new book
          </button>
        </Link>
      </div>

      <BookList />
    </div>
  );
}

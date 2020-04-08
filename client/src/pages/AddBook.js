import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BookForm() {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const clearForm = () => {
    setIsbn("");
    setTitle("");
    setAuthor("");
  };

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      isbn,
      title,
      author
    };

    fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.error) {
          setSuccessMessage(null);
          setErrorMessage(jsonResponse.message);
        } else {
          setSuccessMessage(jsonResponse.message);
          setErrorMessage(null);
          clearForm();
        }
      });
  };

  return (
    <div className="add-new-book">
      <h1>Add new book</h1>

      <div className="nav">
        <Link to="/">
          <button id="home-button" type="button" className="button">
            Home
          </button>
        </Link>
      </div>

      <div>
        {errorMessage && <span className="error-message">{errorMessage}</span>}

        {successMessage && (
          <span data-testid="success-message" className="success-message">
            The book was added.
          </span>
        )}
      </div>

      <form className="new-book-form" onSubmit={handleSubmit}>
        <label htmlFor="isbn" className="form-label">
          <span>ISBN</span>
          <input
            data-testid="isbn"
            name="isbn"
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
            required
          />
        </label>

        <label htmlFor="title" className="form-label">
          <span>Title</span>
          <input
            data-testid="title"
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>

        <label htmlFor="author" className="form-label">
          <span>Author</span>
          <input
            data-testid="author"
            name="author"
            type="text"
            placeholder="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
        </label>
        <button
          data-testid="add-book-button"
          id="add-book-button"
          type="submit"
          className="button"
        >
          Add book
        </button>
      </form>
    </div>
  );
}

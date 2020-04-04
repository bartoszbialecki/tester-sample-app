import React from "react";
import PropTypes from "prop-types";
import "./Book.css";

const Book = props => {
  const { isbn, title, author, onRemove } = props;
  return (
    <div className="book">
      <button
        type="button"
        className="delete-button"
        onClick={() => onRemove(isbn)}
      >
        <span>Delete</span>
      </button>
      <h2>{title}</h2>
      <span>{author}</span>
    </div>
  );
};

Book.propTypes = {
  isbn: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Book;

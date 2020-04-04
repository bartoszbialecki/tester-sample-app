import React from "react";
import PropTypes from "prop-types";
import "./Book.css";

const Book = props => {
  const { title, author } = props;
  return (
    <div className="book">
      <h2>{title}</h2>
      <span>{author}</span>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default Book;

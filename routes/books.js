const express = require("express");
const fs = require("fs");

const router = express.Router();

const dataPath = "./data/books.json";
let books = [];

const readFile = (
  callback,
  returnJson = false,
  filePath = dataPath,
  encoding = "utf8"
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (
  fileData,
  callback,
  filePath = dataPath,
  encoding = "utf8"
) => {
  fs.writeFile(filePath, fileData, encoding, err => {
    if (err) {
      throw err;
    }

    callback();
  });
};

const writeBooks = (booksToSave, callback) => {
  const data = {
    books: booksToSave
  };

  writeFile(JSON.stringify(data, null, 2), () => {
    callback();
  });
};

const findBook = isbn => {
  return books.find(book => book.isbn === isbn);
};

const findBookIndex = isbn => {
  return books.findIndex(book => book.isbn === isbn);
};

const response = (message, error = false) => {
  return {
    error,
    message
  };
};

readFile(data => {
  books = data.books;
}, true);

// get book list
router.get("/", (req, res) => {
  res.send(books);
});

// create new book
router.post("/", (req, res) => {
  const newBook = req.body;
  const book = findBook(newBook.isbn);

  if (book) {
    res.status(409).send(response(`Book already exists.`, true));
  } else {
    books.push(newBook);

    writeBooks(books, () => {
      res.status(200).send(response(`Book ${req.body.title} created`));
    });
  }
});

// get book
router.get("/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = findBook(isbn);

  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send(response("Book not found.", true));
  }
});

// update book
router.put("/:isbn", (req, res) => {
  const { isbn } = req.params;
  const bookIndex = findBookIndex(isbn);
  const newBook = req.body;

  if (bookIndex >= 0) {
    books[bookIndex] = newBook;

    writeBooks(books, () => {
      res.status(200).send(response(`Book updated.`));
    });
  } else {
    res.status(404).send(response("Book not found.", true));
  }
});

// delete book
router.delete("/:isbn", (req, res) => {
  const { isbn } = req.params;
  const bookIndex = findBookIndex(isbn);

  if (bookIndex >= 0) {
    books.splice(bookIndex, 1);

    writeBooks(books, () => {
      res.status(200).send(response(`Book removed.`));
    });
  } else {
    res.status(404).send(response("Book not found.", true));
  }
});

module.exports = router;

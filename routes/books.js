const express = require("express");
const booksRepository = require("../data/booksRepository");

const router = express.Router();

const response = (message, error = false) => {
  return {
    error,
    message
  };
};

// get book list
router.get("/", async (req, res) => {
  await booksRepository
    .getBooks()
    .then(books => res.send(books))
    .catch(() => {
      res.status(500).send("An error occurred fetching books.");
    });
});

// create new book
router.post("/", async (req, res) => {
  const newBook = req.body;

  if (
    newBook.isbn.trim() === "" ||
    newBook.title.trim() === "" ||
    newBook.author.trim() === ""
  ) {
    res.status(400).send(response("Please give all required fields.", true));
    return;
  }

  const book = await booksRepository.getBook(newBook.isbn);

  if (book) {
    res.status(409).send(response(`Book already exists.`, true));
  } else {
    await booksRepository
      .insertBook(newBook)
      .then(() => {
        res.status(200).send(response(`Book ${req.body.title} created`));
      })
      .catch(error => {
        res.status(error.statusCode).send(response(error.message, true));
      });
  }
});

// get book
router.get("/:isbn", async (req, res) => {
  const { isbn } = req.params;
  await booksRepository.getBook(isbn).then(book => {
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send(response("Book not found.", true));
    }
  });
});

// update book
router.put("/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const newBook = { isbn, ...req.body };

  if (
    isbn.trim() === "" ||
    newBook.title.trim() === "" ||
    newBook.author.trim() === ""
  ) {
    res.status(400).send(response("Please give all required fields.", true));
    return;
  }

  await booksRepository
    .updateBook(isbn, newBook)
    .then(() => {
      res.status(200).send(response(`Book updated.`));
    })
    .catch(error => {
      res.status(error.statusCode).send(response(error.message, true));
    });
});

// delete book
router.delete("/:isbn", async (req, res) => {
  const { isbn } = req.params;

  await booksRepository
    .deleteBook(isbn)
    .then(() => {
      res.status(200).send(response(`Book removed.`));
    })
    .catch(error => {
      res.status(error.statusCode).send(response(error.message, true));
    });
});

module.exports = router;

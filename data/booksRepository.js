const { readFile, writeFile } = require("../helpers/helper");
const ApiError = require("../helpers/error");

const dataPath = "./data/books.json";

let books = [];

readFile(
  dataPath,
  data => {
    books = data.books;
  },
  true
);

const writeBooks = booksToSave => {
  const data = {
    books: booksToSave
  };

  return new Promise((resolve, reject) => {
    try {
      writeFile(dataPath, JSON.stringify(data, null, 2), () => {
        resolve();
      });
    } catch {
      reject();
    }
  });
};

const findBookIndex = isbn => {
  return books.findIndex(book => book.isbn === isbn);
};

const getBooks = () => {
  return new Promise(resolve => {
    resolve(books);
  });
};

const getBook = isbn => {
  return new Promise(resolve => {
    resolve(books.find(book => book.isbn === isbn));
  });
};

const insertBook = newBook => {
  return new Promise((resolve, reject) => {
    const newBooks = [...books];
    newBooks.push(newBook);

    writeBooks(newBooks)
      .then(() => {
        books.push(newBook);
        resolve();
      })
      .catch(() => reject(new ApiError(500, "Book coul not be created.")));
  });
};

const updateBook = (isbn, newBook) => {
  return new Promise((resolve, reject) => {
    const index = findBookIndex(isbn);

    if (index >= 0) {
      const newBooks = [...books];
      newBooks[index] = newBook;

      writeBooks(newBooks)
        .then(() => {
          books[index] = newBook;
          resolve();
        })
        .catch(() => reject(new ApiError(500, "Book could not be updated.")));
    } else {
      reject(new ApiError(404, "Book not found."));
    }
  });
};

const deleteBook = isbn => {
  return new Promise((resolve, reject) => {
    const index = findBookIndex(isbn);

    if (index >= 0) {
      const newBooks = books.filter(book => book.isbn !== isbn);

      writeBooks(newBooks)
        .then(() => {
          books.splice(index, 1);
          resolve();
        })
        .catch(() => reject(new ApiError(500, "Book could not be deleted.")));
    } else {
      reject(new ApiError(404, "Book not found."));
    }
  });
};

const removeBooks = () => {
  //   return new Promise((resolve, reject) => {
  //     writeBooks([])
  //       .then(() => {
  //         books = [];
  //       })
  //       .catch(() => reject(new ApiError(500, "Books could not be removed.")));
  //   });
  writeBooks([]);
  books = [];
};

module.exports = {
  getBooks,
  getBook,
  insertBook,
  updateBook,
  deleteBook,
  removeBooks
};

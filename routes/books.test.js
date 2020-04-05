const app = require("../app");
const request = require("supertest");
const booksRepository = require("../data/booksRepository");

const createBook = async (
  isbn = "123123",
  title = "Test Title",
  author = "Test Author"
) => {
  return request(app).post("/api/books").send({
    isbn: "123123",
    title: "Test Title",
    author: "Test Author"
  });
};

describe("/api/books", () => {
  describe("GET books", function () {
    it("should respond with 200", async done => {
      await request(app).get("/api/books").expect(200);
      done();
    });

    it("should return list of books", async () => {
      const response = await request(app).get("/api/books");

      expect(response.body).toBeDefined();
    });

    it("should return list of one element", async () => {
      await createBook();

      const response = await request(app).get("/api/books");
      const books = response.body;

      expect(books).toHaveLength(1);

      expect(books).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            isbn: "123123"
          })
        ])
      );
    });
  });

  describe("POST book", function () {
    it("should create a new book", async () => {
      const response = await createBook();

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Book Test Title created");
    });

    it("should not create a new book if already exists", async () => {
      await createBook();
      const response = await createBook();

      expect(response.status).toBe(409);
    });
  });

  describe("GET book", function () {
    it("should return book", async () => {
      await createBook();

      const response = await request(app).get("/api/books/123123");

      expect(response.status).toBe(200);
      expect(response.body.isbn).toEqual("123123");
      expect(response.body.title).toEqual("Test Title");
      expect(response.body.author).toEqual("Test Author");
    });

    it("should not return book if not exists", async () => {
      const response = await request(app).get("/api/books/123123");

      expect(response.status).toBe(404);
    });
  });

  describe("PUT book", function () {
    it("should update book", async () => {
      await createBook();

      const response = await request(app).put("/api/books/123123").send({
        isbn: "123123",
        title: "New Test Title",
        author: "New Test Author"
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Book updated.");
    });

    it("should not update book if not exists", async () => {
      const response = await request(app).put("/api/books/123123").send({
        isbn: "123123",
        title: "New Test Title",
        author: "New Test Author"
      });

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE book", function () {
    it("should delete book", async () => {
      await createBook();

      const response = await request(app).delete("/api/books/123123");

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Book removed.");
    });

    it("should not delete book if not exists", async () => {
      const response = await request(app).delete("/api/books/123123");

      expect(response.status).toBe(404);
    });
  });

  afterEach(() => {
    booksRepository.removeBooks();
  });
});

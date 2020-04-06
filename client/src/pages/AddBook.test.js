import {
  React,
  renderWithRouter,
  fireEvent,
  wait,
  cleanup
} from "../helpers/setupTests";
import AddBook from "./AddBook";

afterEach(cleanup);

describe("<AddBook />", () => {
  it("renders empty form", () => {
    const { queryByTestId } = renderWithRouter(<AddBook />);
    const isbn = queryByTestId(/isbn/i);
    const title = queryByTestId(/title/i);
    const author = queryByTestId(/author/i);

    expect(isbn).toBeInTheDocument();
    expect(isbn.textContent).toBe("");

    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("");

    expect(author).toBeInTheDocument();
    expect(author.textContent).toBe("");
  });

  it("should add new book", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            error: false,
            message: "Book Test Title created"
          })
      })
    );

    const { queryByTestId, getByText, getByTestId } = renderWithRouter(
      <AddBook />
    );
    const isbn = queryByTestId(/isbn/i);
    const title = queryByTestId(/title/i);
    const author = queryByTestId(/author/i);
    const addBookButton = queryByTestId(/add-book-button/i);

    fireEvent.change(isbn, { target: { value: "123123" } });
    fireEvent.change(title, { target: { value: "Test Title" } });
    fireEvent.change(author, { target: { value: "Test Author" } });
    fireEvent.click(addBookButton);

    await wait(() => getByTestId("success-message"));

    expect(getByText(/The book was added./i)).toBeVisible();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(isbn.value).toBe("");

    global.fetch.mockClear();
  });

  it("should add new book on server", async () => {
    const { queryByTestId, getByText } = renderWithRouter(<AddBook />);
    const isbn = queryByTestId(/isbn/i);
    const title = queryByTestId(/title/i);
    const author = queryByTestId(/author/i);
    const addBookButton = queryByTestId(/add-book-button/i);

    fireEvent.change(isbn, { target: { value: "123123" } });
    fireEvent.change(title, { target: { value: "Test Title" } });
    fireEvent.change(author, { target: { value: "Test Author" } });
    fireEvent.submit(addBookButton);

    await wait();
    expect(getByText(/The book was added./i)).toBeTruthy();
  });
});

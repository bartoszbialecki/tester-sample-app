import { MemoryRouter } from "react-router-dom";
import { App, Routes } from "./App";
import { React, render } from "./helpers/setupTests";

const renderWithMemoryRouter = (route = "/") => {
  const app = render(
    <MemoryRouter initialEntries={[route]}>
      <Routes />
    </MemoryRouter>
  );

  return app;
};

describe("<App />", () => {
  it("should render home page", async () => {
    const app = renderWithMemoryRouter();

    expect(app.getByText(/my collection of books/i)).toBeInTheDocument();
  });

  it("should render add new book page", async () => {
    const app = renderWithMemoryRouter("/new-book");

    expect(app.getByText(/add new book/i)).toBeInTheDocument();
  });
});

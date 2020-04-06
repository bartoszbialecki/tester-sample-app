import { React, renderWithRouter, fireEvent } from "../helpers/setupTests";

import Home from "./Home";

describe("<Home />", () => {
  it("renders empty list of books", () => {
    const { getByText } = renderWithRouter(<Home />);

    expect(getByText(/There are no books saved yet./i)).toBeVisible();
  });

  it("should navigate to add new book page", () => {
    const { container, getByTestId } = renderWithRouter(<Home />);

    fireEvent.click(getByTestId("add-book-button"));

    expect(container.innerHTML).toMatch("Add new book");
  });
});

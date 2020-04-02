import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders project home title", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/project home/i);
  expect(linkElement).toBeInTheDocument();
});

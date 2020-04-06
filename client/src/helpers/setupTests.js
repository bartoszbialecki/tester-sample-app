import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

// const renderWithRouter = component => {
//   const history = createMemoryHistory();
//   return {
//     ...render(<Router history={history}>{component}</Router>)
//   };
// };

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

module.exports = {
  React,
  render,
  fireEvent,
  cleanup,
  wait,
  Router,
  renderWithRouter
};

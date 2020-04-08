import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from "./assets/Books-Logo.png";
import "./App.css";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";

export const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/new-book" component={AddBook} />
      </Switch>
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;

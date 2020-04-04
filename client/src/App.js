import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from "./assets/Books-Logo.png";
import "./App.css";
import Home from "./pages/Home";
import BookForm from "./pages/BookForm";
import List from "./pages/List";

export default function App() {
  const MainApp = () => (
    <div className="ppp">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/new-book" component={BookForm} />
          <Route path="/list" component={List} />
        </Switch>
      </BrowserRouter>
    </div>
  );

  return <MainApp />;
}

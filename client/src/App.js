import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import List from "./pages/List";

export default function App() {
  const MainApp = () => (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />
        </Switch>
      </BrowserRouter>
    </div>
  );

  return <MainApp />;
}

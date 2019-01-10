import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Button } from "react-bootstrap";
import { NavBar } from "./NavBar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { Login } from "./Login";
import { Index } from "./Index";

class App extends Component {
  render() {
    return (
      <>
      <NavBar></NavBar>
      <Route path="/" exact Component={Index} />
      <Route path="/login/" exact Component={Login} />
      {/* <Route path="/users/" exact Component={Users} /> */}
      </>
    )
  }
}
export default hot(App);
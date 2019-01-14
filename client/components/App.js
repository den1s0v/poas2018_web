import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
// import { Button } from "react-bootstrap";
// import { NavBar } from "./NavBar";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// import 'bootstrap/dist/css/bootstrap.css'

// import { Login } from "./Login";
// import { Index } from "./Index";
import CheckLineList  from "./CheckLineList";

class App extends Component {
  render() {
    return (
      <>
      <CheckLineList />
      
      </>
    )
  }
}
export default hot(App);


/*
      <div className="container">
        <div className="jumbotron">
          Hello, {"Вася"}
        </div>
      </div>
      
      <NavBar></NavBar>
      
      <Route path="/" exact Component={Index} />
      <Route path="/login/" exact Component={Login} />
      <Route path="/users/" exact Component={Users} />


*/
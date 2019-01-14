import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Route, Link } from "react-router-dom"

export function NavBar(props) {
return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Header>
      <Navbar.Brand href="/">POAS Web</Navbar.Brand>
    </Navbar.Header>
    <Nav className="mr-auto">
      <Nav.Link>
        <Link to='/'>Home</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/login/'>Login</Link>
      </Nav.Link>
    </Nav>
    </Navbar>
  );
}
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export function NavBar(props) {
return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Navbar</Navbar.Brand>
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
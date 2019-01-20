import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Route, Link } from "react-router-dom"

export function NavBar(props) {
return (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand ><span style={{color:"#6df"}}
      // onMouseOver={()=>{this.style.backgroundColor='#53ea93'}}
      // onMouseOut= {()=>{this.style.backgroundColor=''}}
      >POAS Web</span></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link>
        <Link to='/'>Начало</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to='/login/'>Вход</Link>
      </Nav.Link>
    </Nav>
  </Navbar>
  );
}

/// 
/* --
    href="/"

  ! <Navbar.Header>
      <Navbar.Brand href="/">POAS Web</Navbar.Brand>
  ! </Navbar.Header>


 */
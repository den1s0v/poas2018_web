import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Route, Link } from "react-router-dom"
// import { Container, Row, Col } from "react-bootstrap";

import { Logo } from "./Logo";

export function NavBar(props) {
return (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand ><span style={{color:"#6df"}}
      // onMouseOver={()=>{this.style.backgroundColor='#53ea93'}}
      // onMouseOut= {()=>{this.style.backgroundColor=''}}
      >POAS Web</span></Navbar.Brand>
    <Logo />
    <span style={{"float":"right"}}>
      <Nav className="mr-auto">
        <Nav.Link>
          <Link to='/'>Начало</Link>
        </Nav.Link>
        <Nav.Link>
          {
            (localStorage.getItem("userToken") !== "null") ?
              (<Link to='/' onClick={props.logout} >Выйти</Link>)
            :
              (<Link to='/login/'>Вход</Link>)
          }
        </Nav.Link>
      </Nav>
    </span>
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
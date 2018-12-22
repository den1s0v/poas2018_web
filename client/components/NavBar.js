import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Xx } from "react-dom";

export function NavBar(props) {
	return (
			<NavBar bg="primary" variant="dark">
				<Nav>
					<Nav.Link><Link to='/' >Home</Link></Nav.Link>
				</Nav>
			</NavBar>
		)
}

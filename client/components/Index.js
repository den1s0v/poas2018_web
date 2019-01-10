import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

export function Index(props) {
	return (
			<NavBar bg="primary" variant="dark">
				<Nav>
					<Nav.Link>Home</Nav.Link>
				</Nav>
			</NavBar>
		)
}

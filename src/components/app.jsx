// import React from "react";
import React, { Component } from "react";
import { GoogleButton } from "./social-buttons/GoogleButton";

/* export default function App(props) { //  Capital names only: in React
  return (
	<div>
	  <h1>Regexp tester</h1>
	  <h1>{props.name}</h1>
	  <p>{props.description}</p>
	</div>
  ) // 1 element only
} */

export default class App extends Component {
	render() {
		return (
		<div>
			<h1>Regexp tester</h1>
			<GoogleButton />
		</div>
		) // 1 element only
	}
}


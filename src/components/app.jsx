import React from "react";

export default function App(props) { //  Capital names only: in React
  return (
	<div>
	  <h1>Regexp tester</h1>
	  <h1>{props.name}</h1>
	  <p>{props.description}</p>
	</div>
  ) // 1 element only
}
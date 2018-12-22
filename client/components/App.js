import React, { Component } from "react";
import { GoogleButton } from "./social-buttons/GoogleButton";
import { VkButton } from "./social-buttons/VkButton";
import { hot } from "react-hot-loader/root";
import { Button } from "react-bootstrap";
import { NavBar} from "./NavBar";

class App extends Component {
  render() {
    return (
      <Router>
				<NavBar></NavBar>
				<Route path='/' exact component={Index} />
        <h1>Regexp tester</h1>
        <input type="text"/>
        <GoogleButton />
        <VkButton />
        <Button size='lg' variant='danger' >Danger</Button>
      </Router>
    )
  }
}

export default hot(App);
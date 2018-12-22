import React, { Component } from "react";
import { GoogleButton } from "./social-buttons/GoogleButton";
import { VkButton } from "./social-buttons/VkButton";
import { hot } from "react-hot-loader/root";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Regexp tester</h1>
        <input type="text"/>
        <GoogleButton />
        <VkButton />
      </div>
    )
  }
}

export default hot(App);
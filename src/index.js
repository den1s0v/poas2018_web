//import { sayHello } from "./module.js";

import ReactDOM from "react-dom";
import React from "react";

import React from "react";


import styles from './index.css';
const name = 'Vasya';
const description = "very long description......";

ReactDOM.render(
  //~ <h1 className={styles.header)>Hello, {name}!</h1>,
  <App name={name} description={description} />,
  document.findElementById("root"); // our <div>
);

//console.log(sayHello("John"));



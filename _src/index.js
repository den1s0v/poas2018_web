// import { sayHello } from "./module";
import ReactDOM from "react-dom";
import React from "react";
import styles from "./index.css";
import App from "./components/App";

const name = 'Sample'
const description = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.Ducimus possimus facere quam ipsa nobis nulla quidem cum enim fugit, deserunt dolorum, esse, est magni quasi hic aut tenetur tempora inventore.'

ReactDOM.render(
  // <h1 className={styles.header}>Hello, {name}</h1>,
  <App name={name} description={description} />,
  document.getElementById('root')
)

// console.log(sayHello('John'));
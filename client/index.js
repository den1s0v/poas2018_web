import ReactDOM from "react-dom";
// import { Router, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import React, { Component } from "react";
import styles from "./index.scss";
import App from "./components/App";

ReactDOM.render(
      (<Router>
				<App />
      </Router>),
  document.getElementById('root')
)

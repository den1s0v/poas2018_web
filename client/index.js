import ReactDOM from "react-dom";
import React from "react";
import styles from "./index.scss";
import App from "./components/App";

ReactDOM.render(
      (<Router>
				<App />
      </Router>),
  document.getElementById('root')
)
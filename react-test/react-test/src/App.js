import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// функциональный компонент
function ComponentName(props) {
console.log(props);
  return (
    <div>
		Hello, {props.name} {props.surname}
    </div>
  )

}

// компонент-класс
class App extends Component {
  render() {
    return (
      <div className="App">
      <ComponentName name="Vasya" surname="Pupkin" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// функциональный компонент
function ComponentName(props) {
console.log(props);
  return (
    (props.show) ? (
    <div>
		Hello, {props.name}
		<br />
		  {props.info.surname}
		<br />
		{props.callback('Message')}
    </div>
  ) : null
  )

}

// компонент-класс
class App extends Component {
  render() {
    return (
      <div className="App">
      <ComponentName show name="Vasya" info={{surname:"Pupkin", adress:"Volg"}} callback={text => <small>{text}</small>} />
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

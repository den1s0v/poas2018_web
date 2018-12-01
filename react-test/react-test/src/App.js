import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
// стили
import 'bootstrap/dist/css/bootstrap.css'

// функциональный компонент
function UserInfo(props) {
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

// компонент-класс : может хранить состояние
class App extends Component {
  constructor(props) {
    super(props);
	
	this.state = {  // встроенная React-переменная
	  showUser: false
	}
	// workaround this.toggleUser call #1
	// this.toggleUser = this.toggleUser.bind(this)
  }

  // toggleUser() {
    // this.setState({showUser: !this.state.showUser});
  // }
  // workaround this.toggleUser call #2
  toggleUser = () => {
    this.setState({showUser: !this.state.showUser});
  }
  
  render() {
    return (
      <div className="App">
        <UserInfo show={this.state.showUser} name="Vasya" info={{surname:"Pupkin", adress:"Volg"}} callback={text => <small>{text}</small>} />
		State: {this.state.showUser + ''}
		<br />
		<Button onClick={ this.toggleUser } variant="pink" size="super-size">ToggleButton</Button>
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

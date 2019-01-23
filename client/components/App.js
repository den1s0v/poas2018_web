import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
// import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

// import 'bootstrap/dist/css/bootstrap.css'

import { NavBar } from "./NavBar";
import { LoginOrSignup } from "./LoginOrSignup";
import { Index } from "./Index";
import SamplePanel  from "./SamplePanel";

console.log('app begin');

import SampleData from '../../models/SampleData';
import makeCancelable from '../../services/make-promise-cancelable';



class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.onLogIn = this.onLogIn.bind(this);
    this.logout = this.logout.bind(this);
    
    this.state = {
      samples: null
    };
  }
  
	onLogIn() {
		// location.reload(true);
    alert('Logged in. \n'+localStorage.getItem("userToken"));
    
    this.setState({});
	}
  
	logout() {
		localStorage.setItem("userToken", "null");
		// location.reload(true);
    alert('Logged out. \n'+localStorage.getItem("userToken"));
    
    this.setState({});
	}

  render() {
    const samples = this.state.samples;
    console.log('component App render():', samples && samples.length || 0,'samples.');
    
    return (
      <>
        <Route path="/" component={ () => <NavBar logout={this.logout} />} />
        
        { /* Redirect! */
          (localStorage.getItem("userToken") === "null") ?
          <Route path="/" exact component={() => <Redirect from="/" to="/login" />} />
          : ''
        }
        <Route path="/login" exact component={ () => <LoginOrSignup onLogIn={this.onLogIn} />} />
        
        <Route path="/" exact component={Index} />

        <Route path="/quiz" exact component={ () => 
          <SamplePanel sample={ samples && samples[0] } isEdit={true} />
        } />
        
        {/* 
          show={true}
        <Index />
        < Route path="/user" component={ () => <Users show={true}/>} />
        {this.state.redirect && <Redirect to="/" />}
         */}
      </>
    )
  }
  
  componentDidMount() {
    console.log('component App DidMount');
    
    this.cancelableRecieve = makeCancelable( SampleData.fetchSamples() );
    this.cancelableRecieve.promise
      .then(samples => {
        console.log('component App setState():', samples.length,'samples.');
        
        this.setState({
          samples: samples
        })
      })
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
  }
  
  componentWillUnmount() {
    
    console.log('component App WillUnmount');
    if(this.cancelableRecieve) {
      this.cancelableRecieve.cancel();
    }
  }
}
export default hot(App);


/*
      <div className="container">
        <div className="jumbotron">
          Hello, {"Вася"}
        </div>
      </div>
      
      <NavBar></NavBar>
      
      <Route path="/" exact Component={Index} />
      <Route path="/login/" exact Component={Login} />
      <Route path="/users/" exact Component={Users} />


*/
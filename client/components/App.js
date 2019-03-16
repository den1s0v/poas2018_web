import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
// import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

// import 'bootstrap/dist/css/bootstrap.css'

import { NavBar } from "./NavBar";
import { LoginOrSignup } from "./LoginOrSignup";
import { Index } from "./Index";
import SamplePanel  from "./SamplePanel";
import { Hider } from "./Hider";

console.log('app begin');

import SampleData from '../../models/SampleData';



class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.onLogIn = this.onLogIn.bind(this); //привязать метод onLogIn к Конкретному Объекту this (т.е. именно к App)
    this.logout = this.logout.bind(this); //   для обеспечения возможности обращаться к корректному (Нужному) объекту this
    //это нужно потому, что метод (onLogIn, например) будет подаваться куда-то в качестве callback'a
    
    // this.state = {
      // samples: null
    // };
  }
  
  onLogIn(email) {
    // location.reload(true);
    // alert('Logged in. \n'+localStorage.getItem("userToken"));
    localStorage.setItem("userEmail", email);
    
    this.setState({});
  }
  
  logout() {
    localStorage.setItem("userToken", "null");
    // location.reload(true);
    // alert('Logged out. \n'+localStorage.getItem("userToken"));
    
    this.setState({});
  }

  render() {
    // const samples = this.state.samples;
    // console.log('component App render():', samples && samples.length || 0,'samples.');
    
    return (
      <>
      {/* <Route path="/" component={ () => <NavBar logout={this.logout} />} />   */}
        
        <Route path="/" component={ 
            () => <Hider component={ 
                () => <NavBar logout={this.logout} />
            } animationType="Collapse" />
        } />

        { /* Redirect! */
          (localStorage.getItem("userToken") === "null") ?
          <Route exact path="/" component={() => <Redirect from="/" to="/login" />} />
          : ''
        }
        <Route exact path="/login" component={ () => <LoginOrSignup onLogIn={this.onLogIn} />} />
        
        <Route exact path="/" component={ () => <Index logout={this.logout} />} />

        {/* 
        <Route path="/quiz" exact component={ () => 
          <SamplePanel sample={ samples && samples[0] } isEdit={true} />
        } />
        
          show={true}
        <Index />
        < Route path="/user" component={ () => <Users show={true}/>} />
        {this.state.redirect && <Redirect to="/" />}
         */}
      </>
    )
  }
  
}
export default hot(App);  // hot() требуется только корневому компоненту (к другим компонентам его нельзя применять. Также нельзя оставлять `import {hot} ...` в других файлах)


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
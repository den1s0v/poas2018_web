import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
// import { Button } from "react-bootstrap";
// import { NavBar } from "./NavBar";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// import 'bootstrap/dist/css/bootstrap.css'

// import { Login } from "./Login";
// import { Index } from "./Index";
import CheckLineList  from "./CheckLineList";

console.log('index begin');

const SampleData = require('../../models/SampleData');
const makeCancelable = require('../../services/make-promise-cancelable');



class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      samples: null
    };
  }
  render() {
    // read props
    const {
      samples,
    } = this.state;
    console.log('component App render():', samples && samples.length || 0,'samples.');
    
    return (
      <>
      <CheckLineList cases={ samples && samples[0].obj.cases || [] } />
      < Route path="/" exact componet={Home} />
      < Route path="/user" componet={ () => <Users show={true}/>} />
      < Route path="/user" componet={ () => <Users2 show={true}/>} />
			{this.state.redirect && <Redirect to="/" />}
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
    if(this.cancelableRecieve)
      this.cancelableRecieve.cancel();
    
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
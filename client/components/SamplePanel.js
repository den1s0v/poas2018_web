import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
// import { Button } from "react-bootstrap";

import CheckLineList  from "./CheckLineList";

// const SampleData = require('../../models/SampleData');
// const makeCancelable = require('../../services/make-promise-cancelable');



class SamplePanel extends Component {
  constructor(props, context) {
    super(props, context);

    this.onCaseChanged = this.onCaseChanged.bind(this);
    this.state = {
      sample: props.sample
    };
    console.log('component SamplePanel created:', this.state.sample);
    
    
  }

  onCaseChanged(new_value, case_index) {
    console.log('component SamplePanel onCaseChanged():', new_value);
    // set new value !
    const sample = this.state.sample;
    sample.obj.cases[case_index].setStr(new_value);
    // update state & all children
    this.setState({sample});
  }

  componentWillReceiveProps(new_props) {
    
    console.log('component SamplePanel WillRecieveProps:',{new_props});
    if(this.state.sample !== new_props.sample) {
      console.log('component SamplePanel WillRecieveProps:','will update!');
      this.setState({sample:new_props.sample});
    }
  }

  render() {
    const sample = this.state.sample;

    // console.log('component SamplePanel render():', {sample, cases:sample ? sample.obj.cases : [] });
    
    return (
      <>
        <CheckLineList
          cases={ sample ? sample.obj.cases : [] }
          isEdit={this.props.isEdit}
          onCaseChanged={this.onCaseChanged}
        />
      </>
    )
  }
}
export default hot(SamplePanel);


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
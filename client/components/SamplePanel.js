import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
// import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";

import CheckLineList  from "./CheckLineList";
import RegexpInput  from "./RegexpInput";

// const SampleData = require('../../models/SampleData');
// const makeCancelable = require('../../services/make-promise-cancelable');



class SamplePanel extends Component {
  constructor(props, context) {
    super(props, context);

    this.onCaseChanged = this.onCaseChanged.bind(this);
    this.onSampleChanged = this.onSampleChanged.bind(this);
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

  onSampleChanged(new_value, mode = 'regex') {
    console.log('component SamplePanel onSampleChanged():', new_value);
    if(['regex','title'].includes(mode)) {
      // set new value !
      const sample = this.state.sample;
      sample.obj[mode] = new_value;
      if(this.props.isEdit) {
        sample.dbObj[mode] = new_value;
      }
      // update state & all children
      this.setState({sample});
    }
  }

  componentWillReceiveProps(new_props) {
    
    // console.log('component SamplePanel WillRecieveProps:',{new_props});
    if(this.state.sample !== new_props.sample) {
      console.log('component SamplePanel WillRecieveProps:','will update!');
      this.setState({sample:new_props.sample});
    }
  }

  render() {
    const sample = this.state.sample;
    
    let solved, progress_percent;
    if(sample && !this.props.isEdit) {
      solved = sample.getSolvedCount();
      progress_percent = solved / (sample.obj.cases.length || 1);
      // console.log('component SamplePanel render():', {solved, progress_percent });
      if(progress_percent === 1.0) {
        // !! User Solved this sample !!
        console.log('component SamplePanel render():', "User Solved this sample !!");
      }
    }
    // console.log('component SamplePanel render():', {sample, cases:sample ? sample.obj.cases : [] });
    // <small> </small>
    return (
      <>
        <center><h4>
          {sample && sample.obj.title} &nbsp;
          <sub><Badge variant="info">{this.props.isEdit? "Правка" : "Тест"}</Badge></sub>
        </h4></center>
        
        <RegexpInput
          isEdit={this.props.isEdit}
          title={sample ? sample.obj.title : 'Please wait...'}
          regex={sample ? sample.obj.regex : 'waiting for data...'}
          onChange={this.onSampleChanged}
        />
        {
          !this.props.isEdit ?
          (<i>Подберите такое регулярное выражение, чтобы тестовые строки <b>правильно</b> совпадали/<u>не</u> совпадали</i>)
          : ''
        }
        {
          sample && !this.props.isEdit ? 
          // [
          (<ProgressBar striped variant="success" now={100*progress_percent} label={`${solved} решено`} />)
            // /* , (<br />) */]
          : ''
        }
        
       
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
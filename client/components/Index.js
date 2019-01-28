import React, { Component } from "react";
// import { Badge } from "react-bootstrap";

import { SampleList } from "./SampleList";
import SamplePanel  from "./SamplePanel";

import makeCancelable from '../../services/make-promise-cancelable';
import SampleData from '../../models/SampleData';


export class Index extends Component {
  constructor(props, context) {
    super(props, context);

    // this.onLogIn = this.onLogIn.bind(this);
    // this.logout = this.logout.bind(this);
    
    this.state = {
      // samples arrays
      quiz: null,
        my: null,
      done: null,
    };
  }

  render() {
    console.log('component Index render()',this.state)
    return (
    <>
      <SampleList title={"Нерешенные задачи"} samples={this.state.quiz} />
      <SampleList title={"Мои задачи"}        samples={this.state.my  } />
      <SampleList title={"Решенные задачи"}   samples={this.state.done} />
    </>
    );
  }
  
  componentDidMount() {
    // console.log('component Index DidMount');
    
    this.cancelableRecieve = {};
    
    for (const _key in this.state) {
      const key = _key;
      this.cancelableRecieve[key] = makeCancelable( SampleData.fetchSamples(key) );
      this.cancelableRecieve[key].promise
        .then(samples => {
          this.setState({
            [key]:samples
          })
          console.log('component Index, Mode "'+key+'":', samples.length,'samples.');
        })
        .catch((reason) => {
          if(reason.props && ! reason.props.auth)
          {
            this.props.logout();
          }
          console.log(reason, 'isCanceled', reason.isCanceled)
        });
    }
  }
  
  componentWillUnmount() {
    console.log('component Index WillUnmount');
    if(this.cancelableRecieve) {
      for (let key in this.cancelableRecieve) {
         this.cancelableRecieve[key].cancel();
      }
    }
  }
}

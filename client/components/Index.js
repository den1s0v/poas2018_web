import React, { Component } from "react";
// import { Badge } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import { SampleList } from "./SampleList";
import SamplePanel  from "./SamplePanel";

import makeCancelable from '../../services/make-promise-cancelable';
import SampleData from '../../models/SampleData';

const samples_options = {
      quiz: {active: true , title:"Нерешенные задачи"},
        my: {active: false, title:"Мои задачи", newEnabled:true},
      done: {active: false, title:"Решенные задачи"},
    };

export class Index extends Component {
  constructor(props, context) {
    super(props, context);

    this.setCurrentOrNull = this.setCurrentOrNull.bind(this);
    this.goToList = this.goToList.bind(this);
    this.newSample = this.newSample.bind(this);
    this.saveNewSample = this.saveNewSample.bind(this);
    
    this.state = {
      // samples arrays
      quiz: null,
        my: null,
      done: null,
      // current shown sample
      current_sample: null,
    };
  }
  
	setCurrentOrNull(sample) {
    this.setState({
      current_sample: sample,
    });
  }

	goToList() {
    this.setCurrentOrNull(null);
  }

	newSample() {
    let new_sample = SampleData.SampleData.template();
    // // find one existing
    // const all_samples = [...this.state[quiz],...this.state[my],...this.state[done],];
    console.log(new_sample);
    
    this.setCurrentOrNull(new_sample);
  }

	saveNewSample() {
    // this.setCurrentOrNull(null);
    this.state.current_sample.sendNew();
    this.goToList();
  }

  /* 
      Current : {this.state.current_sample.obj.title}
  */  
  
  render() {
    console.log('component Index render()',this.state)

    // подготовить содержимое списков для трёх панелей
    const panels = this.state.current_sample
    ? 
      null
    :
      Object.keys(samples_options).map(key => 
        <SampleList
          key={samples_options[key].title}
          title={samples_options[key].title}
          active={samples_options[key].active}
          samples={this.state[key]}
          onChoose={this.setCurrentOrNull}
          inHeaderComponent={
            (! samples_options[key].newEnabled || ! this.state[key]) // опции или семплов нет 
            ? null
            : 
              <span>
                <Button variant="outline-success" 
                    onClick={this.newSample}
                  >+ Создать…</Button>
              </span>
          }
        />
      );
      //  style={{float:"auto"}} 

    return this.state.current_sample ? 
    (
      <>
        <div style={{float:"left"}} >
          <Button variant="outline-info" 
              onClick={this.goToList}
            >&lt; Назад</Button>
        </div>
          
        <SamplePanel sample={ this.state.current_sample } isEdit={true} />
      </>
    )
    :
    (
      <Container>
        <Row>
          <Col md={{span:10, offset:1}}>
            {panels[0]}
          </Col>
        </Row>
        <Row>
          <Col md={{span:5, offset:1}}>
            {panels[1]}
          </Col>
          <Col md={{span:5, offset:0}}>
            {panels[2]}
          </Col>
        </Row>
      </Container>
    );
  }
  
  componentDidMount() {
    // console.log('component Index DidMount');
    
    this.cancelableRecieve = {};
    
    for (const _key in samples_options) {
      const key = _key;
      this.cancelableRecieve[key] = makeCancelable( SampleData.fetchSamples(key) );
      this.cancelableRecieve[key].promise
        .then(samples => {
          this.setState({
            [key]:samples
          })
          console.log('component Index: "'+key+'"', samples.length,'samples.');
        })
        .catch((reason) => {
          if(reason.props && ! reason.props.auth)
          { // ошибка авторизации!
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

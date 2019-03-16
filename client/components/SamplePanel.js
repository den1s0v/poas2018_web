import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import CheckLineList  from "./CheckLineList";
import RegexpInput  from "./RegexpInput";


class SamplePanel extends Component {
  constructor(props, context) {
    super(props, context);

    this.onCaseChanged = this.onCaseChanged.bind(this);
    this.onCaseAddRemove = this.onCaseAddRemove.bind(this);
    this.onSampleChanged = this.onSampleChanged.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
    
    let sample = props.sample;
    if(sample && !props.isEdit) {
      // Обнулить регулярное выражение, которое мы хотим получить от пользователя
      sample.obj.regex = '';
    }
    
    this.state = {
      sample: sample,
      button_blocked: false
    };
  }

  onCaseChanged(new_value, case_index) {
    // console.log('component SamplePanel onCaseChanged():', new_value);
    // set new value !
    const sample = this.state.sample;
    sample.obj.cases[case_index].setStr(new_value);
    // update state & all children
    this.setState({sample});
  }

  onCaseAddRemove(mode, case_index) {
    if(mode === 'insert') {
      // insert next to current case ...
      const sample = this.state.sample;
      // insert one
      sample.addOne('new-test-case', case_index + 1);
      // update
      this.setState({sample});
      return;
    }
    if(mode === 'remove') {
      // remove current case ...
      const sample = this.state.sample;
      // remove one
      sample.removeOne( case_index );
      // update
      this.setState({sample});
      return;
    }
    console.log('component SamplePanel onCaseAddRemove(): unknown mode:', {mode, case_index});
  }

  onSampleChanged(new_value, mode = 'regex') {
    // // console.log('component SamplePanel onSampleChanged():', new_value);
    if(['regex','title'].includes(mode)) {
      // set new value !
      const sample = this.state.sample;
      sample.obj[mode] = new_value;
      if(this.props.isEdit) {
        sample.dbObj[mode] = new_value;
      }
      // update state & all children
      this.setState({sample});
      
      // // // debugging send to server
      // // sample.sendChanges();
    }
  }

  onSaveNew() {
    if(this.state.sample) {
      // avoid double-clicking
      this.setState({button_blocked:true});
      // setTimeout(()=>this.setState({button_blocked:false}) , 1000);
      
			(this.props.isExist ?
					this.state.sample.sendChanges()
				: this.state.sample.sendNew()
			)
      .then(() => this.props.onNewSampleSaved && this.props.onNewSampleSaved())
      .catch((reason) => {
        if(reason.error)
        { // ошибка сохранения!
          alert('Ошибка!\nЗадача не была сохранена по следующей причине:\n'+reason.error+'\n\nЗамечание. Название задачи должно быть уникальным среди всех пользователей.');
        }
        console.log("onSaveNew():", reason.error);
        
        // reset blocking
        this.setState({button_blocked:false});
      });
    }
    else {
      // fetch('/test', {
        // method: 'GET',
      // }).then(response => response.json()).then(status => {
        // // /* console.log */ alert(JSON.stringify(status, null, 2));
      // })
      
      // // return to list
      // // .then(() => this.props.onNewSampleSaved && this.props.onNewSampleSaved());	
    }
  }

  onSolved() {
    this.state.sample.sendSolved()
      .then(() => this.props.onNewSampleSaved && this.props.onNewSampleSaved())
      .catch(err => console.log("onSolved():", err));
    
    // Выдать сообщение
    alert(`Вы решили эту задачу!\nНазвание: ${ this.state.sample.obj.title}\nВаш ответ: ${ this.state.sample.obj.regex}\nИзначальное RegExp: ${ this.state.sample.dbObj.regex}`);
  }

  componentWillReceiveProps(new_props) {
    
    // console.log('component SamplePanel WillRecieveProps:',{new_props});
    if(this.state.sample !== new_props.sample) {
      console.log('component SamplePanel WillRecieveProps:','will update!');
      let sample = new_props.sample;
      if(sample && !new_props.isEdit) {
        // Обнулить регулярное выражение, которое мы хотим получить от пользователя
        sample.obj.regex = '';
      }
      
      this.setState({
        sample: sample
      });
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
        this.onSolved();
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
        
			<Container>
        <RegexpInput
          isEdit={this.props.isEdit}
          title={sample ? sample.obj.title : 'Please wait...'}
          regex={sample ? sample.obj.regex : 'waiting for data...'}
          onChange={this.onSampleChanged}
        />
				<Row>
        <Col md={{span:10, offset:1}}>
        {
          !this.props.isEdit ?
          (<i><p/>Подберите такое регулярное выражение, чтобы тестовые строки <b>правильно</b> совпадали/<u>не</u> совпадали</i>)
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
          onCaseAddRemove={this.onCaseAddRemove}
        />
        {
          this.props.isEdit ?
          (<Button variant="success" 
            onClick={this.onSaveNew}
            disabled={ !sample || this.state.button_blocked }
            >Сохранить и завершить редактирование
          </Button>)
          : ''
        }
        </Col>
        </Row>
			</Container>
      </>
    )
  }
}
export default SamplePanel;


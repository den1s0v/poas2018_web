import React, { Component } from "react";
import { hot } from "react-hot-loader/root";

import { InputGroup, Form, FormControl, Row, Col } from "react-bootstrap";

import { Badge } from "react-bootstrap";

class RegexpInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onRegexChanged = this.onRegexChanged.bind(this);
    this.state = {
      error_msg: '',
      errorneous_pattern: null,
    };
  }
  
  verifyRegex(re_pattern) {
    try {
      new RegExp(re_pattern);
      // OK
      return {ok:true, msg:''};
    } catch(e) {
      // ERR
      return {ok:false, msg:e.toString()};
    }
  }


  onTitleChanged(event) {
    // console.log('component RegexpInput onTitleChanged():', event.target.value);
    this.props.onChange(event.target.value, 'title');
  }
  onRegexChanged(event) {
    const pattern = event.target.value;
    const {ok, msg} = this.verifyRegex(pattern);
    const new_errorneous_pattern = ok? null : pattern;
    if(msg !== this.state.error_msg || new_errorneous_pattern !== this.state.errorneous_pattern) {
      this.setState({
        error_msg:msg,
        errorneous_pattern: new_errorneous_pattern,
      });
    }
    if(ok) {
      this.props.onChange(pattern, 'regex');
    }
    // console.log('component RegexpInput onRegexChanged():', pattern, {ok, msg});
  }

  render() {
    // console.log('component RegexpInput render().');
    const isError = this.state.error_msg !== '';
      
    return (
      <Form className="re_input" className={isError?"re_error":""}>
        {
          this.props.isEdit ?
          (<Form.Group as={Row} controlId="formGridTitle">
            <Form.Label column sm={2}>
              Название
            </Form.Label>
            <Col sm={10}>
              <Form.Control value={this.props.title} placeholder="Название задачи"
                onChange={this.onTitleChanged}
              />
            </Col>
          </Form.Group>)
          : ''
        }

        {
          isError ?
            <Badge variant="danger">
              <center><h5>{this.state.error_msg}</h5></center>
            </Badge>
          : ''
        }
        <Form.Group as={Row} controlId="formGridPattern">
          <Form.Label column sm={2}>
            Рег. выражение
          </Form.Label>
          <Col sm={10}>
            <Form.Control value={this.state.errorneous_pattern || this.props.regex} placeholder="Шаблон регулярного выражения"
              onChange={this.onRegexChanged}
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    )
  }
  
  /* 
      <div className="re_input">
      </div>
  */
}
export default hot(RegexpInput);

/*
              <CheckLine {...{isEdit:true,  isOkMatch:true, str:'абвгдiш', mustMatch:true, listIndex:0}} />
              <CheckLine {...{isEdit:false, isOkMatch:false,   mustMatch:false, listIndex:1}} />


        <div style={{"class":"progress"}}>
          <div style={{"class":"progress-bar bg-success", role:"progressbar", style:"width: 25%", "ariaValuenow":"25", "ariaValuemin":"0", "ariaValuemax":"100"}}>25%</div>
        </div>


      {/* <Route path="/users/" exact Component={Users} />
      <table className="container">
        <div className="jumbotron">
          Hello, {"Вася"}
        </div>
      </table> 
       striped bordered condensed hover * /}


       <Table>
        <thead>
          <tr>
            <th>?</th>
            <th>String</th>
            <th>Match</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+</td>
            <td>Otto</td>
            <td>Match</td>
          </tr>
          <tr>
            <td>-</td>
            <td>Thornton</td>
            <td>Not match</td>
          </tr>
        </tbody>
      </Table>

*/
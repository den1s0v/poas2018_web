import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Form from 'react-bootstrap/lib/Form';
import { Button, FormControl } from "react-bootstrap";

class CaseInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleButton = this.handleButton.bind(this);

    this.state = {
      case_line: props.case_line
    };
  }
  
  handleButton(isOk) {
    console.log(`component CaseInput: handleButton(${isOk})`);

    if(isOk) {
      let new_state = Object.assign({}, this.state);
      new_state.case_line.str = "new value...";
      this.setState(new_state);
    } else {
      // Отменить
      // just re-render
      this.setState(this.state);
    }
    console.log('component CaseInput: new case_line: ', this.state.case_line);
  }

  render() {
    // read props
    const {
      // case_line,
      // isEdit // = false
    } = this.props;
    console.log('component CaseInput render(). case_line: ', this.state.case_line);
      
    let i = 0;
      
    return (
      <>
        <InputGroup size='sm'>
          <FormControl
            placeholder="Проверочная строка"
            aria-label="Проверочная строка (2)"
            aria-describedby="basic-addon2"
            defaultValue={this.state.case_line.str}
          />
          <InputGroup.Append>
            <Button variant="outline-success" onClick={() => this.handleButton(true)}
              >OK</Button>
            <Button variant="outline-secondary" onClick={() => this.handleButton(false)}
              >Сбросить</Button>
          </InputGroup.Append>
        </InputGroup>      
      </>
    )
  }
}
export default hot(CaseInput);

/*
      
        // <ProgressBar striped variant="success" now={10*cases.length} label={`${1*cases.length} шт`} />
        // <br />


*/
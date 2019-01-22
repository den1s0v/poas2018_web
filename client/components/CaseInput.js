import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Form from 'react-bootstrap/lib/Form';
import { Button, FormControl } from "react-bootstrap";

class CaseInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.onStrChange = this.onStrChange.bind(this);
    this.onUpdate = props.onUpdate || ((v)=>console.log(`No onUpdate callback specified for ${"CaseInput"} ! New value: ${v}`));
    this.onUpdate = this.onUpdate.bind(this);
    
    this.input = React.createRef(); // `uncontrolled` style of using child component

    // this.state = { case_line: props.case_line }; // lift the state up
  }
  
  onStrChange() {
      // (event) => console.log('FormControl onChange:',event.target.value)
      // ^ `controlled` style of using child component ^
    const new_value = this.input.current.value; // get value from `uncontrolled` component
    console.log('FormControl onStrChange:',new_value);
    // set new value !?
    // this.props.case_line.str = new_value;
    // fire update
    this.onUpdate(new_value);
  }
  
  render() {
    // read props
    const {
      // case_line,
      // isEdit // = false
    } = this.props;
    // console.log('component CaseInput render(). case_line: ', this.props.case_line);
      
    let i = 0;
    /* 
            value={this.props.case_line.str}

            onKeyUp={(...param) => console.log('FormControl onKeyUp:',param)}
            buttonAfter={(...param) => console.log('FormControl buttonAfter:',param)}

          <InputGroup.Append>
            <Button variant="outline-success" onClick={() => this.handleButton(true)}
              >OK</Button>
            <Button type="submit" variant="outline-secondary" onClick={() => this.handleButton(false)}
              >Сбросить</Button>
          </InputGroup.Append>
    */
    return (
      <>
        <InputGroup size='sm'>
          <FormControl
            placeholder="Проверочная строка"
            aria-label="Проверочная строка (2)"
            aria-describedby="basic-addon2"
            defaultValue={this.props.case_line.str()}
            onChange={this.onStrChange}
            ref={this.input}
          />
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
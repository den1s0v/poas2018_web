import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Button } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

// import { NavBar } from "./NavBar";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// import 'bootstrap/dist/css/bootstrap.css'

// import { Login } from "./Login";
// import { Index } from "./Index";

class ToggleButtonGroupControlled extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: 1
    };
  }

  handleChange(e) {
    console.log('radio changed:',e);
    this.setState({ value: e });
  }

  render() {
    // read props
    const {
      buttons,
      listIndex,
      } = this.props;
    return (
      <ToggleButtonGroup
        key={listIndex}
        name={`radio-${listIndex}`}
        type="radio"
        value={this.state.value}
        onChange={this.handleChange}
      >
      {buttons.map( (btn) => {
        return <ToggleButton key={btn.index} value={btn.index} variant={(btn.index===this.state.value?'':"outline-")+btn.style}>
          {btn.index===this.state.value? <u><b>{btn.name}</b></u> : <i>{btn.name}</i>}
        </ToggleButton>
      })}
      </ToggleButtonGroup>
    );
  }
}


function renderMatchSwitch(mode, listIndex) {
  
  const i = [true, null, false].indexOf(mode);
  const mode_names = ["Совпадает","Авто","Не совпадает"];
  const mode_styles = ['success', 'warning', 'danger']; // ['success', 'danger', 'default'];

  let btns = [];
  [0,1,2].forEach( (item, index) => {
    btns.push({
      index,
      name: mode_names[index],
      style: mode_styles[index],
    });
  })
  
  return (
    <ToggleButtonGroupControlled buttons={btns} listIndex={listIndex} value={i} />
  );
}

/*
    <div className="btn-group">
      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">Действие <span className="caret"></span></button>
      <ul className="dropdown-menu" role="menu">
        <li><a href="#">Действие</a></li>
        <li><a href="#">Другое действие</a></li>
        <li><a href="#">Что-то иное</a></li>
        <li className="divider"></li>
        <li><a href="#">Отдельная ссылка</a></li>
      </ul>
    </div>

    <div className="dropdown">
      <button className={`btn btn-${mode_styles[i]} dropdown-toggle`} type="button" id={`match-switch-${listIndex}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {mode_names[i]}
      </button>
      <div className="dropdown-menu" aria-labelledby={`match-switch-${listIndex}`}>
        <a className="dropdown-item" href="#">{mode_names[0]}</a>
        <a className="dropdown-item" href="#">{mode_names[1]} action</a>
        <a className="dropdown-item" href="#">{mode_names[2]}</a>
      </div>
    </div>


    <DropdownButton
      bsStyle={mode_styles[i]}
      title={mode_names[i]}
      key={listIndex}
      id={`match-switch-${listIndex}`}
    >
      <MenuItem eventKey="1" active={0===i}>{mode_names[0]}</MenuItem>
      <MenuItem eventKey="2" active={1===i}>{mode_names[1]}</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="3" active={2===i}>{mode_names[2]}</MenuItem>
    </DropdownButton>

*/
// const buttonsInstance = (
  // <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
// );

class CheckLine extends Component {
  render() {
    // read props
    const {
      isEdit,
      isOkMatch=undefined, 
      str,
      mustMatch = true,
      listIndex = 0,
      } = this.props;
      
    const isOk = isOkMatch===undefined? <b>???</b> : ( isOkMatch? (<>OK</>) : <b><i>Fail</i></b> );
    const row_class = isOkMatch===undefined? "default" : ( isOkMatch? "success" : "danger" );
    return (
      <tr className={"table-"+row_class}>
        <td>{isOk}</td>
        <td>
          <label>{str || (<i>= no text specified= </i>)}</label>
          { str ? <span style={{"float":"right"}}>Длина: {str.length}</span> : "" }
        </td>
        <td>
          { renderMatchSwitch(mustMatch, listIndex) }
        </td>
        <td>
          { isEdit && <Button variant="outline-danger"><big>x</big></Button> }
        </td>
      </tr>
    )
  }
}
export default hot(CheckLine);

/*

      // <NavBar></NavBar>
      {/* 
      <Route path="/" exact Component={Index} />
      <Route path="/login/" exact Component={Login} />

      {/* <Route path="/users/" exact Component={Users} /> * /}
      <div className="container">
        <div className="jumbotron">
          Hello, {"Вася"}
        </div>
      </div>

*/
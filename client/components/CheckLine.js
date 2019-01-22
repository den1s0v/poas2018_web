import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Button } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import { renderMatchSwitch } from "./MatchSwitchIndicator";

import CaseInput from "./CaseInput";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// import 'bootstrap/dist/css/bootstrap.css'
// import { Login } from "./Login";
// import { Index } from "./Index";


class CheckLine extends Component {
  render() {
    // read props
    const {
      isEdit,
      case_line,
      onCaseChanged,
      onCaseAddRemove,
      listIndex,
      key,
    } = this.props;
    
    const str = case_line.str();
    
    // match: re.test(this.str),
    // db_match: db_re.test(this.str),
    const {match, db_match} = case_line.test();

    /// / const listIndex = key || 0;
    const isOkMatch = db_match === match;
    const mustMatch = match;
    
    // console.log('component CheckLine render():str',str,'of', str && str.length,'chars.');
    
    const fail_text = () => {
      if(isEdit) return "Wrong";
      const spells = ['Нет','Не так','Неверно','Плохо','Нет же','Не то'];
      return spells[Math.floor(Math.random() * spells.length)];
    };
    
    const isOk = isOkMatch===undefined? <b>???</b> : ( isOkMatch? (<>OK</>) : <b><i>{fail_text()}</i></b> );
    const row_class = isOkMatch===undefined? "default" : ( isOkMatch? "success" : "danger" );

    // console.log('component CheckLine render():debug.',{str,isOkMatch,mustMatch,listIndex,isEdit});

    // wrap callback
    const onChangeHandler = (new_value) => onCaseChanged(new_value,listIndex);
    
    return (
      <tr className={"table-"+row_class} /* key={listIndex} */>
        <td>{isOk}</td>
        <td>
          {
            isEdit ?
            <CaseInput case_line={case_line} onUpdate={onChangeHandler} />
            :
            <tt>{str? (<big>{"“"+str+"”"}</big>) : (<i>= no text specified =</i>)}</tt>
          }
          { str ? <span style={{"float":"right"}}>Длина '{str}': {str.length}</span> : "" }
        </td>
        <td>
          { renderMatchSwitch(mustMatch, listIndex, isEdit) }
        </td>
        {isEdit ? (
          <td>
            {  // Запрещаем удалять, если всего 2 пункта (позитивн. + негативн. тесты)
              case_line.editable_sample.cases.length > 2 ?
              (<Button variant="outline-danger"
                onClick={()=>onCaseAddRemove('remove',listIndex)}
              ><b><big>x</big></b></Button>)
              : ''
            }
            <Button variant="outline-success"
              onClick={()=>onCaseAddRemove('insert',listIndex)}
            ><b><big>+</big></b></Button>
          </td>
        ) : ''}
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
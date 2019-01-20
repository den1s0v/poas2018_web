import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Button } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import { renderMatchSwitch } from "./MatchSwitchIndicator";

// import { NavBar } from "./NavBar";
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
      key,
    } = this.props;
    const {
      str,
    } = case_line;
    
    // match: re.test(this.str),
    // db_match: db_re.test(this.str),
    const {match, db_match} = case_line.test();

    const listIndex = key || 0;
    const isOkMatch = db_match === match;
    const mustMatch = match;
    
    console.log('component CheckLine render():str',str,'of', str && str.length,'chars.');
      
    const isOk = isOkMatch===undefined? <b>???</b> : ( isOkMatch? (<>OK</>) : <b><i>Fail</i></b> );
    const row_class = isOkMatch===undefined? "default" : ( isOkMatch? "success" : "danger" );

    // // console.log('component CheckLine render():debug.',{isOkMatch,mustMatch,listIndex,isEdit});

    return (
      <tr className={"table-"+row_class} /* key={listIndex} */>
        <td>{isOk}</td>
        <td>
          <tt>{str? (<big>{"“"+str+"”"}</big>) : (<i>= no text specified =</i>)}</tt>
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
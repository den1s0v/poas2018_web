import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Table, ProgressBar } from "react-bootstrap";

// import 'bootstrap/dist/css/bootstrap.css'
import CheckLine  from "./CheckLine";

class CheckLineList extends Component {
  constructor(props, context) {
    super(props, context);

    // this.onCaseChanged = this.onCaseChanged.bind(this);

    // this.state = {
      // cases: props.cases
    // };
  }

/*   onCaseChanged(new_value, case_index) {
    console.log('component CheckLineList onCaseChanged():', new_value);
    // set new value !?
    case_line.str = new_value;
    // fire update ?
    // this.onUpdate(onUpdate, this.props.case_line);
    
    // update all children
    this.setState({});
  } */

  render() {
    // read props
    const {
      cases,
      onCaseChanged,
      isEdit, // = false
    } = this.props;
    // const cases = this.state.cases;
    console.log('component CheckLineList render():', cases && cases.length,'cases.');
    
    let i = 0;
      
    return (
      <>
        <ProgressBar striped variant="success" now={10*cases.length} label={`${1*cases.length} шт`} />
        <br />

        <Table striped hover size="sm">
          <thead>
            <tr>
              <th>\</th>
              <th>Проверочная строка</th>
              <th>Совпадение</th>
            </tr>
          </thead>
          <tbody>
            { cases.map(case_line => ( 
                <CheckLine {...{
                  isEdit, 
                  listIndex:i, //  as listIndex 
                  key:(i+=1,i), // !! bad key.
                  case_line,
                  onCaseChanged,
                }} /> 
              ))
            }
          </tbody>
        </Table>
      </>
    )
  }
}
export default hot(CheckLineList);

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
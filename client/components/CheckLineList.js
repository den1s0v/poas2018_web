import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Table, ProgressBar } from "react-bootstrap";

// import 'bootstrap/dist/css/bootstrap.css'
import CheckLine  from "./CheckLine";

class CheckLineList extends Component {
  constructor(props, context) {
    super(props, context);

    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      cases: props.cases
    };
  }

  render() {
    // read props
    const {
      cases,
      isEdit // = false
    } = this.props;
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
                  key:(i+=1,i), //  as listIndex 
                  case_line
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
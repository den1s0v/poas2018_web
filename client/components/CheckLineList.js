import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import { Table, ProgressBar } from "react-bootstrap";

// import 'bootstrap/dist/css/bootstrap.css'
import CheckLine  from "./CheckLine";

class CheckLineList extends Component {
  render() {
    return (
      <>
        <ProgressBar striped variant="success" now={60} label={`${100*0.6}%`} />
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
              <CheckLine  {...{isEdit:true, isOkMatch:true, str:'абвгдiш', mustMatch:true, listIndex:0}} />
              <CheckLine {...{isEdit:false, isOkMatch:false,   mustMatch:null, listIndex:1}} />
          </tbody>
        </Table>
      </>
    )
  }
}
export default hot(CheckLineList);

/*
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
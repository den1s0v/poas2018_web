import React from "react";
import { Button } from "react-bootstrap";

export function SampleList(props) {
  
  /* props:
    - title: str | null
   */
  return (
  <>
    <h2>{props.title} {props.samples ? (<sup>({props.samples.length || 0})</sup>) : <i>(Загружаются...)</i>}</h2>
    
    {props.samples ?
      (<ol>
        {
          props.samples.map( sample => 
            <li key={sample.obj.regex+sample.obj.title}>
              <Button variant="outline-info" onClick={()=>alert(sample.obj.regex)}>{sample.obj.title}</Button>
            </li>
          )
        }
      </ol>)
    :
    "ожидание ..."}
  </>
  );
}
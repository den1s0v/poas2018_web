import React from "react";
import { Badge } from "react-bootstrap";

export function SampleList(props) {
  
  /* props:
    - title: str | null
   */
  return (
  <>
    <h2>{props.title} {props.samples && (<sup>({props.samples.length || 0})</sup>)}</h2>
    
    <ol>
    
      <li>пункт 1</li>
      <li>пункт 2</li>
    
    </ol>
  </>
  );
}
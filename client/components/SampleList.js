import React from "react";
import { Button } from "react-bootstrap";

export function SampleList(props) {
  
  /* props:
    - title: str | null
   */
  return (
  <>
    <h2>
    {props.title}
    {
      props.samples ? (<sup>({props.samples.length || 0})</sup>) : <i>(Загружаются ..…)</i>
    }
    {
      props.inHeaderComponent
    }
    </h2>
    
    {
      props.samples ?
        props.samples.length > 0 ?
        (<ul className="list-inline">
          {
            props.samples.map( sample => 
              <li key={sample.obj.regex+sample.obj.title}>
                <Button variant="outline-info" disabled={!props.active}
                  onClick={()=>props.onChoose(sample)}
                >
                  {sample.obj.title}
                </Button>
              </li>
            )
          }
        </ul>)
        :
        "Нет ни одной задачи."
      :
      "ожидание ..."
    }
  </>
  );
}
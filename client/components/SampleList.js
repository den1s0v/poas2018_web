import React from "react";
import { Button, Badge } from "react-bootstrap";

export function SampleList(props) {
  
  /* props:
    - title: str | null
   */
  return (
  <>
    <h2>
    {props.title}
    {
      props.samples ? (<sup>({props.samples.length || 0})</sup>) : <i>(Ждём…)</i>
    }
    &nbsp;
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
              <li className="list-inline-item" key={sample.obj.regex+sample.obj.title}>
                {
                  ! props.editable ?
                  <Button variant="outline-info" disabled={!props.active}
                    onClick={()=>props.onChoose(sample)} >
                    {sample.obj.title}
                  </Button>
                  :
                  <Badge variant="success">
                    {sample.obj.title + " "}
                    { props.editable &&
                      [ <>&nbsp;&nbsp;</> ,
                          <Button variant="primary" onClick={()=>props.onEdit(sample)}>
                            <span className='fa fa-edit'/>
                          </Button>
                      ]
                    }
                  </Badge>
                }
              </li>
            )
          }
        </ul>)
        :
        "Нет ни одной задачи."
      :
      "Загружаются ..."
    }
  </>
  );
}
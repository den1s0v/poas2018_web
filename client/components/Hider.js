import React, { Component } from "react";
import { Button, Collapse, Fade } from "react-bootstrap";

/** Модуль Conponent Hider предназначен для СКРЫВАНИЯ поданного Компонента с возможностью анимации.
	animationType м.б. 3-х видов: "fade", "collapse", "None"
*/
export class Hider extends Component {
  constructor(props, context) {
    super(props, context);
		
		this.onFaded = this.onFaded.bind(this);
      
    this.state = {
      hidden: false,
			componentFaded : false
    };
  }
  render() {
    
    return (
			<>
			{ this.makeHidedElement() }
			
        <div style={{float:"right"}} >

          <Button variant="info" aria-controls="hide-element" aria-expanded={this.state.hidden}
            onClick={ ()=>this.setState({hidden: !this.state.hidden,
																					 componentFaded : false
																					}
																) 
										 }
            >{this.state.hidden ? [<span className='fa fa-angle-double-down fa-lg' />," Show Header"]
																: [<span className='fa fa-angle-double-up fa-lg' />," Hide Header"] }
					</Button>
        </div>
			</>
		)
	}
	
	onFaded() {
		this.setState({componentFaded : true});
		// alert("componentFaded =" + this.state.componentFaded)
	}
	
	makeHidedElement() {
		var animType="None";
		if(this.props.animationType) animType=this.props.animationType;
		
		switch(animType.toLowerCase()) {
			case "fade" :
				return (
				<Fade in={!this.state.hidden} onExited={this.onFaded}>
					<div id="hide-element">
					{
 						this.state.componentFaded ? "" : this.props.component()
					}
					</div>
				</Fade>
				)
				// break; <- здесь есть return
				
			case "collapse" :
				return 				console.log("collapse"), (
				<Collapse in={!this.state.hidden} >
					<div id="hide-element">
					{
 						// this.state.componentFaded ? "" : this.props.component()   // убирать показ объекта здесь не будем, т.к. это делает Collapse (из Bootstrap`а).
            this.props.component()
					}
					</div>
				</Collapse>				
				)
				
			default :	 // "None"
				return (
				<div id="hide-element">
				{
					this.state.hidden ? "" : this.props.component()
				}
				</div>
				)
		}
	}
}

import React, { Component } from "react";
import Container from 'react-bootstrap/lib/Container'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Form from 'react-bootstrap/lib/Form'
import Button from 'react-bootstrap/lib/Button'
import { Redirect } from "react-router-dom"

import { GoogleButton } from "./social-buttons/GoogleButton";
import { VkButton } from "./social-buttons/VkButton";

export class LoginOrSignup extends Component {
  constructor(props) {
        super(props);
        
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
	}
	
	login() {
		
		const email = document.getElementById("emailInput").value;
		const password = document.getElementById("passwordInput").value;

		if ( email == "" || password == "" ) {
			
			alert("Введите e-mail и пароль");
		} else {
		
			//alert("Log in...");
			fetch('/api/login', {
									method: 'POST',
									body: JSON.stringify({email: email, password: password}),
									headers: new Headers({"Content-Type": "application/json"})
								})
			.then(response => response.json()).then(userInfo => {
			
				if (userInfo.error) {
					
					alert("Ошибка авторизации:\n" + userInfo.error);
					
				} else {
					//alert("You're log in! :3")
					localStorage.setItem("userToken", userInfo.token);
					// location.reload(true);
          // alert('Logged in. Reload needed...');

          // fire callback
          this.props.onLogIn && this.props.onLogIn();
				}
			});
		}
	}
	
	signup() {
		
		const email = document.getElementById("emailInput").value;
		const password = document.getElementById("passwordInput").value;

		if ( email == "" || password == "" ) {
			
			alert("Enter email and password");
		} else {
		
			alert("Sign up...");
			fetch('/api/signup', {
									method: 'POST',
									body: JSON.stringify({email: email, password: password, isAdmin: false}),
									headers: new Headers({"Content-Type": "application/json"})
								})
			.then(response => response.json()).then(userInfo => {
			
				if (userInfo.error) {
					
					alert("Ошибка регистрации:\n" + userInfo.error);
					
				} else {
					// alert("You're sign up!!! \n"+userInfo.token)
					localStorage.setItem("userToken", userInfo.token);
					// location.reload(true);
          // alert('Signed up. Reload needed...');
          
          // fire callback
          this.props.onLogIn && this.props.onLogIn();
				}
			});
		}
	}
	
    render () {
		
		return ( 
		<div>
			<br />
        { /* Redirect! */
          (localStorage.getItem("userToken") !== "null") ?
          <Redirect from="/login" to="/" />
          :
          ''
        }
			
			<Container>
				<Row>
					<Col md={{span:6, offset:3}}>
						<Form>
						  <Form.Label><b>Перед началом работы войдите или зарегистрируйтесь</b></Form.Label>
						  <Form.Group>
							<Form.Label>E-mail</Form.Label>
							<Form.Control id="emailInput" type="email" placeholder="Ваш e-mail" />	
						  </Form.Group>

						  <Form.Group>
							<Form.Label>Пароль</Form.Label>
							<Form.Control id="passwordInput" type="password" placeholder="Ваш пароль" />
						  </Form.Group>
						  
              <div style={{float:"left"}} >
                <Button variant="success" onClick={this.login}>
                  <big>Войти обычным пользователем</big>
                </Button>
                <br />
                <GoogleButton/>
              </div>
              <div style={{float:"right"}} >
                <Button variant="primary" onClick={this.signup}>
                  <big><br/>Зарегистрироваться<br/>°°°</big>
                </Button>
              </div>
              <div style={{margin:10}}></div>
						</Form>
					</Col>
					
				</Row>
				
				{/*	<br />
				
				<Row>
					<Col></Col>
					<Col>
						<GoogleButton/>
					</Col>
					<Col></Col>
				</Row>
				<Row>
						<Col></Col>
						<Col>
							<VkButton/>
						</Col>
						<Col></Col>
					</Row>
				*/}
			</Container>
		</div> );
	}
}
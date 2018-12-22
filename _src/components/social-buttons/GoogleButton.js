
// Google login button
import React, { Component } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { asyncScript } from "../../services/async-script";
import config from "../../config";

function authGoogle(button) {
	var googleUser = {};
	
	// origin source: https://developers.google.com/identity/sign-in/web/build-button
	window.gapi.load('auth2', function(){
		// Retrieve the singleton for the GoogleAuth library and set up the client.
		const auth2 = gapi.auth2.init({
			client_id: config.google.clientId,
			cookiepolicy: 'single_host_origin',
			// Request scopes in addition to 'profile' and 'email'
			//scope: 'additional_scope'
		});
		attachSignin(button, auth2);
	});

  function attachSignin(element, auth2) {
    console.log(element);
    auth2.attachClickHandler(element, {},
			function(googleUser) {
				const userInfo = "Signed in: " + googleUser.getBasicProfile().getName();
				var id_token = googleUser.getAuthResponse().id_token;
				// fetсh- запрос
				fetch('');
				alert(userInfo);
			}, function(error) {
				alert(JSON.stringify(error, undefined, 2));
			});
	}
}

class GoogleButton extends Component {
	constructor(props) {
		super(props);
		this.GoogleButtonRef = React.createRef();
	}
	
	// элемент был помещён на страницу и отображён
	componentDidMount() {
		console.log(this.GoogleButtonRef.current);
		asyncScript('https://apis.google.com/js/api:client.js').then(() => {
			authGoogle(this.GoogleButtonRef.current);
		});
	}
	
	render() {
		return (
			<div ref={this.GoogleButtonRef}>
				<GoogleLoginButton onClick={() => alert('GoogleLoginButton')}>Войти через Google</GoogleLoginButton>
				// <GoogleLoginButton>Войти через Google</GoogleLoginButton>
			</div>
		)
	}
}

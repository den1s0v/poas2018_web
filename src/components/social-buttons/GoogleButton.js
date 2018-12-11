
// Google login button
import React, { Component } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { asyncScript } from "../../services/async-script";


class GoogleButton extends Component {
	render() {
		return (
			<GoogleLoginButton onClick={() => alert('GoogleLoginButton')}>
			</GoogleLoginButton>
		)
	}
}

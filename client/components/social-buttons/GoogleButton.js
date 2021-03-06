import React, { Component } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { asyncScript } from "../../services/async-script";
 
import config from "../../config";

function authGoogle(button, props) {

    window.gapi.load('auth2', function() {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        const auth2 = window.gapi.auth2.init({
            client_id: config.google.clientID,
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(button, auth2);
    });

    function attachSignin(element, auth2) {
        // console.log(element);
        auth2.attachClickHandler(element, {},
          function(googleUser) {
            const [profile_name, email] = [googleUser.getBasicProfile().getName(), googleUser.getBasicProfile().getEmail()];
            
            const userInfo = `Вы вошли как: ${profile_name}\n(${email})`;
            var id_token = googleUser.getAuthResponse().id_token;

            fetch('/api/auth/google', {
                method: 'POST',
                body: JSON.stringify({token: id_token}),
                headers: new Headers({"Content-Type": "application/json"})
            })
            .then(response => response.json())
            .then(userInfo => {
                console.log('GoogleAuth userInfo:',JSON.stringify(userInfo, null, 2));
                // fire callback
                localStorage.setItem("userToken", userInfo.token);
                props.onLogIn && props.onLogIn(email);
            });
            
            alert(userInfo);
          }, function(error) {
            console.log('GoogleAuth error:',JSON.stringify(error, undefined, 2));
        });
    }
}

export class GoogleButton extends Component {
    constructor(props) {
        super(props);
        this.googleButtonRef = React.createRef();
    }
    
    //сначала выполняется render и после вызывается componentDidMount, где мы можем всякую шушеру писать
    //вызывается один раз
    componentDidMount() {
        // console.log('componentDidMount');
        asyncScript('https://apis.google.com/js/api:client.js').then( () => {
            authGoogle(this.googleButtonRef.current, this.props);
        });
    }

    componentDidUpdate() {
        // console.log('componentDidUpdate');
        authGoogle(this.googleButtonRef.current, this.props);
    }

    render() {
        return(
            <a ref={this.googleButtonRef}>
                <GoogleLoginButton>Войти через Google</GoogleLoginButton>
            </a>
        );
    }
};
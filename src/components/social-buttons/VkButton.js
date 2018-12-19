
// Vk login button
import React, { Component } from "react";
import { createButton } from "react-social-login-buttons";
import { asyncScript } from "../../services/async-script";
import config from "../../config";
import styled from "styled-components"

const configVkButton = {
	text: "",
	icon: "vk",
	iconFormat: name => `fa-fa-${name}`,
	style: {background: "#587ea3"},
	activeStyle: {background: "#466482"}
}

const VkButton = createButton(configVkButton);

class VkButtonLogin = extends Component {
	render() {
		return <VkButton className={this.props.className}></VkButton>
	}
}

const styledVkButtonLogin = styled(VkButtonLogin)`
	&:active {
		background-color: #3a526b;
	}
`

export { styledVkButtonLogin as VkButton }
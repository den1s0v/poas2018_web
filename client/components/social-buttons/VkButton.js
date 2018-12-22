import React, { Component } from "react";
import { createButton } from "react-social-login-buttons";
import { asyncScript } from "../../services/async-script";
import config from "../../config";
import styled from "styled-components";

const configVkButton = {
    text: "Войти через ВКонтакте",
    icon: "vk",
    iconFormat: name => `fab fa-${name}`,
    style: { background: "#587ea3"},
    activeStyle: { background: "#466482" },

};

const VkButton = createButton(configVkButton);

class VkButtonLogin extends Component {
    renderPopupWindow() {
        const newWindow = vk_popup({width: 670, height: 350, url: config.vk.vkUrl});
        newWindow.focus();

        window.addEventListener('message', (event) => {
            if (event.origin === "http://localhost:3000") {
                console.log(event.data);
            }
        });
    }

    render() {
        return <VkButton onClick={this.renderPopupWindow} className={this.props.className}></VkButton>;
    }
};

const styledVkButtonLogin = styled(VkButtonLogin)`
    &:active {
        background-color: #3a526b !important;
    }
`;

function vk_popup(options) {
    var screenX =
        typeof window.screenX != "undefined" ? window.screenX : window.screenLeft,
    screenY =
        typeof window.screenY != "undefined" ? window.screenY : window.screenTop,
    outerWidth =
        typeof window.outerWidth != "undefined"
            ? window.outerWidth
            : document.body.clientWidth,
    outerHeight =
        typeof window.outerHeight != "undefined"
            ? window.outerHeight
            : document.body.clientHeight - 22,
    width = options.width,
    height = options.height,
    left = parseInt(screenX + (outerWidth - width) / 2, 10),
    top = parseInt(screenY + (outerHeight - height) / 2.5, 10),
    features =
        "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;
    return window.open(options.url, "vk_oauth", features);
}

export { styledVkButtonLogin as VkButton };
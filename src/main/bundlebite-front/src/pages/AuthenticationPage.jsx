import React from "react";
import LoginComponent from "../components/LoginComponent.jsx";
import SignupComponent from "../components/SignupComponent.jsx";

function getURL() {
    //get current URL location  /login or /signup
    return window.location.pathname;
}

const AuthenticationPage = () => {
    if (getURL() === "/login") {
        return (<LoginComponent />);
    } else if (getURL() === "/signup") {
        return (<SignupComponent />);
    }
}

export default AuthenticationPage;
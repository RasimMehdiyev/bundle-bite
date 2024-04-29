import React from "react";
import {signIn} from "../auth"
import {useState} from "react";
import { useNavigate } from "react-router-dom";

 
const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(email, password)
            .then(() => {
                setSuccess("Login successful!"); // Display success message to the user
                navigate("/"); // Redirect to the home page
            })
            .catch((error) => {
                setError("Login failed: " + error.message); // Display error message to the user
                console.error("Login error:", error);
            });
    };
    return(
        <div className="auth-main">
            <h1>LOGIN</h1>
            <form className="auth" onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email"></input>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password"></input>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    )

}

export default LoginComponent;
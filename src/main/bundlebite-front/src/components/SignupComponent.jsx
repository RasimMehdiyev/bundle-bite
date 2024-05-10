import React from "react";
import {signUp} from "../auth";
import {useState} from "react";

const SignupComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      signUp(email, password)
      .then(() => {
        console.log("Signed up successfully");
      })

    };

    return(
        <div className="auth-main">
            <h1>SIGN UP</h1>
            <form className="auth" onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email"></input>
                <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password"></input>
                <input type="password" id="confirm-password" name="confirm-password" required placeholder="Confirm password"></input>
                <button type="submit">SIGN UP</button>
            </form>
        </div>
    )

}

export default SignupComponent;
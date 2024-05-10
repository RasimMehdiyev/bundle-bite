import React from "react";
import {signUp} from "../auth";
import {useState} from "react";

const SignupComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      signUp(email, password);
    };

    return(
        <div className="auth-main">
            <h1 className="login-header">SIGN UP</h1>
            <form className="auth" onSubmit={handleSubmit}>
                <input type="email" id="email" name="email" value={email} style={{ textAlign: 'left', borderRadius: '15px'}} onChange={e => setEmail(e.target.value)} required placeholder="Email"></input>
                <input type="password" id="password" name="password" value={password} style={{ textAlign: 'left', borderRadius: '15px'}} onChange={e => setPassword(e.target.value)} required placeholder="Password"></input>
                <input type="password" id="confirm-password" name="confirm-password" style={{ textAlign: 'left', borderRadius: '15px'}} required placeholder="Confirm password"></input>
                <button type="submit" style={{ marginTop: '30px', width: '400px', height: '60px', fontFamily:'Inter', borderRadius: '15px', fontSize:'25px'}}>SAVE</button>
            </form>
        </div>
    )

}

export default SignupComponent;
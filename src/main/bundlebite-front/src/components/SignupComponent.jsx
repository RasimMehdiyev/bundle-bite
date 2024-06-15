import React, { useState } from "react";
import { signUp } from "../auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user, token } = await signUp(email, password, name); // Ensure user and token are fetched
            console.log("Signed up successfully, token:", token); // Log the token for verification
    
            if (token) { // Proceed only if the token is available
                await axios.post("/users/setClaims/", { name: user.displayName }, {
                    headers: { Authorization: `Bearer ${token}` },
                }).then(() => {
                    console.log("User claims updated successfully");
                }).catch((error) => {
                    console.error("Error updating user claims:", error);
                });
            } else {
                console.error("No token available to set claims");
            }
        } catch (error) {
            console.error("Error during signup or setting claims:", error);
        } finally {
            // Redirect to homepage regardless of the outcome
            navigate("/");
        }
    };
    
    
    

    return (
        <div className="auth-main">
            <h1 className="login-header">SIGN UP</h1>
            <form className="auth" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    style={{ textAlign: 'left', borderRadius: '15px' }}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Name"
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    style={{ textAlign: 'left', borderRadius: '15px' }}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    style={{ textAlign: 'left', borderRadius: '15px' }}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
                <button
                    type="submit"
                    style={{ marginTop: '30px', width: '400px', height: '60px', fontFamily: 'Inter', borderRadius: '15px', fontSize: '25px' }}
                >
                    SAVE
                </button>
            </form>
        </div>
    );
};

export default SignupComponent;
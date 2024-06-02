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

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(email, password, name)
            .then((response) => {
                console.log("Signed up successfully");
                // reload
                window.location.reload();

                const token = response.token
                axios.post("/users/setClaims/", {
                    name: name,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ).then(() => {
                    navigate("/");
                    console.log("User claims updated successfully");
                }).catch((error) => {
                    console.error("Error updating user claims:", error);
                });
            });
        
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
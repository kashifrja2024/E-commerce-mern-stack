import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })
    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        result = await result.json();
        console.log(result);

        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/')

        } else {
            alert("plz enter correct details")
        }

    }
    return (
        <div className="login">
            <input className="inputBox" type="email" placeholder="Enter email " onChange={(e) => { setEmail(e.target.value) }} />
            <input className="inputBox" type="password" placeholder="Enter Password " onChange={(e) => { setPassword(e.target.value) }} />
            <button type="button" className="appbutton" onClick={handleLogin}>Login</button>
        </div>)
}

export default Login;
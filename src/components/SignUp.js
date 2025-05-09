import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const Navigate = useNavigate()
    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })
    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch("http://localhost:5000/register", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        result = await result.json()
        console.log("result", result);
        localStorage.setItem("user", JSON.stringify(result));

        // if (result) {
        Navigate('/')
        // }
    }
    return (
        <div className="register">
            <input className="inputBox" type="text" value={name} placeholder="Enter name " onChange={(e) => { setName(e.target.value) }} />
            <input className="inputBox" type="email" value={email} placeholder="Enter email " onChange={(e) => { setEmail(e.target.value) }} />
            <input className="inputBox" type="password" value={password} placeholder="Enter Password " onChange={(e) => { setPassword(e.target.value) }} />
            <button type="button" className="appbutton" onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default SignUp;
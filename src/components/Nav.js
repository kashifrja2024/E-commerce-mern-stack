import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate("/signUp")
    }
    return (
        <div>
            {auth ?
                <ul className="nav-ul">
                    <li><Link to="/" >Products</Link></li>
                    <li><Link to="/add" >Add Products</Link></li>
                    <li><Link to="/update/:id" >Update Products</Link></li>
                    <li><Link to="/profile" >Profile</Link></li>
                    <li> <Link to="/signUp" onClick={logout}>logout ({JSON.parse(auth).name})</Link> </li>
                </ul> :
                <ul className="nav-ul nav-login">
                    <li>
                        <Link to="/signUp" >SignUp</Link></li>
                    <li><Link to="/login" >Login</Link></li>

                </ul>
            }
        </div>
    )
}

export default Nav;
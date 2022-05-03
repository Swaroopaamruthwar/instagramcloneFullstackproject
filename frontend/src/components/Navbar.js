import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { FaInstagramSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../App.css'
function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.removeItem('token')
        navigate("/login");
    }
    const  Register=()=>{
        if(localStorage.getItem('token')){
            navigate("/login");
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#131314", color: 'black' }}>
            <div className="container-fluid">
                <div className="logo loop">
                    <span ><FaInstagramSquare /></span>
                </div>
                <div className="logo logo-name">
                    Instaclone
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {!localStorage.getItem('token') ?
                        <ul className="navbar-nav mb-lg-0 " style={{ marginLeft: '900px' }} >
                            <li className="nav-item">
                                <Link className={`nav-link active btn btn-primary ${location.pathname === "/login" ? "active" : ""}`} to="/login" role="button" style={{ color: 'black' }} aria-current="page" >Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link active btn btn-primary ${location.pathname === "/signup" ? "active" : ""}`} to="/signup" role="button" style={{ marginRight: '20px', color: 'black' }} aria-current="page" onClick={Register} >Register</Link>
                            </li>
                        </ul> : <button className="btn btn-primary" style={{ marginRight: '60px', color: 'black', marginLeft: '1000px' }} onClick={Logout} >Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar

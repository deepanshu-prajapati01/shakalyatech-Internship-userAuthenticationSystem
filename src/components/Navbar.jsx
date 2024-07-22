import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const Navbar = props => {
    let location = useLocation();



    const handleLogOut = () => {
        localStorage.removeItem("token");
        props.showAlert("User logged out successfully", "success")
    }




    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/">
                        <i className="fa-solid fa-ghost mx-1"></i>
                        <span className='mx-1'>SecureAuth</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} aria-current="page" to="/dashboard">Dashboard</Link>
                            </li>

                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ "position": "absolute", "right": "1rem" }}>
                        {/* login and sign up button */}
                        <Link className={`btn btn-primary mx-1 ${location.pathname === "/login" ? "d-none" : ""} ${localStorage.getItem('token') ? "d-none" : ""}`} to={"/login"} role="button">Login</Link>

                        <Link className={`btn btn-primary mx-1 ${location.pathname === "/signup" ? "d-none" : ""} ${localStorage.getItem('token') ? "d-none" : ""}`} to={"/signup"} role="button">Sign Up</Link>

                        {/* logout button */}
                        <Link className={`btn btn-primary mx-1 ${localStorage.getItem('token') ? "" : "d-none"}`} to={"/login"} onClick={handleLogOut} role="button">LogOut</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

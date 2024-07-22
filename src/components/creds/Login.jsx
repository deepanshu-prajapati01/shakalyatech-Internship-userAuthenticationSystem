import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: Credential.email, password: Credential.password })
            }
        );

        const json = await response.json();
        if (response.status !== 200) {
            return props.showAlert(json.error, "info");
        }

        else if (response.status === 500) {
            return props.showAlert(json.error, "info")
        }

        else if (response.status === 200) {
            props.showAlert(json.message, "success")
            const authToken = json.authToken;
            localStorage.setItem('token', authToken);
            navigate("/dashboard");
        }

        else {
            return props.showAlert("Unexpected error occurred", "danger")
        }
    }

    const [Credential, setCredential] = useState({
        email: "",
        password: ""
    })


    const onChange = (e) => {
        setCredential({ ...Credential, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container card p-4" style={{ "maxWidth": "80%" }}>
                <form className="row g-3" onSubmit={handleSubmit}>

                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" htmlFor='email' name='email' className="form-control" id="email" value={Credential.email} onChange={onChange} placeholder="name@example.com" />


                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' htmlFor='password' id="password" value={Credential.password} onChange={onChange} className="form-control" aria-describedby="passwordHelpBlock" />
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be at least 8 characters long, and must not contain emoji.
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </div>

                </form>


            </div>
        </>
    )
}

export default Login

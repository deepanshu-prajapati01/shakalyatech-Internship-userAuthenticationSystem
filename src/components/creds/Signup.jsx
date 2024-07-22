import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/createaccount`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: Credential.name, email: Credential.email, password: Credential.password, username: Credential.username, mobilenumber: Credential.mobilenumber })
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
            return props.showAlert("Unexpected error occurred while creating user account", "danger")
        }




    }

    const [Credential, setCredential] = useState({
        name: "",
        email: "",
        password: "",
        mobilenumber: "",
        username: ""
    })


    const onChange = (e) => {
        setCredential({ ...Credential, [e.target.name]: e.target.value })
    }



    return (
        <>
            <div className="container card p-4" style={{ "maxWidth": "80%" }}>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={onChange} value={Credential.email} name='email' id="email" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} value={Credential.password} name='password' id="inputPassword4" />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onChange} value={Credential.name} name='name' id="name" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" onChange={onChange} value={Credential.username} name='username' id="username" />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
                        <input type="number" className="form-control" onChange={onChange} value={Credential.mobilenumber} name='mobilenumber' id="mobilenumber" />
                    </div>



                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Signup

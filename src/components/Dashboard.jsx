import React, { useEffect, useState } from 'react'

const Dashboard = (props) => {
    const [userData, setUserData] = useState({ "user": { "Name": "", "Email": "", "Username": "", "MobileNumber": "" } })
    const [dataRetrieved, setDataRetrieved] = useState("false")

    useEffect(() => {
        const fetchData = async () => {
            try {
                var authToken = localStorage.getItem('token');

                // if no authToken found!
                if (!authToken) {
                    return
                }


                // fetching data from the authToken of the user
                const response = await fetch("http://localhost:5000/api/user/dashboard", {
                    method: "POST",
                    headers: {
                        "auth-token": authToken,
                        "Content-Type": "application/json"
                    }
                })

                const json = await response.json();

                if (json.success === "false") {
                    return props.showAlert(json.error, "info")
                }

                else if (json.success === "true") {
                    setUserData(json); // Store the data in state
                    setDataRetrieved("true")
                    console.log(userData)
                }

                else {
                    return props.showAlert("Unknown Error Occurred", 'danger')
                }


            } catch (error) {
                setDataRetrieved("false");
                return props.showAlert(error, 'danger');
            }
        };

        fetchData();
    }, []);



    return (
        <>
            <div className="container" style={{ "maxWidth": "80%" }}>

                <div className="card">
                    <div className="card-body">
                        <div className='d-flex justify-content-center mb-2'>
                            <h4>SecureAuth - Dashboard</h4>
                        </div>

                        {dataRetrieved === "true" ? (
                            <div>
                                <div className="d-flex justify-content-center card-img-top mt-2">
                                    <strong><span className="">Details Below!</span></strong>
                                </div>

                                <table className={`table table-striped-columns mt-2`}>
                                    <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">Query</th>
                                            <th scope="col">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Name</th>
                                            <td>
                                                {userData && userData.user.Name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Username</th>
                                            <td>{userData && userData.user.Username}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td colSpan="2">{userData && userData.user.Email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Mobile Number</th>
                                            <td colSpan="2">{userData && userData.user.MobileNumber}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>) : (<div>
                                <p className='d-flex my-2 justify-content-center'><strong><i>Please Sign up/ Login to continue using SecureAuth!</i></strong></p>
                            </div>

                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Dashboard

import React, { useEffect, useRef, useState } from 'react'

const Dashboard = (props) => {

    // for editing purpose in the update details
    const [editedUserData, setEditedUserData] = useState({ "user": { "Name": "", "Email": "", "Username": "", "MobileNumber": "" } })

    // for updating the details - in the update details menu
    const onChange = (e) => {
        console.log(e)
        console.log(editedUserData)
        setEditedUserData({
            ...editedUserData,
            "user": {
                ...editedUserData.user,
                [e.target.name]: e.target.value,
            },
        });
    };


    const [userData, setUserData] = useState({ "user": { "Name": "", "Email": "", "Username": "", "MobileNumber": "" } })
    const [dataRetrieved, setDataRetrieved] = useState("false")

    const updateDetails = async (e) => {
        e.preventDefault();
        editDetailsCloseRef.current.click()

        const response = await fetch(`http://localhost:5000/api/edit/updatedetails`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token":localStorage.getItem('token')
                },
                body: JSON.stringify({ name: editedUserData.user.Name, email: editedUserData.user.Email, password: editedUserData.user.Password, username: editedUserData.user.Username, mobilenumber: editedUserData.user.MobileNumber })
            }
        );

        const json = await response.json();

        if (json.success === "false") {
            return props.showAlert(json.error, "info");
        }

        else if (json.success === "true") {
            setUserData(editedUserData);
            return props.showAlert("Details updated successfully!", "success")
        }
    }

    // modal close button ref
    const editDetailsCloseRef = useRef();
    const ChangePasswordRef = useRef();




    // incase user change details in the edit menu but closes the window,
    // this will help to set those details back to the original data
    const formatEditedDetails = () => {
        setEditedUserData(userData);
    }


    useEffect(() => {
        var fetchData = async () => {
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
                    setEditedUserData(json); // Store for the fact if user update value
                    setDataRetrieved("true") // yes, data retrieved
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





            {/* MAIN BODY */}
            <div className="container">

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
                                            <td>{userData && userData.user.Email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Mobile Number</th>
                                            <td>{userData && userData.user.MobileNumber}</td>
                                        </tr>

                                    </tbody>
                                </table>



                                <div className="container">
                                    {/* MODAL 1 -> Button <- Edit Details */}
                                    <button type="button" className="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#editDetails" onClick={formatEditedDetails}>
                                        EDIT DETAILS
                                    </button>

                                    {/* MODAL 2 -> Button <- Change Password*/}
                                    <button type="button" className="btn btn-success mx-1" data-bs-toggle="modal" data-bs-target="#changePassword">
                                        Change Password
                                    </button>
                                </div>
                            </div>) : (<div>
                                <p className='d-flex my-2 justify-content-center'><strong><i>Please Sign up/ Login to continue using SecureAuth!</i></strong></p>
                            </div>
                        )}
                    </div>
                </div>
            </div >


            {/* MODAL 1 -> For Editing details */}

            <div className="modal fade" id="editDetails" tabIndex="-1" aria-labelledby="editDetails" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editDetails">Editing Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* form for editing details */}
                            <div className="mb-2">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name='Name' value={editedUserData.user.Name} onChange={onChange} className="form-control" id="name" aria-describedby="nameHelp" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" name='Username' value={editedUserData.user.Username} onChange={onChange} className="form-control" id="username" aria-describedby="usernameHelp" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" name='Email' value={editedUserData.user.Email} onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
                                <input type="number" name='MobileNumber' value={editedUserData.user.MobileNumber} onChange={onChange} className="form-control" id="mobilenumber" aria-describedby="mobilenumberHelp" />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button ref={editDetailsCloseRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateDetails}>Update Details</button>
                        </div>
                    </div>
                </div>
            </div>







            {/* MODAL 2 -> For Changing password */}


            <div className="modal fade " id="changePassword" tabIndex="-1" aria-labelledby="changePasswordLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="changePasswordLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button ref={ChangePasswordRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Password</button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Dashboard

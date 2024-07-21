import React from 'react'

const Dashboard = () => {
    const localStorageTEMP = true;
    return (
        <>
            <div className="container" style={{ "maxWidth": "80%" }}>

                <div className="card">
                    <div className="card-body">
                        <div className='d-flex justify-content-center mb-2'>
                            <h4>SecureAuth - Dashboard</h4>
                        </div>
                        {/* TODO: here check with the localstorage while the user logged in or not accordingly show data */}

                        <div className={`${localStorageTEMP === true ? 'd-none' : ''}`}>
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
                                        <td>NAME HERE</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Username</th>
                                        <td>Username</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email</th>
                                        <td colSpan="2">Email</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Mobile Number</th>
                                        <td colSpan="2">Mobile Number</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>





                        {/* if user not logged in */}
                        <div className={`${localStorageTEMP === false ? 'd-none' : ''}`}>
                            <p className='d-flex my-2 justify-content-center'><strong><i>Please Sign up/ Login to continue using SecureAuth!</i></strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard

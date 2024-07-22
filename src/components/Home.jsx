import React from 'react'
import Footer from './Footer'
const Home = () => {
    return (
        <>
            <div className="container mb-2">
                <div className="card">
                    <div className="card-body">
                        <div className='d-flex justify-content-center mb-2'><h4>Welcome to SecureAuth!</h4></div>
                        <p><strong>SecureAuth is a modern user authentication system built with React.js for the frontend and Node.js (using Express) for the backend. This system allows you to sign up, log in and more...
                        </strong></p>

                        <h5>Features of SecureAuth: </h5>
                        <ul className="list-group ">
                            <li className="list-group-item list-group-item-primary text-body-emphasis"><h6>Sign Up:</h6>
                                <p>New users can easily create an account by providing their email address, a unique username, and a strong password. We take security seriously, so passwords are hashed and stored securely in our MongoDB database.
                                </p>
                            </li>

                            <li className="list-group-item list-group-item-primary text-body-emphasis"><h6>Log In:</h6>
                                <p>
                                    Existing users can log in using their registered email and password.
                                    Once authenticated, they gain access to personalized features and data.
                                </p>
                            </li>

                            <li className="list-group-item list-group-item-primary text-body-emphasis">
                                <h6>User Profile:</h6>
                                <p> Users can view and update their profile information. Update your profile name, email address, or modify your username—all in one place.
                                </p>
                            </li>
                        </ul>


                        <h5 className='mt-3'><strong>Technology Stack:</strong></h5>
                        <ul className="list-group ">
                            <li className="list-group-item list-group-item-primary text-body-emphasis">
                                <h6>Frontend (React.js):</h6>
                                <p>Our beautiful and responsive user interface is powered by React.js.
                                    React Router handles navigation, ensuring a smooth flow between different pages.</p>
                                <p><i>Styling?</i> Nah! i prefer Bootstrap for these applications to stay focus on logic building.</p>
                            </li>

                            <li className="list-group-item list-group-item-primary text-body-emphasis">
                                <h6>Backend (Node.js + Express):</h6>
                                <p>Our robust backend is built with Node.js and Express.
                                    We handle user authentication, session management, and API endpoints.
                                    MongoDB serves as our database, storing user profiles and hashed passwords.
                                </p>
                            </li>

                            <li className="list-group-item list-group-item-primary text-body-emphasis">
                                <h6>Database (MongoDB):</h6>
                                <p>MongoDB, a NoSQL database, provides flexibility and scalability.
                                    We store user data securely, ensuring high availability and performance.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default Home

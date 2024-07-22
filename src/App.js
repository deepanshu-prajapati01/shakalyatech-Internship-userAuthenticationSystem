
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import { useState } from "react";
import Home from "./components/Home";
import Alert from "./components/Alert";
import Dashboard from "./components/Dashboard";
import Signup from "./components/creds/Signup";
import Login from "./components/creds/Login";




function App() {
  const [alert, setAlert] = useState({
    "opacity": 0,
    "alertText": "‎",
    "alertColor": "info"
  })

  const showAlert = (message, type) => {
    setAlert({
      "opacity": 1,
      "alertText": message,
      "alertColor": type
    })


    setTimeout(() => {
      setAlert({
        "opacity": 0,
        "alertText": "‎",
        "alertColor": "info"
      })
    }, 2000);
  }










  return (
    <>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert opacity={alert["opacity"]} alertColor={alert["alertColor"]} alertText={alert["alertText"]} />

        <Routes>
          <Route exact path="/" element={
            <>
              <Home showAlert={showAlert} />
            </>
          } />


          <Route exact path="/dashboard" element={
            <>
              <Dashboard showAlert={showAlert} />
            </>
          } />


          <Route exact path="/signup" element={
            <>
              <Signup showAlert={showAlert}/>
            </>
          } />


          <Route exact path="/login" element={
            <>
              <Login showAlert={showAlert} />
            </>
          } />




        </Routes>
      </Router >
    </>
  );
}

export default App;
import './App.css';
import { useMoralis } from "react-moralis";
import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";


function App() {
    const {isAuthenticated} = useMoralis();

    useEffect(()=>{
        console.log("Inside UseEffect");
        if(isAuthenticated){
            console.log("user already logged in")
        }
    },[])

    return (
        <>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/dashboard" element={isAuthenticated ?<Dashboard/>:<Navigate to="/login"/>}/>
                <Route path="/editProfile" element={isAuthenticated ?<EditProfile/>:<Navigate to="/login"/>}/>
            </Routes>
        </Router>
            </>
    );
}

export default App;

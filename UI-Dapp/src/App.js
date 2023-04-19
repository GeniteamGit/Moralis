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
import Dashboard from "./Dashboard";
import Moralis from "moralis";


function App() {
    const {isAuthenticated, authenticate,isAuthenticating,user,logout } = useMoralis();
    const [myUser, setMyUser] = useState({});

    useEffect(()=>{
        console.log("Inside UseEffect");
        if(isAuthenticated){
            console.log("user already logged in");
        }
    },[])
    const login = async () => {
        const _user = await authenticate();
        console.log(_user);
        setMyUser(_user);
    }

    // const logOut = async () => {
    //     console.log(myUser);
    //     setMyUser({});
    //     await logout();
    //     console.log("logged out");
    // }

    return (
        <>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={isAuthenticated ?<Dashboard/>:<Navigate to="/login"/>}/>
            </Routes>
        </Router>
            </>
    );
}

export default App;

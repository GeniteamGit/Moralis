import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import Dashboard from "./Dashboard";
import {useMoralis, useMoralisQuery} from "react-moralis";
import {Link} from "react-router-dom";
import React, {useState} from "react";

const Login = () => {
    const {isAuthenticated, authenticate} = useMoralis();
    const connectWallet = async ()=>{
        const _user = await authenticate();
        console.log(_user);
    }
    if (isAuthenticated) {
      console.log("Logged IN");
        return (
            <Dashboard/>
        )
    }

    return (
        <>
            <div className="bac row align-items-center">
                <div className=" d-flex justify-content-center  col-md-12">
                    <Card className="mb-5 shadow border-0  col-md-4 loginform">
                        <CardBody className="px-lg-5 py-lg-5  ">
                            <div className="text-center  mb-5">
                                <h2>Connect Your Wallet</h2>
                            </div>
                            <div className="text-center">
                                    <Button className=" btn btn-info " onClick={connectWallet}>Connect Wallet</Button>
                                    </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Login;

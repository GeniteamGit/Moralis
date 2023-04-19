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
import SignUp from "./SignUp";
import {useMoralis, useMoralisQuery} from "react-moralis";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

const Login = () => {
    const {login, isAuthenticated, authenticate, user} = useMoralis();
    const [myUser, setUser] = useState({});


    const loginForm = async (e) => {
        e.preventDefault();
        await login(myUser.email, myUser.password);
        setUser({email: "", password: ""});
    };
    const connectWallet = async ()=>{
        try {
        const _user = await authenticate();
        console.log(_user);
        setUser(_user);
        }catch (e) {
            console.log(e);
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...myUser,
            [name]: value,
        });
    };
    if (isAuthenticated) {
      console.log("Logged IN");
        return (
            // <SignUp myUser={myUser}/>
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
                                <h2>Login</h2>
                            </div>
                            <Form onSubmit={loginForm} role="form">
                                <FormGroup className="mb-3 ">
                                    <InputGroup className="">
                                        {/*<InputGroupText>*/}
                                        {/*    <i className="fa fa-envelope"/>*/}
                                        {/*</InputGroupText>*/}
                                        <Input
                                            placeholder="User Name or Email"
                                            type="text"
                                            name="email"
                                            value={myUser.email}
                                            onChange={handleChange}
                                            required="required"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="">
                                        {/*<InputGroupText>*/}
                                        {/*    <i className="fa fa-unlock"/>*/}
                                        {/*</InputGroupText>*/}
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            value={myUser.password}
                                            onChange={handleChange}
                                            required="required"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <Button className="my-1 btn  loginbtn fs-5" type="submit">
                                        Sign in
                                    </Button>
                                    <p className="p-0 m-0">or</p>
                                    <div className="">
                                    <Button className="mb-3 btn btn-success btn-sm" onClick={connectWallet}>Connect Wallet</Button>
                                    </div>
                                    <p className="forgot-password text-right">
                                        Not Registered ? <Link to="/signUp">Create an Account</Link>
                                    </p>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Login;

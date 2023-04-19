import React, {useEffect, useState} from 'react'
import {Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";
import {useMoralis, useMoralisQuery, useNewMoralisObject} from "react-moralis";
import Dashboard from "./Dashboard";

export default function EditProfile(props) {
    const {signup, isAuthenticated, user, setUserData} = useMoralis();
    // const { fetch } = useMoralisQuery(
    //     "_User",
    //     (query) => query.equalTo("objectId", props.user.id),
    //     [],
    //     { autoFetch: false }
    // );
    const [myUser, setMyUser] = useState({
        userName: "",
        email: "",
        contact: "",
        password: ""
    });
    // useEffect( async ()=>{
    //     await fetch({onSuccess:(__user)=>{
    //             console.log(__user);
    //         }})
    // },[])
    const editProfile = async (e) => {
        e.preventDefault();
        console.log(myUser);
        // await signup(myUser.userName, myUser.password, myUser.email, {contact: myUser.contact});
        await setUserData({username:myUser.userName,email:myUser.email,contact:myUser.contact,password:myUser.password});
        setMyUser({
            userName: "",
            email: "",
            contact: "",
            password: ""
        });
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMyUser({
            ...myUser,
            [name]: value,
        });
    };

    return (
        <div>
            <div className="bac row align-items-center">
                <div className=" d-flex justify-content-center  col-md-12">
                    <Card className="  shadow border-0  col-md-4 loginform">
                        <CardBody className="px-lg-5 py-lg-5  ">
                            <h3 className="text-center mb-3">Edit Profile</h3>
                            <form onSubmit={editProfile} className="needs-validation" noValidate>
                                <div className="form-group p-2">
                                    <label className="text-muted">User name</label>
                                    <input type="text" name="userName" className="form-control"
                                           placeholder="User name" onChange={handleChange} required/>
                                </div>
                                <div className="form-group p-2">
                                    <label>Email address</label>
                                    <input type="email" name="email" className="form-control" placeholder="Enter email"
                                           onChange={handleChange} required/>
                                </div>
                                <div className="form-group p-2">
                                    <label>Contact Number</label>
                                    <input type="tel" name="contact" className="form-control"
                                           placeholder="Enter Contact" onChange={handleChange} required/>
                                </div>
                                <div className="form-group p-2">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control"
                                           placeholder="Enter password" onChange={handleChange} required/>
                                </div>
                                <div className="p-2 ">
                                    <button type="submit" className="my-2 btn  loginbtn fs-5 text-white">Update
                                    </button>
                                </div>
                                {/*<p className="forgot-password text-center p-2">*/}
                                {/*    Already registered <Link to="/login">sign in?</Link>*/}
                                {/*</p>*/}
                                <Link to="/dashboard"><a className="float-end" role="button">
                                    Skip for now
                                </a></Link>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

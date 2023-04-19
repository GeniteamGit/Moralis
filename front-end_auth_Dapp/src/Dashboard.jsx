import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Link } from "react-router-dom";
import axios from "axios";
import Moralis from "moralis";

const Dashboard = () => {
  const { user, logout } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    console.log(user);
    setACL().then(response=> console.log(response));
    // Moralis.Cloud.run("getNft",{ tokenId:"29", sessionToken:user.attributes.sessionToken})
  }, []);

  const setACL = async()=>{
    const nftData = Moralis.Object.extend("NftMeta");
    const query = new Moralis.Query(nftData);
    query.limit(1000);
    query.equalTo("owner",user.attributes.accounts[0]);
    const myData = await query.find();
    console.log(myData);
    console.log(myData.length);

    for (const element of myData) {
      element.setACL(new Moralis.ACL(Moralis.User.current()))
      // console.log("Saving data");
      await element.save();
    }

  }
  const callApi = async () => {
    const nft = await axios.get(
      "https://iyjcla5vxq1v.usemoralis.com:2053/server/functions/getNft?_ApplicationId=qHKEtM67ktzLBAI8qRewPCcbivvT9d05KfAJQmyu",
      { params: { tokenId:"29", ssToken:user.attributes.sessionToken} }
    );
    console.log(nft);
  };
  // const getNfts = async () =>{
  //   const options = { chain: 'rinkeby', address: Moralis.User.current().get("ethAddress")}
  //   const nfts = await Moralis.Web3.getNFTs(options);
  //   console.log(nfts.filter(element => element.token_address === "0x3689fedc16168407d631d2e77a88e67387536afd"));
  // }
  return (
    <>
      <div className="text-center my-5">
        Welcome to the dashboard
        <br />
        <button className="btn btn-danger my-2" onClick={logout}>
          Logout
        </button>
        <br />
        <Link to="/editProfile">
          <button className="btn btn-outline-info my-2">Edit Profile</button>
        </Link>
        <br />
        <button className="btn btn-outline-success my-2" onClick={callApi}>
          Call Api
        </button>
        <br />
        {/*<button className="btn btn-outline-secondary" onClick={getNfts}>*/}
        {/*  Get NFTs*/}
        {/*</button>*/}
      </div>
      <div></div>
    </>
  );
};

export default Dashboard;

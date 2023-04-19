import React, { useEffect, useState } from "react";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisCloudFunction,
} from "react-moralis";
// import { ApproveWeb3ExecuteFunction } from "../components/ApproveWeb3ExecuteFunction";
import { SwapPongToCCash } from "../components/SwapPongToCCash";
import { SwapCCashTOPong } from "../components/SwapCCashTOPong";
const axios = require("axios").default;

// import Moralis from "moralis-v1/node";

// import Button from 'react-bootstrap/Button';

let firstRender = true;
export function Index() {
  const [pubKey, setPubKey] = useState(null);
  const [balanceState, setBalanceState] = useState(null);
  const [walletButtonTitle, setWalletButtonTitle] = useState("Connect Walllet");
  //const [firstRender, setFirstRender] = useState(true);
  let pk = null;

  const { fetch } = useMoralisCloudFunction(
    "getBalance",
    { from: pubKey },
    { autoFetch: false }
  );

  const {
    authenticate,
    isAuthenticated,
    // isAuthenticating,
    user,
    account,
    logout,
    enableWeb3,
    isWeb3Enabled,
  } = useMoralis();

  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {

    if (firstRender) {
      //setFirstRender(false);
      firstRender = false;
      NotificationManager.info(
        "Cloud Server",
        "Connecting to Moralis Cloud Server",
        10000
      );
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/functions/getPluginSpecs`)
        .then((res) => {
          console.log(res);
          NotificationManager.success(
            "Cloud Server",
            "Connected to Moralis Cloud Server",
            10000
          );
        })
        .catch((err) => {
          console.log("server is down ", err);
          NotificationManager.error(
            "Moralis Cloud Server is Down",
            "Moralis Cloud Server",
            10000
          );
        });
    }
    if (isAuthenticated && !isWeb3Enabled) {
      try {
        if (user.attributes) {
          const _address = user.attributes;
          if (_address.accounts[0]) {
            console.log("addr == ",_address.accounts[0]);
            pk = _address.accounts[0];
            setPubKey(_address.accounts[0]);
            getBalanceHandler();
          }
        }
      } catch (error) {
        console.log("error = ",error)
      }
      setWalletButtonTitle("Wallet Connected");
      console.log("enabling web3....");
      enableWeb3();
      console.log("....web3 enabled");
    }
  }, [isAuthenticated, pubKey, balanceState]);

  const cloudCall = () => {
    fetch({
      onSuccess: (data) => console.log(data),
    });
  };

  const getBalanceHandler = async () => {
    {
      //console.log("pubkey by handler  ", pubKey, "pk ", pk);

      const url = `${process.env.REACT_APP_SERVER_URL}/functions/getBalance?_ApplicationId=${process.env.REACT_APP_APP_ID}`;

      axios
        .post(url, {
          from: pk ? pk : pubKey,
        })
        .then(function (res) {
          const data = res.data;
          if (data.error) console.log(data);
          else {
            console.log("Balance = ", data.result);
            setBalanceState(data.result.Amount);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(async function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
          if (user.get("ethAddress")) {
            pk = user.get("ethAddress");
            setPubKey(pk);
            setWalletButtonTitle("Wallet Connected");
            await getBalanceHandler();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
    setPubKey(null);
    setBalanceState(null);
    setWalletButtonTitle("Connect Walllet");
  };

  return (
    <div>
      <div>
        <h1>Virtual Coin Swapper</h1>

        <button
          className={
            !isAuthenticated ? "btn btn-primary mt-2" : "btn btn-success mt-2"
          }
          onClick={login}
        >
          {walletButtonTitle}
        </button>
        <br />
        {isAuthenticated ? (
          <div>
            <button
              className="btn btn-danger mt-3"
              onClick={logOut}
              disabled={!isAuthenticated}
            >
              Logout
            </button>
            {/* <p>pub key: {pubKey}</p> */}
            <h3>
              Balance: <u> {balanceState}</u>
            </h3>
            <button
              className="btn btn-danger"
              onClick={getBalanceHandler}
              disabled={!isAuthenticated}
            >
              {" "}
              Refresh Balance
            </button>
            <br />
            <br />

            <SwapPongToCCash />
            <br />
            <SwapCCashTOPong pubKey={pubKey} />
          </div>
        ) : (
          ""
        )}

        <NotificationContainer />
      </div>
    </div>
  );
}

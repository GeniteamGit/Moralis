import React, { useState } from "react";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { ABI as SmartContractABIs } from "../blockchain/abi";
import { PONG_SWAP_ABI } from "../blockchain/pongSwapABI";
import { CONTRACTS } from "../blockchain/contracts";
import { useMoralis } from "react-moralis";
import axios from "axios";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export const SwapCCashTOPong = (props) => {
  
  const { pubKey } = props;

  const { Moralis } = useMoralis();
  const [amount, setAmount] = useState(0);

  // const options = {
  //   abi: PONG_SWAP_ABI,
  //   contractAddress: CONTRACTS.PONG_SWAP_CONTRACT_ADDRESS,
  //   functionName: "SwapCCashTOPong",
  //   params: {
  //     userAddress: pubKey,
  //     _amount: Moralis.Units.ETH(amount),
  //   },
  //   onSuccess: async (data) => {

  //     console.log("on success data = ", data);
  //     // if(data.data)
  //     NotificationManager.warning(
  //       "Swap Tranaction initialized. The may take a few minutes",
  //       "In Process",
  //       8000
  //     );
  //     const results = await data.wait();
  //     console.log("on success res = ", results);
  //     NotificationManager.success(
  //       "Swap Tranaction Successful.",
  //       "Success",
  //       5000
  //     );
  //   },
  //   onComplete: (data) => {
  //     console.log("complete");
  //     console.log(" onComplete ", data);
  //   },
  //   onError: (err) => {
  //     if (err) {
  //       console.log(" onError Swap to VCoin Tranaction ", err);
  //       NotificationManager.error(
  //         `Swap Tranaction Error ${err}`,
  //         "Error",
  //         5000
  //       );
  //     }
  //   },
  // };

  // const { fetch, data, error, isLoading } = useWeb3ExecuteFunction(options);

  const swapCCashTOPongHandler = async () => {
    console.log("aaa", amount);
    if(amount===Number(0)){
      NotificationManager.info(
        "Enter Amount to Swap",
        "Swap Amount",
        5000
      );  
      return 
    }
    NotificationManager.warning(
      "Swap Tranaction initialized. The may take a few seconds",
      "In Process",
      8000
    );
    const url =
    `${process.env.REACT_APP_SERVER_URL}/functions/SwapTOCoin?_ApplicationId=${process.env.REACT_APP_APP_ID}`;

    await axios
      .post(url, {
        from: pubKey,
        amount: Number(amount),
      })
      .then(function (res) {
        const data = res.data;
        if (data.error) {
          console.log(data.error);
        }
        else if(data.result){
          const msg = data.result; 
          console.log(msg.message);
          if(msg.message=="Success"){
          NotificationManager.success(
            "Swap Tranaction Successful.",
            "Success",
            5000
          );
        }else {
        NotificationManager.info(
          `${msg.message}`,
          "Transaction Declined",
          5000
        );
        }
        }
        else {
          console.log("res === ", data);
      
          NotificationManager.info(
            "Transcation Status unkown. Refresh Balance to findout",
            "Status",
            5000
          );
        }
        
        // NotificationManager.info(
        //   "Balance Update on Blockchain may take a few minutes.",
        //   "Info",
        //   8000
        // );
      })
      .catch(function (error) {
        const response = error.response;
        if (response.data) {
          const msg = response.data;
          console.log(response.data);
          if(msg.error)
          NotificationManager.error(
            `Swap Tranaction Error ${msg.error}`,
            "Error",
            8000
          );
        }
        else {
          console.log("res - error === ", error);
          NotificationManager.error(
            `Swap Tranaction Failed`,
            "Error",
            5000
          );
        }
      });
  };

  const changeAmountHandler = (props) => {
    //const {  } = props;
    console.log("props = ", props, " type: ", typeof props);
    if (props.length < 1) setAmount(0);
    else if (!isNaN(props)) {
      setAmount(props);
    }
  };

  return (
    // Use your custom error component to show errors
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card">
              <div className="card-header">
                <h3>Swap to Token</h3>
              </div>
              <div className="card-body">
                <input
                  type="number"
                  onChange={(e) => changeAmountHandler(e.target.value)}
                  className="form-control"
                  placeholder="Enter The Amount of virtual coins you want to swap"
                />
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if(!pubKey){
                      NotificationManager.error(
                      "Make sure you wallet is connected",
                      "Error",
                      5000
                    );
                  }
                  else
                    swapCCashTOPongHandler();
                     //fetch({ params: options });
                  }}
                >
                  Swap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* {error && <ErrorMessage error={error} />} */}
        {/* <button
              onClick={() => {
                fetch({ params: options });
              }}
            >
              Swap CCash to Pong
            </button> */}
        {/* {data && <pre>{JSON.stringify(data)}</pre>}
        {error && <pre>{JSON.stringify(error)}</pre> && console.log(error)} */}
      </div>
      <NotificationContainer />
    </div>
  );
};

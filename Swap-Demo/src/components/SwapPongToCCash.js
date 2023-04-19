import React, { useState } from "react";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { ABI as SmartContractABIs } from "../blockchain/abi";
import { SampleTokenABI } from "../blockchain/sampleTokenABI";
import { PONG_SWAP_ABI } from "../blockchain/pongSwapABI";
import { CONTRACTS } from "../blockchain/contracts";
import { useMoralis } from "react-moralis";

import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export const SwapPongToCCash = () => {
  const { Moralis } = useMoralis();
  const [amount, setAmount] = useState(0);

  const options = {
    abi: PONG_SWAP_ABI,
    contractAddress: CONTRACTS.PONG_SWAP_CONTRACT_ADDRESS,
    functionName: "swapPongToByte",
    params: {
      // userAddress: "0xE1c089D5311C09722E3bFCDf26962896c350C30E",
      _amount: Moralis.Units.ETH(amount),
    },
    onSuccess: async (data) => {
      console.log("on success data = ", data);
      NotificationManager.warning(
        "Swap Tranaction initialized. The may take a few minutes",
        "In Process",
        8000
      );
      const results = await data.wait();
      console.log("on success res = ", results);
      NotificationManager.success(
        "Swap Tranaction Successful.",
        "Success",
        5000
      );

      NotificationManager.info(
        "Balance Update on Blockchain may take a few minutes.",
        "Info",
        8000
      );
    },
    onComplete: (data) => {
      console.log("complete");
      console.log(" onComplete ", data);
    },
    onError: (err) => {
      if (err) {
        console.log(" onError Swap to VCoin Tranaction ", err);
        NotificationManager.error(
          `Swap Tranaction Error ${err}`,
          "Error",
          5000
        );
      }
    },
  };

  const { fetch, data, error, isLoading } = useWeb3ExecuteFunction(options);

  const changeAmountHandler = (props) => {
    //const {  } = props;
    console.log("props = ", props, " type: ", typeof props);
    if (props.length < 1) setAmount(0);
    else if (!isNaN(props)) {
      setAmount(props);
    }
  };

  const approveHandlerOptions = {
    abi: SampleTokenABI,
    contractAddress: CONTRACTS.SAMPLE_TOKEN_CONTRACT_ADDRESS,
    functionName: "approve",
    params: {
      //spender - give approval to smart contract to use your tokens  
      spender:  CONTRACTS.PONG_SWAP_CONTRACT_ADDRESS, //"0x813DE2A0f9C03ac2b7fB88411ecBC4a5E96E5226",
      amount: Moralis.Units.ETH(Number(amount)),
    },
    onSuccess: async (data) => {
      console.log("on success data = ", data);
      NotificationManager.warning(
        "Tranaction initialized. The may take a few minutes",
        "In Process",
        8000
      );
      const results = await data.wait();
      console.log("on success res = ", results);
      NotificationManager.success(
        "Aproval Tranaction Successful. Ready for Swap",
        "Success",
        5000
      );
      swaptoVirtualCoinHandler.fetch(options);
    },
    onComplete: (data) => {
      console.log("complete");
      console.log(" onComplete ", data);
    },
    onError: (err) => {
      if (err) {
        console.log(" onError ", err);
      }
    },
  };
  const approveHandler = useWeb3ExecuteFunction(approveHandlerOptions);
  const swaptoVirtualCoinHandler = useWeb3ExecuteFunction(options);

  return (
    // Use your custom error component to show errors

    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card">
              <div className="card-header">
                <h3>Swap to Virtual Coin</h3>
              </div>
              <div className="card-body">
                <input
                  type="number"
                  onChange={(e) => changeAmountHandler(e.target.value)}
                  className="form-control"
                  placeholder="Enter The Amount You want to Swap"
                />
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    approveHandler.fetch(approveHandlerOptions);
                    // swaptoVirtualCoinHandler.fetch(options);
                    //console.log("called");
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

        {/* {data && <pre>{JSON.stringify(data)}</pre>}
        {error && <pre>{JSON.stringify(error)}</pre> && console.log(error)} */}
      </div>
      <NotificationContainer />
    </div>
  );
};

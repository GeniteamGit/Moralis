import React from "react";
import {
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { ABI as SmartContractABIs } from "../blockchain/abi";
import { SampleTokenABI } from "../blockchain/sampleTokenABI";
import { CONTRACTS } from "../blockchain/contracts";
import { useMoralis } from "react-moralis";

export const ApproveWeb3ExecuteFunction = () => {
  // 0xdAC17F958D2ee523a2206206994597C13D831ec7 = contract address of USDT
  //const { native } = useMoralisWeb3Api();
  const { Moralis } = useMoralis();

  const ABI = SampleTokenABI; // Add ABI of 0xdAC17F958D2ee523a2206206994597C13D831ec7

  const options =  {
    abi: ABI,
    contractAddress: CONTRACTS.SAMPLE_TOKEN_CONTRACT_ADDRESS,
    functionName: "approve",
    params: {
      spender: "0xA6F4e2d9AA2A1e1A5e37E21c12AbE6BB9Bba3876",
      amount: Moralis.Units.ETH(10),
    },
    onSuccess: async (data) => {
      console.log("on success data = ", data);
      const results = await data.wait();
      console.log("on success res = ", results);
    },
    onComplete: (data) => {
      console.log("complete");
      console.log(" onComplete ",data);
    },
    onError: (err) => {
      if (err) {
        console.log(" onError ",err);
      }
    },
  }

  const { fetch, data, error, isLoading } = useWeb3ExecuteFunction(
    {
      abi: ABI,
      contractAddress: CONTRACTS.SAMPLE_TOKEN_CONTRACT_ADDRESS,
      functionName: "approve",
      params: {
        spender: "0xA6F4e2d9AA2A1e1A5e37E21c12AbE6BB9Bba3876",
        amount: Moralis.Units.ETH(10),
      },
      onSuccess: async (data) => {
        console.log("on success data = ", data);
        const results = await data.wait();
        console.log("on success res = ", results);
      },
      onComplete: (data) => {
        console.log("complete");
        console.log(" onComplete ",data);
      },
      onError: (err) => {
        if (err) {
          console.log(" onError ",err);
        }
      },
    }
  );

  
  const approveHandler = useWeb3ExecuteFunction(
    {
      abi: ABI,
      contractAddress: CONTRACTS.SAMPLE_TOKEN_CONTRACT_ADDRESS,
      functionName: "approve",
      params: {
        spender: "0xA6F4e2d9AA2A1e1A5e37E21c12AbE6BB9Bba3876",
        amount: Moralis.Units.ETH(10),
      },
      onSuccess: async (data) => {
        console.log("on success data = ", data);
        const results = await data.wait();
        console.log("on success res = ", results);
      },
      onComplete: (data) => {
        console.log("complete");
        console.log(" onComplete ",data);
      },
      onError: (err) => {
        if (err) {
          console.log(" onError ",err);
        }
      },
    }
  );

  return (
    // Use your custom error component to show errors
    <div style={{ height: "10vh", overflow: "auto" }}>
      <div>
        {/* {error && <ErrorMessage error={error} />} */}

        <button
          onClick={
            ()=>approveHandler.fetch(options)
          //   () => {
          //   fetch({ params: options });
          // }
        }
        >
          Approve
        </button>
        {data && <pre>{JSON.stringify(data)}</pre>}
        {error && <pre>{JSON.stringify(error)}</pre> && console.log(error)}
      </div>
    </div>
  );
};

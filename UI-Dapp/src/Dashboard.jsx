import React, {useEffect, useState} from "react";
import {useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction} from "react-moralis";
import {Link} from "react-router-dom";
import axios from "axios";
import Moralis from "moralis";
import Navbar from "./Navbar";
import config from './config/contract.json'
import {Spinner} from "reactstrap";
import Swal from 'sweetalert2'

const Dashboard = () => {
    const {user} = useMoralis();
    const contractProcessor = useWeb3ExecuteFunction();
    const [nfts, setNfts] = useState([]);
    const [nftImages, setNftImages] = useState([]);
    const [nftSold, setNftSold] = useState(0);
    const [nftRemaining, setNftRemaining] = useState(0);
    const [loading, setLoading] = useState(null);
    const [address, setAddress] = useState("");
    useEffect(() => {
        console.log(user);
        const _address = user.attributes.accounts[0];
        console.log(_address)
        setAddress(_address)
        setContractValue().then();
    }, []);

    const setContractValue = async () => {
        await Moralis.enableWeb3();
        let option1 = {
            contractAddress: config.address,
            functionName: "totalSupply",
            abi: config.abi,
            params: {
                note: "Getting Values"
            },
        }
        const supply = await Moralis.executeFunction(option1);
        setNftSold(supply.toNumber());
        let option2 = {
            contractAddress: config.address,
            functionName: "maxSupply",
            abi: config.abi,
            params: {
                note: "Getting Values"
            },
        }
        const remaining = await Moralis.executeFunction(option2);
        console.log(remaining.toNumber())
        setNftRemaining(remaining.toNumber() - supply.toNumber());
        // console.log(supply);
    }
    const mint = async () => {
        try {
            setLoading("minting");
            let options = {
                contractAddress: config.address,
                functionName: "mint",
                abi: config.abi,
                params: {
                    _mintAmount: 1
                },
                msgValue: Moralis.Units.ETH(0.01)
            }

            await contractProcessor.fetch({
                params: options,
                onSuccess: async (data) => {
                    console.log(data);
                    const results = await data.wait();
                    console.log(results);
                    setLoading(null);
                    await Swal.fire({
                        title: 'Minted!',
                        text: 'Transaction Successful',
                        icon: 'success',
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#198754'
                    })
                    setNftSold(nftSold + 1);
                    setNftRemaining(nftRemaining - 1);
                },
                onComplete: (data) => {
                    console.log("complete")
                    console.log(data);
                },
                onError: (e) => {
                    if (e.code === 4001) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'User Denied Transaction',
                            icon: 'error',
                            confirmButtonText: 'Close',
                            confirmButtonColor: '#F27474'
                        })
                    }
                    const parsedError = JSON.parse(JSON.stringify(e)).error;
                    if (parsedError.code === -32603) {
                        Swal.fire({
                            title: 'Error!',
                            text: parsedError.message.slice(19),
                            icon: 'error',
                            confirmButtonText: 'Close',
                            confirmButtonColor: '#F27474'
                        })
                    }
                    console.log(e);
                    setLoading(null)
                }
            })
            // const mint = await Moralis.executeFunction(options);
            // console.log(mint);
            // console.log("Button clicked")
        } catch (e) {
            console.log(e);
            setLoading(null);
        }
    };
    const getNfts = async () => {
        setLoading("gettingNfts");
        const options = {chain: 'rinkeby', address: Moralis.User.current().get("ethAddress")}
        const nfts = await Moralis.Web3.getNFTs(options);
        const filteredNfts = nfts.filter(element => element.token_address === "0x98A896131E9DA648476aE2BC4af41Eb2a57f810A".toLowerCase());
        console.log(filteredNfts);
        setNfts(filteredNfts.map(item => item.token_uri));
        const metaData = [];
        for (let element of filteredNfts.map(item => item.token_uri)) {
            const meta = await axios.get(element);
            const _image = meta.data.image.slice(7)
            metaData.push("https://ipfs.moralis.io:2053/ipfs/" + _image);
        }
        console.log(metaData);
        setNftImages(metaData);
        setLoading(null);
    }
    const dbCall = async () => {
        const nftData = Moralis.Object.extend("NftMeta");
        const query = new Moralis.Query(nftData);
        query.limit(200);
        query.equalTo("tokenId", "17");
        const result = await query.first();
        console.log(JSON.parse(JSON.stringify(result)));
    }
    return (
        <>
            <Navbar/>
            <div className="text-center my-5">
                Welcome to the dashboard <br/>
                {address}
                <div className="card w-25 ">
                    <div className="card-body text-start">
                        <h5 className="card-title">NFTs Sold:{nftSold} </h5>
                        <h6 className="card-subtitle mb-2 text-muted">Remaining:{nftRemaining} </h6>
                    </div>
                </div>
                <button className="btn btn-outline-success my-2" onClick={mint}
                        disabled={loading === "minting"}>{loading === "minting" ?
                    <Spinner color="secondary" size="sm"/> : "Mint Now"}</button>
                <br/>
                <button className="btn btn-outline-secondary" onClick={getNfts}
                        disabled={nftImages.length > 0 || loading === "gettingNfts"}>
                    {loading === "gettingNfts" ?
                        <Spinner color="info" size="sm"/> : "Get Nfts"}
                </button>
                <br/>
                <button className="btn btn-outline-warning my-2" onClick={dbCall}>Db Call</button>
                <div>
                    <div className="container my-3">
                        <div className="row">
                            {nftImages.map((item, index) => (
                                <div className="col-md-3 mb-3 " key={index}>
                                    <img src={item} alt="" className="w-100 h-100 rounded card-img-top"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Dashboard;

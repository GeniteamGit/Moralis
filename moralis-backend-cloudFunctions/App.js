/* import moralis */
const Moralis = require("moralis/node");
const config = require("./constants.json");

/* Moralis init code */
const serverUrl = config.serverUrl;
const appId = config.appId;
const masterKey = config.masterKey;

Moralis.start({ serverUrl, appId, masterKey });


const eventSyncing = async ()=>{
  const myEventFunction = await Moralis.Cloud.run("eventSyncing");
  console.log(myEventFunction);
}
const syncNftData = async ()=>{
  const mySyncFunction = await Moralis.Cloud.run("syncNftData");
  console.log(JSON.parse(JSON.stringify(mySyncFunction)));
  if(mySyncFunction.length > 0)
  console.log(true);
  else
  console.log(false);
}
const getNft = async ()=>{
  const param ={tokenId:17}
  const nftDetail = await Moralis.Cloud.run("getNft",param);
  // console.log(nftDetail);
  console.log(JSON.parse(JSON.stringify(nftDetail)));
//   if(nftDetail.length > 0)
//   console.log(true);
//   else
//   console.log(false);
}


// Function Calls

// eventSyncing();
syncNftData();
// getNft();


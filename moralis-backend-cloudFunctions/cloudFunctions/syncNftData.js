async function syncNftData() {
    const myNFTs = Moralis.Object.extend("myNFTs");
    const nftData = Moralis.Object.extend("NftMeta");
    const logger = Moralis.Cloud.getLogger();
    // const user = Moralis.Object.extend("_User");
    // const userQuery = new Moralis.Query(user);
    // const getUser = userQuery.find();
    const obj = new nftData();
    // obj.set("tokenId","10");
    // obj.save();
    const query = new Moralis.Query(myNFTs);
    query.limit(200)
    // query.equalTo("tokenId","29");
    const data = await query.find();
    const parsedData = JSON.parse(JSON.stringify(data));
    let dataToInsert = [];
    let tokens=[];
    for (let i = parsedData.length-1; i >=0; i--) {
        const element = parsedData[i];
        logger.info("main element"+ JSON.stringify(element));
        if(tokens.includes(element.tokenId)){
            logger.info("logging token"+ element.tokenId);
            let index = tokens.indexOf(element.tokenId);
            logger.info("index is"+ index);
            dataToInsert[index] = {update:{tokenId : element.tokenId, owner : element.to}}
            logger.info("data on index"+ JSON.stringify(dataToInsert[index]));
        }else{
            dataToInsert.push({update:{tokenId : element.tokenId, owner : element.to}});
            tokens.push(element.tokenId);
        }
    }
    Moralis.bulkWrite("NftMeta",dataToInsert);
    return dataToInsert;
}

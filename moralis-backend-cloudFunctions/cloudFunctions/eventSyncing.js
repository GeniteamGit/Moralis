async function getEvents(data) {
    // parsing data of events
    const obj = JSON.parse(JSON.stringify(data));
    const toAddress = obj.object.to;
    const fromAddress = obj.object.from;
    const tokenId = obj.object.tokenId;
    // create references and queries
    const NFTs = Moralis.Object.extend("NftMeta");
    const nfts = new NFTs();
    const query = new Moralis.Query(NFTs);
    // const myNFTs = Moralis.Object.extend("myNFTs");
    // query.limit(1000);
    query.equalTo("tokenId",tokenId);
    const myNftData = await query.first();
    if(JSON.parse(JSON.stringify(myNftData.tokenId))){
        // update query
        myNftData.set("owner",toAddress);
        myNftData.save();
    }else{
        // new entry
        nfts.set("tokenId", tokenId);
        nfts.set("owner", toAddress);
        await nfts.save();
    }
    return nfts;
}

async function updateMetaData(data) {
    const nftData = Moralis.Object.extend("NftMeta");
    // const obj = new nftData();
    const query = new Moralis.Query(nftData);
    query.equalTo("tokenId",data.tokenId);
    const dbObject = await query.first();
    
    // update query on object fields
    // dbObject.set("owner",data.owner)
}

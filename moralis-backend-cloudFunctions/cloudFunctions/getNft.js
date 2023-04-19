async function getNft(data) {
  //log to console on cloud
  const logger = Moralis.Cloud.getLogger();
  logger.info("my log" + JSON.stringify(data));
  // verify token
  const sessionClass = Moralis.Object.extend("_Session");
  logger.info("session class" + sessionClass);
  const sessionQuery = new Moralis.Query(sessionClass);
  logger.info("session query before" + JSON.stringify(sessionQuery));
  sessionQuery.equalTo("sessionToken", data.ssToken);
  logger.info("session query" + JSON.stringify(sessionQuery));
  const sessionObject = await sessionQuery.first({ useMasterKey: true });
  const parsedToken = JSON.parse(JSON.stringify(sessionObject)).sessionToken;

  const parsedUser = JSON.parse(JSON.stringify(sessionObject)).user;
  const userId = parsedUser.objectId;
  const userClass = Moralis.Object.extend("_User");
  const userQuery = new Moralis.Query(userClass);
  userQuery.equalTo("objectId",userId);
  const dbUser = await userQuery.first({useMasterKey:true});
  const userEthAddress = JSON.parse(JSON.stringify(dbUser)).ethAddress;

  if (parsedToken === data.ssToken) {
    const nftData = Moralis.Object.extend("NftMeta");
    const query = new Moralis.Query(nftData);
    query.limit(200);
    query.equalTo("tokenId", String(data.tokenId));
    const myData = await query.first({ useMasterKey: true });
    // return JSON.parse(JSON.stringify(myData));
    if(JSON.parse(JSON.stringify(myData)).owner === userEthAddress)
    return myData;
    else return "User not Authenticated";
  } 
  else return "User not Authenticated";

  // logger.info("sessionObject" + sessionObject);
  // return userEthAddress;
}

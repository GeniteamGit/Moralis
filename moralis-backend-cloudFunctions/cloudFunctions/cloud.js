Moralis.Cloud.define("eventSyncing", async (request) => {
  return getEvents(request.params);
});
Moralis.Cloud.define("syncNftData", async (request) => {
  return syncNftData(request.params);
});
Moralis.Cloud.define("updateMetaData", async (request) => {
  return updateMetaData(request.params);
});
Moralis.Cloud.define("getNft", async (request) => {
  return getNft(request.params);
});

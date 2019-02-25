var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "zFcg9tDplUdTUacg02GQ";
var mnemonic = "remember lion sport action vapor height enrich edit away civil dove balance";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3
    }
  }
};

const {VolumeFactoryAbi} = require("./abis/volume-factory-abi");
const {volumeFactory, rpcUrl} = require("./config");

const Web3 = require('web3');
let web3 = new Web3(rpcUrl);


import Big from "big.js";
import {getDataForRefuel} from "./volume-core";
import configs from "./config";

const {ipfsGateway} = require('./config.js');
const {VolumeFactoryAbi} = require("./abis/volume-factory-abi");
const {volumeFactory, rpcUrl} = require("./config");

const Web3 = require('web3');
let web3 = new Web3(rpcUrl);

const {toWei} = web3.utils;

export async function getJSONFromIPFS (hash) {
    return new Promise((res, rej) => {
        fetch(`${ipfsGateway.address}${hash}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            )
            .then(async (json) => {
                res(await json.json());
            })
            .catch((err) => {
                rej(err);
            });
    });
}

// const getAddCreatorData = (newCreator) => {
//     const factory = new web3.eth.Contract(VolumeFactoryAbi, volumeFactory);
//     return factory.methods.addCreator(newCreator).encodeABI();
// }

export async function getCollections() {
    const factory = new web3.eth.Contract(VolumeFactoryAbi, volumeFactory);
    return factory.methods.getAllCategories().call();
}

export async function getQuoteForAddress(address) {
    const factory = new web3.eth.Contract(VolumeFactoryAbi, volumeFactory);
    return factory.methods.getQuoteForNFTPurchase(address).call();
}

export function getDataForBuyNftForAddress(nftAddress, amount, slippage) {
    const factory = new web3.eth.Contract(VolumeFactoryAbi, volumeFactory);
    return factory.methods.buyForNFTAddress(nftAddress, toWei(amount.toString()), slippage*10).encodeABI();
}
import {VolumeInoAbi} from "./abis/volume-ino-abi";
import {rpcUrl, volumeINO} from "./config.js";
import Big from "big.js";

const Web3 = require('web3');
let web3 = new Web3(rpcUrl);
const {toWei} = web3.utils;

export function getDataForApplication(
    name,
    symbol,
    description,
    URI,
    minPrice,
    maxPrice,
    totalSupply,
    perkLevels,
    artistName,
    artistSocial
) {
    const ino = new web3.eth.Contract(VolumeInoAbi, volumeINO);
    return ino.methods.applyForCategory(
        name,
        symbol,
        description,
        URI,
        toWei(minPrice),
        toWei(maxPrice),
        totalSupply,
        perkLevels,
        artistName,
        artistSocial
    ).encodeABI();
}
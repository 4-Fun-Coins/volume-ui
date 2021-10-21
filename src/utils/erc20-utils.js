import {Erc20Abi} from "./abis/erc20-abi";
import {rpcUrl} from "./config.js";

const Web3 = require('web3');
let web3 = new Web3(rpcUrl);

const {toWei} = web3.utils;

export const getDataForApprove = (tokenAddress, spender, amount) => {
    const token = new web3.eth.Contract(Erc20Abi, tokenAddress);

    return token.methods.approve(spender, toWei(amount.toString())).encodeABI();
}
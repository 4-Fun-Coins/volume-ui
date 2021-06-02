const Web3 = require('web3');
const {volumeAddress} = require('./config.js');
const Big = require('big-js');

let web3 = new Web3("ws://localhost:8545");

let volumeABI = [
    {
        "inputs": [],
        "name": "getFuel",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function getFuel() {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        volume.methods.getFuel().call((error, fuel) => {
            if (error)
                reject(error);

            resolve(web3.utils.fromWei(fuel));
        });
    });
}

module.exports = {
    getFuel
}
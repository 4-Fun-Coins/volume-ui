const Web3 = require('web3');
const {volumeAddress} = require('./config.js');

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
    },
    {
        "inputs": [],
        "name": "getTotalFuelAdded",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "getUserFuelAdded",
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

async function getTotalFuelAdded() {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        volume.methods.getTotalFuelAdded().call((error, totalFuel) => {
            if (error)
                reject(error);

            resolve(web3.utils.fromWei(totalFuel));
        });
    });
}

async function getFuelAddedForAddress(address) {
    return new Promise((resolve, reject) => {
        if (web3.utils.isAddress(address)) {
            if (web3.utils.checkAddressChecksum(address)) {
                const volume = new web3.eth.Contract(volumeABI, volumeAddress);
                volume.methods.getUserFuelAdded(address).call((error, totalFuelForAddress) => {
                    if (error)
                        reject(error);

                    resolve(web3.utils.fromWei(totalFuelForAddress));
                });
            } else {
                reject(false);
            }
        } else {
            reject(false);
        }
    });


}

module.exports = {
    getFuel,
    getTotalFuelAdded,
    getFuelAddedForAddress
}
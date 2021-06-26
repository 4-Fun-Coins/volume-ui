const Web3 = require('web3');
const {volumeAddress, testNetUrl} = require('./config.js');
const Big = require('big.js');
let web3 = new Web3(testNetUrl);
let {volumeABI} = require('./volume-abi');

export async function getFuel() {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        volume.methods.getFuel().call((error, fuel) => {
            if (error)
                reject(error);

            resolve(web3.utils.fromWei(fuel));
        });
    });
}

export async function getTotalFuelAdded() {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        volume.methods.getTotalFuelAdded().call((error, totalFuel) => {
            if (error)
                reject(error);

            resolve(web3.utils.fromWei(totalFuel));
        });
    });
}

export async function getFuelAddedForAddress(address) {
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

export async function getSortedLeaderboard() {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        volume.methods.getAllUsersLength().call((err, len) => {
            if (err)
                reject(err);

            volume.methods.getAllUsersFuelAdded(0, web3.utils.toWei(len)).call((error, allUsersFuel) => {
                if (error)
                    reject(error);

                // copy arr
                let dumArr = [];
                for (let i = 0; i < allUsersFuel.length; i++) {
                    dumArr.push(allUsersFuel[i]);
                }
                dumArr.sort(sortFunction);
                resolve(dumArr.slice(1, dumArr.length));
            });
        });
    });
}

export async function getBalanceForAddress(address) {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        volume.methods.balanceOf(address).call((error, balance) => {
            if (error)
                reject(error);

            resolve(web3.utils.fromWei(balance));
        });
    });
}

export async function estimateGasForRefuel(_from, amount) {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        web3.eth.getGasPrice().then((_gasPrice) => {
            volume.methods.directRefuel(web3.utils.toWei(new Big(amount).toString())).estimateGas({
                from: _from,
                gasPrice: _gasPrice
            }, (error, estPrice) => {
                if (error)
                    reject(error);

                resolve(estPrice);
            });
        });
    });
}

export async function getGasPrice() {
    return new Promise((resolve, reject) => {
        web3.eth.getGasPrice((err, gasPrice) => {
            if (err)
                reject(err);

            resolve(gasPrice);
        });
    });
}

export function getDataForRefuel(amount) {
    const volume = new web3.eth.Contract(volumeABI, volumeAddress);
    return volume.methods.directRefuel(web3.utils.toWei(new Big(amount).toString())).encodeABI();
}

// === HELPER FUNCTIONS === //

const sortFunction = (a, b) => {
    if (a.fuelAdded === b.fuelAdded) {
        return 0;
    }
    else {
        return (a.fuelAdded > b.functions) ? -1 : 1;
    }
}

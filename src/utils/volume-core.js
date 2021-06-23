const Web3 = require('web3');
const {testVolumeAddress, testNetUrl} = require('./config.js');
const Big = require('big.js');
let web3 = new Web3(testNetUrl);
let {volumeABI} = require('./volume-abi');

export async function getFuel() {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, testVolumeAddress);
        volume.methods.getFuel().call((error, fuel) => {
            if (error)
                reject(error);

            resolve(web3.utils.fromWei(fuel));
        });
    });
}

export async function getTotalFuelAdded() {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, testVolumeAddress);
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
                const volume = new web3.eth.Contract(volumeABI, testVolumeAddress);
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
        const volume = new web3.eth.Contract(volumeABI, testVolumeAddress);
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

const sortFunction = (a, b) => {
    if (a.fuelAdded === b.fuelAdded) {
        return 0;
    }
    else {
        return (a.fuelAdded > b.functions) ? -1 : 1;
    }
}

import {VolumeJackpotABI} from "./volume-jackpot-abi";

const Web3 = require('web3');
const {volumeAddress, rpcUrl, volumeJackpotAddress} = require('./config.js');
const Big = require('big.js');
const {volumeABI} = require('./volume-abi');
const {volumeJackpotABI} = require('./volume-jackpot-abi');

let web3 = new Web3(rpcUrl);

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

            volume.methods.getAllUsersFuelAdded(0, web3.utils.toWei(len)).call(async (error, allUsersFuel) => {
                if (error)
                    reject(error);

                // promise mapping
                let dumArr = await Promise.all(
                    allUsersFuel.map(async (user) => {
                        const userNickname = await volume.methods.getNicknameForAddress(user.user).call();

                        return {
                            user: user.user,
                            fuelAdded: user.fuelAdded,
                            nickname: userNickname
                        }
                    })
                );

                dumArr = dumArr.sort(sortFunction);
                resolve(dumArr.slice(0, dumArr.length - 1));
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

export async function getNickname(address) {
    const volume = new web3.eth.Contract(volumeABI, volumeAddress);
    return new Promise((resolve, reject) => {
        volume.methods.getNicknameForAddress(address).call((err, nickname) => {
            if (err)
                reject(err);

            resolve(nickname);
        });
    });
}

export async function checkNickname(nickname) {
    const volume = new web3.eth.Contract(volumeABI, volumeAddress);
    return new Promise((resolve, reject) => {
        volume.methods.canClaimNickname(nickname).call((err, canClaim) => {
            if (err)
                reject(err);

            resolve(canClaim);
        });
    });
}

export function getDataForClaimNickname(nickname) {
    const volume = new web3.eth.Contract(volumeABI, volumeAddress);
    return volume.methods.claimNickname(nickname).encodeABI();
}

export async function estimateGasForClaim(_from, nickname) {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        web3.eth.getGasPrice().then((_gasPrice) => {
            volume.methods.claimNickname(nickname).estimateGas({
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

export async function getAllMilestonesAndFuelForAddress(address) {
    return new Promise((resolve, reject) => {

        const volumeJackpot = new web3.eth.Contract(VolumeJackpotABI, volumeJackpotAddress);
        volumeJackpot.methods.getAllMilestones().call(async (err, milestones) => {
            if (err)
                reject(err);

            resolve(await Promise.all(
                milestones.map(async milestone => {
                    const fuelAdded = await volumeJackpot.methods.getFuelAddedInMilestone(milestone.startBlock, address).call();

                    return {
                        name: milestone.name,
                        fuelAdded: web3.utils.fromWei(fuelAdded)
                    }
                })
            ));
        });
    });
}

export async function getAllMilestones() {
    return new Promise((resolve, reject) => {
        const volumeJackpot = new web3.eth.Contract(VolumeJackpotABI, volumeJackpotAddress);
        volumeJackpot.methods.getAllMilestones().call((err, milestones) => {
            if (err)
                reject(err);

            resolve(milestones);
        });
    })
}

export async function getCurrentBlock() {
    return await web3.eth.getBlock("latest");
}

export async function getAllContributorsForMilestone(id) {
    return new Promise((resolve, reject) => {
        const volumeJackpot = new web3.eth.Contract(VolumeJackpotABI, volumeJackpotAddress);
        volumeJackpot.methods.getAllParticipantsInMilestone(id).call(async (err, participants) => {
            if (err)
                reject(err);

            // map and get fuel added for each participant
            let fuelAddedPerParticipant = await Promise.all(participants.map(async participant => {
                    const nickname = await getNickname(participant);
                    const fuelAdded = await volumeJackpot.methods.getFuelAddedInMilestone(id, participant).call();

                    return {
                        participant: nickname === "" ? `${participant.slice(0, 6)}...${participant.slice(participant.length-5, participant.length-1)}` : nickname,
                        fuelAdded: web3.utils.fromWei(fuelAdded)
                    }
            }));

            resolve(fuelAddedPerParticipant.sort(sortFunction));
        });
    })
}

// === HELPER FUNCTIONS === //

const sortFunction = (a, b) => {
    return new Big(b.fuelAdded).minus(a.fuelAdded);
}

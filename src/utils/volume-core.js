import {VolumeJackpotABI} from "./abis/volume-jackpot-abi";

const Web3 = require('web3');
const {volumeAddress, rpcUrl, volumeJackpotAddress, volumeFaucet, chainId} = require('./config.js');
const Big = require('big.js');
const {volumeABI} = require('./abis/volume-abi');
const {VolumeFaucetAbi} = require('./abis/volume-faucet-abi');

let web3 = new Web3(rpcUrl);
const {BN} = web3.utils;

export async function getFuel() {
    return new Promise((resolve, reject) => {
        const volume = new web3.eth.Contract(volumeABI, volumeAddress);
        volume.methods.getFuel().call((error, fuel) => {
            if (error)
                reject(error);

            resolve(web3.utils.fromWei(new BN(fuel)));
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
        volumeJackpot.methods.getAllMilestones().call(async (err, milestones) => {
            if (err) {
                reject(err);
                return;
            }
            const formattedMilestones = await Promise.all(milestones.map(async (milestone, index) => {
                const participants = await getAllContributorsForMilestone(milestone.startBlock);
                const block = await getCurrentBlock();
                const status = milestone.endBlock < block ?
                    'past' : milestone.startBlock <= block ? 'active' : 'future'
                return {
                    status,
                    startBlock: milestone.startBlock,
                    endBlock: milestone.endBlock,
                    startTime: await blockToDate(milestone.startBlock),
                    endTime: await blockToDate(milestone.endBlock),
                    name: milestone.name,
                    amountInPot: milestone.amountInPot, // total Vol deposited for this milestone rewards
                    totalFuelAdded: milestone.totalFuelAdded,
                    participants: participants,
                    winners: await getWinnersForMilestone(milestone.startBlock)
                }
            }))

            resolve(formattedMilestones);
        });
    })
}

export async function getActiveMilestone() {
    return new Promise((resolve, reject) => {
        const volumeJackpot = new web3.eth.Contract(VolumeJackpotABI, volumeJackpotAddress);
        volumeJackpot.methods.getCurrentActiveMilestone().call((err, milestone) => {
            if (err)
                reject(err);

            resolve(milestone);
        });
    })
}

export async function getAllContributorsForMilestone(id) {
    return new Promise((resolve, reject) => {
        const volumeJackpot = new web3.eth.Contract(VolumeJackpotABI, volumeJackpotAddress);
        volumeJackpot.methods.getAllParticipantsInMilestone(id).call(async (err, participants) => {
            if (err)
                reject(err);

            // map and get fuel added for each participant
            let fuelAddedPerParticipant = await Promise.all(participants.map(async (participant, index) => {
                const nickname = await getNickname(participant);
                const fuelAdded = await volumeJackpot.methods.getFuelAddedInMilestone(id, participant).call();

                return {
                    participant: nickname === "" ? `${participant.slice(0, 6)}...${participant.slice(participant.length - 5, participant.length - 1)}` : nickname,
                    nickname,
                    address: participant,
                    fuelAdded: fuelAdded,
                }
            }));

            resolve(fuelAddedPerParticipant.sort(sortFunction).map((element, index) => {
                return {rank: index + 1, ...element}
            }));
        });
    })
}

export const getWinnersForMilestone = async (milestoneID) => {
    const volumeJackpot = new web3.eth.Contract(VolumeJackpotABI, volumeJackpotAddress);

    let winners = await volumeJackpot.methods.getWinners(milestoneID).call()
    let amounts = await volumeJackpot.methods.getWinningAmounts(milestoneID).call()

    return winners ? winners.map((winner, index) => {
        return {
            address: winner,
            amount: amounts[index]
        }
    }) : []
}

export const getClaimableWinnings = async (address) => {
    const volumeJackpot = new web3.eth.Contract(VolumeJackpotABI, volumeJackpotAddress);

    return volumeJackpot.methods.getClaimableAmount(address).call();
}

export const getCurrentTotalSupply = async () => {
    const volume = new web3.eth.Contract(volumeABI, volumeAddress);

    return await volume.methods.totalSupply().call();
}

export const getCurrentBlock = async () => {
    return await web3.eth.getBlockNumber();
}

export const blockToDate = async (blocknumber) => {
    const currentBlock = await getCurrentBlock();

    if (blocknumber <= currentBlock)
        return (await web3.eth.getBlock(blocknumber)).timestamp
    else {
        const difference = blocknumber - currentBlock;
        const averageBlockTime = await getAverageBlockTime();
        return (Date.now() + (averageBlockTime * difference * 1000)) / 1000;
    }
}

/**
 *
 * @returns {Promise<number>} average time is seconds
 */
export const getAverageBlockTime = async () => {
    // we average the future bloc time based on the average bloc time in the last one million block
    const currentBlock = await getCurrentBlock();
    const pastBlockTime = (await web3.eth.getBlock(currentBlock - 1000000)).timestamp;
    const currentBlockTime = (await web3.eth.getBlock(currentBlock)).timestamp;
    return (currentBlockTime - pastBlockTime) / 1000000
}

// === FAUCET FUNCTIONS === //
export const estimateGasForFaucetClaim = (_from) => {
    const volumeFaucetContract = new web3.eth.Contract(VolumeFaucetAbi, volumeFaucet);
    return new Promise((resolve, reject) => {
        web3.eth.getGasPrice().then((_gasPrice) => {
            volumeFaucetContract.methods.claimTestVol().estimateGas({
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
export const claimTestVol = async (wallet) => {
    const volumeFaucetContract = new web3.eth.Contract(VolumeFaucetAbi, volumeFaucet);
    const data = volumeFaucetContract.methods.claimTestVol().encodeABI();

    return new Promise((resolve, reject) => {
        const transactionParams = {
            nonce: '0x00',
            to: volumeFaucet,
            from: wallet.account,
            data: data,
            chainId: chainId
        }

        wallet.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParams]
        }).then((txHash) => {
            resolve(txHash);
        }).catch(err => {
            reject(err);
        })
    });
}

export const canClaimTestVol = async (address) => {
    const volumeFaucetContract = new web3.eth.Contract(VolumeFaucetAbi, volumeFaucet);
    return volumeFaucetContract.methods.canClaim(address).call();
}

export const getTakeOffBlock = async () => {
    const volume = new web3.eth.Contract(volumeABI, volumeAddress);
    return (await volume.methods.getTakeoffBlock().call()) / 10 ** 18;
}

// TODO Add a timeout to avoid getting stuck
export const waitForTransaction = async (pendingTxHash) => {
    return new Promise(async (resolve, reject) => {
        let receipt;
        do {
            await sleep(3000); // this will be roughly one block on BSC main net
            receipt = await web3.eth.getTransactionReceipt(pendingTxHash);
        } while (!receipt)
        resolve(receipt)
    })
}

export const getWinnersAndAmounts = (participants, totalPot, winnersCount) => {
    totalPot = new BN(totalPot);
    const ratios = [new BN('25'), new BN('15'), new BN('10'), new BN('50')]
    let potLeft = totalPot;

    let amounts = [];
    let winners = [];

    for (let i = 0; i < winnersCount && i < participants.length; i++) {
        const ratio = ratios[i < 3 ? i : 3];
        amounts[i] = new BN(totalPot).mul(ratio).div(new BN('100'));

        if (i > 2)
            amounts[i] = amounts[i].div(new BN((winnersCount - 3) + ''));
        potLeft = potLeft.sub(amounts[i]);
        winners[i] = participants[i].address;
    }
    if (potLeft.gt(new BN('0'))) {

        const share = potLeft.div(new BN('' + amounts.length));
        amounts = amounts.map(amount => {
            potLeft = potLeft.sub(share);
            return amount.add(share);
        });

        if (potLeft.gt(new BN('0'))) {
            amounts[0] = amounts[0].add(potLeft);
            potLeft = potLeft.sub(potLeft);
        }
    }

    let total = new BN("0")
    amounts.forEach(amount => {
        total = total.add(amount);
    });
    if (!total.eq(totalPot)) console.warn("Winning amounts calculations are not right");
    const wins = {};
    winners.forEach((winner, index) => {
        wins[winner] = amounts[index].div(new BN(10 ** 18 + '')).toNumber();
    })
    return wins;
}

// === HELPER FUNCTIONS === //

const sortFunction = (a, b) => {
    return new Big(b.fuelAdded).minus(a.fuelAdded);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
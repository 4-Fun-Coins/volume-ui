export const VolumeJackpotABI = [{
    "inputs": [{
        "internalType": "address",
        "name": "multisig_",
        "type": "address"
    }, {"internalType": "address", "name": "escrow_", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "inputs": [],
    "name": "BASE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "MAX_INT_TYPE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "allowedDepositer_", "type": "address"}],
    "name": "addDepositer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "burnItAfterCrash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "user_", "type": "address"}],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "startBlock_", "type": "uint256"}, {
        "internalType": "string",
        "name": "milestoneName_",
        "type": "string"
    }], "name": "createMilestone", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "amount_", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "fuelContributed_",
        "type": "uint256"
    }, {"internalType": "address", "name": "creditsTo_", "type": "address"}],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "amount_", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "milestoneId_",
        "type": "uint256"
    }], "name": "depositIntoMilestone", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "getAllMilestones",
    "outputs": [{
        "components": [{
            "internalType": "uint256",
            "name": "startBlock",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "endBlock", "type": "uint256"}, {
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {"internalType": "uint256", "name": "amountInPot", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "totalFuelAdded",
            "type": "uint256"
        }], "internalType": "struct MileStone[]", "name": "", "type": "tuple[]"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}],
    "name": "getAllParticipantsInMilestone",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "user_", "type": "address"}],
    "name": "getClaimableAmount",
    "outputs": [{"internalType": "uint256", "name": "claimableAmount", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "user_", "type": "address"}, {
        "internalType": "uint256",
        "name": "milestone_",
        "type": "uint256"
    }],
    "name": "getClaimableAmountForMilestone",
    "outputs": [{"internalType": "uint256", "name": "claimableAmount", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getCurrentActiveMilestone",
    "outputs": [{
        "components": [{
            "internalType": "uint256",
            "name": "startBlock",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "endBlock", "type": "uint256"}, {
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {"internalType": "uint256", "name": "amountInPot", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "totalFuelAdded",
            "type": "uint256"
        }], "internalType": "struct MileStone", "name": "", "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}, {
        "internalType": "address",
        "name": "participant_",
        "type": "address"
    }],
    "name": "getFuelAddedInMilestone",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}],
    "name": "getMilestoneForId",
    "outputs": [{
        "components": [{
            "internalType": "uint256",
            "name": "startBlock",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "endBlock", "type": "uint256"}, {
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {"internalType": "uint256", "name": "amountInPot", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "totalFuelAdded",
            "type": "uint256"
        }], "internalType": "struct MileStone", "name": "", "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}],
    "name": "getMilestoneIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneIindex_", "type": "uint256"}],
    "name": "getMilestoneatIndex",
    "outputs": [{
        "components": [{
            "internalType": "uint256",
            "name": "startBlock",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "endBlock", "type": "uint256"}, {
            "internalType": "string",
            "name": "name",
            "type": "string"
        }, {"internalType": "uint256", "name": "amountInPot", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "totalFuelAdded",
            "type": "uint256"
        }], "internalType": "struct MileStone", "name": "", "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getMilestonesLength",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}, {
        "internalType": "address",
        "name": "participant_",
        "type": "address"
    }],
    "name": "getParticipationAmountInMilestone",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}],
    "name": "getPotAmountForMilestonre",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}],
    "name": "getWinners",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "user_", "type": "address"}, {
        "internalType": "uint256",
        "name": "milestone_",
        "type": "uint256"
    }],
    "name": "getWinningAmount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}],
    "name": "getWinningAmounts",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "potentialDepositer_", "type": "address"}],
    "name": "isDepositer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "depositerToBeRemoved_", "type": "address"}],
    "name": "removeDepositer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "milestoneId_", "type": "uint256"}, {
        "internalType": "address[]",
        "name": "winners_",
        "type": "address[]"
    }, {"internalType": "uint256[]", "name": "amounts_", "type": "uint256[]"}],
    "name": "setWinnersForMilestone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}];
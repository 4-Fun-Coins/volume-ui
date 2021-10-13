export const FarmABI = [{
    "inputs": [{
        "internalType": "contract IBEP20",
        "name": "bep20_",
        "type": "address"
    }, {"internalType": "uint256", "name": "rewardPerBlock_", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "startBlock_",
        "type": "uint256"
    }], "stateMutability": "nonpayable", "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "Deposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "EmergencyWithdraw",
    "type": "event"
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
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
        "indexed": true,
        "internalType": "uint256",
        "name": "pid",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "Withdraw",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "allocPoint_",
        "type": "uint256"
    }, {"internalType": "contract IBEP20", "name": "lpToken_", "type": "address"}, {
        "internalType": "bool",
        "name": "withUpdate_",
        "type": "bool"
    }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "bep20",
    "outputs": [{"internalType": "contract IBEP20", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "pid_", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "amount_",
        "type": "uint256"
    }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "pid_", "type": "uint256"}, {
        "internalType": "address",
        "name": "user_",
        "type": "address"
    }],
    "name": "deposited",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_pid", "type": "uint256"}],
    "name": "emergencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "endBlock",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "amount_", "type": "uint256"}],
    "name": "fund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "rewardPerBlock_", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "startBlock_",
        "type": "uint256"
    }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "massUpdatePools",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "paidOut",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "pid_", "type": "uint256"}, {
        "internalType": "address",
        "name": "user_",
        "type": "address"
    }],
    "name": "pending",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "poolInfo",
    "outputs": [{"internalType": "contract IBEP20", "name": "lpToken", "type": "address"}, {
        "internalType": "uint256",
        "name": "allocPoint",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "lastRewardBlock", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "accBEP20PerShare",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "stakedAmount", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "poolLength",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "rewardPerBlock",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "pid_", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "allocPoint_",
        "type": "uint256"
    }, {"internalType": "bool", "name": "withUpdate_", "type": "bool"}],
    "name": "set",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "startBlock",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalAllocPoint",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalPending",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "pid_", "type": "uint256"}],
    "name": "updatePool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}, {
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "name": "userInfo",
    "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "rewardDebt",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "pid_", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "amount_",
        "type": "uint256"
    }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}];
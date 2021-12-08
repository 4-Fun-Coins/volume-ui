export const VolumeFactoryAbi = [{
    "inputs": [{
        "internalType": "address",
        "name": "_treasury",
        "type": "address"
    }, {"internalType": "address", "name": "_volume", "type": "address"}, {
        "internalType": "address",
        "name": "_linkAddress",
        "type": "address"
    }, {"internalType": "address", "name": "_VRFCoordinator", "type": "address"}, {
        "internalType": "bytes32",
        "name": "_keyHash",
        "type": "bytes32"
    }, {"internalType": "uint8", "name": "feeMultiplier", "type": "uint8"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "string", "name": "name", "type": "string"}, {
        "indexed": true,
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "collectionOwner", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalSupply",
        "type": "uint256"
    }],
    "name": "ADD_CATEGORY",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "buyer", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "collectible",
        "type": "address"
    }, {"indexed": false, "internalType": "uint8", "name": "rarity", "type": "uint8"}],
    "name": "ISSUE_VOLUME_COLLECTIBLE",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "buyer", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "collectible",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"}],
    "name": "REQUEST_VOLUME_COLLECTIBLE",
    "type": "event"
}, {
    "inputs": [{"internalType": "string", "name": "_name", "type": "string"}, {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
    }, {"internalType": "string", "name": "_description", "type": "string"}, {
        "internalType": "string",
        "name": "_URI",
        "type": "string"
    }, {"internalType": "uint256", "name": "_minPrice", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "_maxPrice",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "_numTokens", "type": "uint256"}, {
        "internalType": "uint8[]",
        "name": "_perkLevels",
        "type": "uint8[]"
    }, {"internalType": "address", "name": "_collectionOwner", "type": "address"}, {
        "internalType": "string",
        "name": "_artistName",
        "type": "string"
    }, {"internalType": "string", "name": "_artistSocial", "type": "string"}],
    "name": "addCategory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_newCreator", "type": "address"}],
    "name": "addCreator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_address", "type": "address"}, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "slippage", "type": "uint256"}],
    "name": "buyForNFTAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_c", "type": "address"}],
    "name": "getAddressIsCreator",
    "outputs": [{"internalType": "bool", "name": "isCreator", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [], "name": "getAllCategories", "outputs": [{
        "components": [{"internalType": "string", "name": "name", "type": "string"}, {
            "internalType": "string",
            "name": "description",
            "type": "string"
        }, {"internalType": "string", "name": "URI", "type": "string"}, {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
        }, {"internalType": "uint256", "name": "number", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "totalSupply",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "minPrice", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "maxPrice",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "leftForPurchase", "type": "uint256"}, {
            "internalType": "uint8[]",
            "name": "perkLevels",
            "type": "uint8[]"
        }, {"internalType": "address", "name": "categoryOwner", "type": "address"}, {
            "internalType": "string",
            "name": "artistName",
            "type": "string"
        }, {"internalType": "string", "name": "artistSocial", "type": "string"}, {
            "internalType": "bool",
            "name": "mutex",
            "type": "bool"
        }, {"internalType": "uint256", "name": "createdAt", "type": "uint256"}],
        "internalType": "struct VolumeNFTFactory.Category[]",
        "name": "",
        "type": "tuple[]"
    }], "stateMutability": "view", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_address", "type": "address"}],
    "name": "getCategoryByNFTAddress",
    "outputs": [{
        "components": [{"internalType": "string", "name": "name", "type": "string"}, {
            "internalType": "string",
            "name": "description",
            "type": "string"
        }, {"internalType": "string", "name": "URI", "type": "string"}, {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
        }, {"internalType": "uint256", "name": "number", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "totalSupply",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "minPrice", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "maxPrice",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "leftForPurchase", "type": "uint256"}, {
            "internalType": "uint8[]",
            "name": "perkLevels",
            "type": "uint8[]"
        }, {"internalType": "address", "name": "categoryOwner", "type": "address"}, {
            "internalType": "string",
            "name": "artistName",
            "type": "string"
        }, {"internalType": "string", "name": "artistSocial", "type": "string"}, {
            "internalType": "bool",
            "name": "mutex",
            "type": "bool"
        }, {"internalType": "uint256", "name": "createdAt", "type": "uint256"}],
        "internalType": "struct VolumeNFTFactory.Category",
        "name": "",
        "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_categoryNum", "type": "uint256"}],
    "name": "getCategoryByNumber",
    "outputs": [{
        "components": [{"internalType": "string", "name": "name", "type": "string"}, {
            "internalType": "string",
            "name": "description",
            "type": "string"
        }, {"internalType": "string", "name": "URI", "type": "string"}, {
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
        }, {"internalType": "uint256", "name": "number", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "totalSupply",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "minPrice", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "maxPrice",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "leftForPurchase", "type": "uint256"}, {
            "internalType": "uint8[]",
            "name": "perkLevels",
            "type": "uint8[]"
        }, {"internalType": "address", "name": "categoryOwner", "type": "address"}, {
            "internalType": "string",
            "name": "artistName",
            "type": "string"
        }, {"internalType": "string", "name": "artistSocial", "type": "string"}, {
            "internalType": "bool",
            "name": "mutex",
            "type": "bool"
        }, {"internalType": "uint256", "name": "createdAt", "type": "uint256"}],
        "internalType": "struct VolumeNFTFactory.Category",
        "name": "",
        "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getNumberOfCategories",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_nftAddress", "type": "address"}],
    "name": "getQuoteForNFTPurchase",
    "outputs": [{"internalType": "uint256", "name": "quote", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes32", "name": "requestId", "type": "bytes32"}, {
        "internalType": "uint256",
        "name": "randomness",
        "type": "uint256"
    }], "name": "rawFulfillRandomness", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_oldCreator", "type": "address"}],
    "name": "removeCreator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]
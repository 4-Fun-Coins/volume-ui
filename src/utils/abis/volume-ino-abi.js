export const VolumeInoAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftFactoryAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_treasuryAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_daiAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "name": "ACCEPTED_CATEGORY",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "applicant",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalSupply",
                "type": "uint256"
            }
        ],
        "name": "APPLIED_FOR_CATEGORY",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_URI",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_minPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_maxPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_numTokens",
                "type": "uint256"
            },
            {
                "internalType": "uint8[]",
                "name": "_perkLevels",
                "type": "uint8[]"
            },
            {
                "internalType": "string",
                "name": "_artistName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_artistSocial",
                "type": "string"
            }
        ],
        "name": "applyForCategory",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_accepted",
                "type": "address"
            }
        ],
        "name": "acceptAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_declined",
                "type": "address"
            }
        ],
        "name": "declineAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_applicant",
                "type": "address"
            }
        ],
        "name": "getApplicationForAddress",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "URI",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalSupply",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "maxPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint8[]",
                        "name": "perkLevels",
                        "type": "uint8[]"
                    },
                    {
                        "internalType": "address",
                        "name": "applicant",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "artistName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "artistSocial",
                        "type": "string"
                    }
                ],
                "internalType": "struct VolumeINO.Application",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_applicant",
                "type": "address"
            }
        ],
        "name": "getAppliedForAddress",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newMod",
                "type": "address"
            }
        ],
        "name": "giveModerator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_mod",
                "type": "address"
            }
        ],
        "name": "revokeModerator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
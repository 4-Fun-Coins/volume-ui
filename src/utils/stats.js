const {startingBlock, volumeAddress} = require('./config');
const Big = require('big-js');
const Web3 = require('web3');
const web3 = new Web3("ws://localhost:8545");

const erc20TransferEvent = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]


const getStats = async (address) => {
    let totalBurned = 0;

    const transferHex = getEncodedTransfer();

    const logs = await getLogs();

    console.log(logs);

    for (let i = 0; i < logs.length; i++) {
        if (logs[i].address === volumeAddress) {
            if (logs[i].topics[0] === transferHex) {

                const decodedTransfer = getDecodedTransfer(logs[i].data, logs[i].topics);

                console.log(decodedTransfer);
                if (decodedTransfer.from === address) { // from address
                    if (web3.utils.toBN(decodedTransfer.to).toString() === new Big(0).toString()) { // burned
                        // Check the amount and add it to the total
                        totalBurned += web3.utils.fromWei(decodedTransfer.amount);
                    }
                }
            }
        }
    }

    // Calculate the amount of blocks added


    // Calculate the ~ amount of seconds added


    return ({
        amountOfBlocks: 0,
        amountOfSeconds: 0
    });
}

const getEncodedTransfer = () => {
    return web3.eth.abi.encodeEventSignature("Transfer(address,address,uint256)");
}

const getDecodedTransfer = (data, topics) => {
    return web3.eth.abi.decodeLog([{
            type: 'address',
            name: 'from',
            indexed: true
        },{
            type: 'address',
            name: 'to',
            indexed: true
        },{
            type: 'uint256',
            name: 'amount'
        }],
        data,
        topics.slice(1,3));
}

// === Helpers
const getLogs = async (address) => {
    return new Promise((resolve, reject) => {
        web3.eth.getPastLogs({fromBlock: startingBlock, toBlock: "latest", address: address}, (error, logs) => {
            if (error){
                reject(error);
                console.log(error);
            }

            resolve(logs);
        });
    });
}

module.exports = {
    getStats
}
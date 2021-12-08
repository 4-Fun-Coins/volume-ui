const {ipfsGateway} = require('./config.js');
const {VolumeFactoryAbi} = require("./abis/volume-factory-abi");
const {volumeFactory, rpcUrl} = require("./config");

const Web3 = require('web3');
let web3 = new Web3(rpcUrl);

const getJSONFromIPFS = async (hash) => {
    return new Promise((res, rej) => {
        fetch(`${ipfsGateway.address}${hash}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            )
            .then(async (json) => {
                res(await json.json());
            })
            .catch((err) => {
                rej(err);
            });
    });
}

// const getAddCreatorData = (newCreator) => {
//     const factory = new web3.eth.Contract(VolumeFactoryAbi, volumeFactory);
//     return factory.methods.addCreator(newCreator).encodeABI();
// }

const getCollections = async () => {
    const ino = new web3.eth.Contract(VolumeFactoryAbi, volumeFactory);
    return ino.methods.getAllCategories().call();
}

module.exports = {
    getJSONFromIPFS,
    getCollections,
}
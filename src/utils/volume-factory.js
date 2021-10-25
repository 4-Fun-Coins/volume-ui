const {ipfsGateway} = require('./config.js');
const Big = require('big.js');

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

module.exports = {
    getJSONFromIPFS
}
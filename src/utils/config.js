const configs = {
    bscTest: {
        volumeAddress: '0x5980A1d3db54c22FEb966449fFD228a9E39c3970',
        volumeJackpotAddress: '0xD38a0b1f191D1AFAf788aD7162fC79aB058F3d99',
        volumeEscrow: '0xA0CcF5047480a270C9ECcA7c7f6453c69443F882',
        volumeFaucet: '0xCFf364d0045Df807AB53dDC827d054Ee6807471a',

        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',//'https://kovan.poa.network/', // 'https://bsc-dataseed1.binance.org'
        explorer: 'https://testnet.bscscan.com/',
        chainId: 97
    },
    kovan: {
        // Base
        volumeAddress: '0xD934AfDCe00240B9878521083989453c9A63B4d7',
        volumeJackpotAddress: '0xABdb4c4a4849ad26DB7FC9F7D352174B83F77623',

        // Test
        volumeFaucet: '0xBA0F2723beEa8B1bdeFCE44BeCc041A9f6685701',

        // INO
        volumeFactory: '0x9D995106C0640c77aa06aCdBCc39948f4390ffbb',
        volumeINO: '0xb4d08416FC31CC9d598012CCE1F5c4d6b3dF71DD',

        // Chain info
        rpcUrl: 'https://kovan.poa.network/',
        explorer: 'https://kovan.etherscan.io/',
        chainId: 42,

        // Other token info
        daiAddress: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa'
    },
    local: {
        // put local contracts addresses here
        // local setups can give you more debugging options
    },
    BSC: {
        // put bsc contracts addresses here
    },
}

const conf = configs[process.env.REACT_APP_NETWORK_NAME ? process.env.REACT_APP_NETWORK_NAME : 'bscTest'];
conf.ipfsGateway = 'https://ipfs.infura.io:5001/api/v0';//'https://dweb.link/';
conf.resourceLink = 'https://github.com/4-Fun-Coins/volume-resource';

module.exports = conf;
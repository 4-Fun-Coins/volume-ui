const configs = {
    bscTest: {
        volumeAddress: '0x5980A1d3db54c22FEb966449fFD228a9E39c3970',
        volumeJackpotAddress: '0xD38a0b1f191D1AFAf788aD7162fC79aB058F3d99',
        volumeEscrow: '0x5980A1d3db54c22FEb966449fFD228a9E39c3970',
        volumeFaucet: '0xD38a0b1f191D1AFAf788aD7162fC79aB058F3d99',

        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',//'https://kovan.poa.network/', // 'https://bsc-dataseed1.binance.org'
        explorer: 'https://testnet.bscscan.com/',
        chainId: 97
    },
    kovan: {
        volumeAddress: '0xD934AfDCe00240B9878521083989453c9A63B4d7',
        volumeJackpotAddress: '0xABdb4c4a4849ad26DB7FC9F7D352174B83F77623',
        rpcUrl: 'https://kovan.poa.network/',
        explorer: 'https://kovan.etherscan.io/',
        chainId: 42
    },
    local: {
        // put local contracts addresses here
        // local setups can give you more debugging options
    },
    BSC: {
        // put bsc contracts addresses here
    }
}

module.exports = configs[process.env.REACT_APP_NETWORK_NAME ? process.env.REACT_APP_NETWORK_NAME : 'bscTest'];
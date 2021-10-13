const configs = {
    bscTest: {
        volumeAddress: '0x583036cbAcE32a05F32BEc8dB7392ef8C90d9ee2',
        volumeJackpotAddress: '0xD0c64676c30163Ae89996C7b9B0CC5bc3704B4E0',
        volumeEscrow: '0xA5d4550663f969bCDa8B22cC4597897e94F28226',
        volumeFaucet: '0x806f89b1EF29aEad7AF63D1Dcd2a5A82bfAc45Ba',
        farmAddress: '0xC29c3eEa2c6f98A93E3d4E1E7C727D75C61ed669',
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',//'https://kovan.poa.network/', // 'https://bsc-dataseed1.binance.org'
        explorer: 'https://testnet.bscscan.com/',
        chainId: 97
    },
    kovan: {
        volumeAddress: '0x9e383f40DD0EB7c2ef7522dEa232F8aA408763D4',
        volumeJackpotAddress: '0x53543954518E199b5bEF313fb8F1f432eAd3cE9d',
        volumeFaucet: '0xe410314Da1BC8f459BcD3a327BaA672f3190D6dc',
        volumeEscrow: '0xA10E1085c6E113B29E4437ca99BF6dF5e8dBF0a9',
        farmAddress: '0x7d1fC0595B3D505D3daa1Fc88875631711365883',
        rpcUrl: 'https://kovanrpc.volume.quest/',
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
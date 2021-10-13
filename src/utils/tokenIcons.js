const icons = {
    bscTest: {
        '0x583036cbAcE32a05F32BEc8dB7392ef8C90d9ee2' : '/coins-icons/vol.png', // vol
        '0xAe1061e9ba90138d5b7380F824a3183E31Ad8546' : '/coins-icons/vol-bnb-lp.png', // vol-wbnb pool
    },
    kovan: {
        '0x9e383f40DD0EB7c2ef7522dEa232F8aA408763D4' : '/coins-icons/vol.png', // vol
        '0xAe1061e9ba90138d5b7380F824a3183E31Ad8546' : '/coins-icons/vol-bnb-lp.png', // vol-wbnb pool
    },
    local: {
        // put local contracts addresses here
        // local setups can give you more debugging options
    },
    BSC: {
        // put bsc contracts addresses here
    }
}

module.exports = icons[process.env.REACT_APP_NETWORK_NAME ? process.env.REACT_APP_NETWORK_NAME : 'bscTest'];
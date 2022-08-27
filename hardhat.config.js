require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337
        },
        Goerli: {
            url: 'https://eth-goerli.g.alchemy.com/v2/rVFVo_X3IvmhdA1s-9yBBrptPnjnFBbT',
            accounts: [process.env.privateKey],
            chainId: 5
        },
        Mumbai: {
            url: 'https://polygon-mumbai.g.alchemy.com/v2/tSpg5zjh4lrrDfRaY1FA5p1Y-h_5vRuu',
            accounts: [process.env.privateKey],
            chainId: 80001
        },
        Binance: {
            url: 'https://rpc.ankr.com/bsc_testnet_chapel',
            accounts: [process.env.privateKey],
            chainId: 97
        },
        Avalanche: {
            url: 'https://rpc.ankr.com/avalanche_fuji',
            accounts: [process.env.privateKey],
            chainId: 43113
        },
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};
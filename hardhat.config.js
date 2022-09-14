require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337
        },
        goerli: {
            url: 'https://eth-goerli.g.alchemy.com/v2/rVFVo_X3IvmhdA1s-9yBBrptPnjnFBbT',
            accounts: [process.env.privateKey],
            chainId: 5
        },
        polygonMumbai: {
            url: 'https://polygon-mumbai.g.alchemy.com/v2/tSpg5zjh4lrrDfRaY1FA5p1Y-h_5vRuu',
            accounts: [process.env.privateKey],
            chainId: 80001
        },
        bscTestnet: {
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            accounts: [process.env.privateKey],
            chainId: 97
        },
        avalancheFujiTestnet: {
            url: 'https://rpc.ankr.com/avalanche_fuji',
            accounts: [process.env.privateKey],
            chainId: 43113
        },
    },
    etherscan: {
        apiKey: {
            polygonMumbai: process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY,
            goerli: process.env.NEXT_PUBLIC_GOERLI_API_KEY,
            bscTestnet: process.env.NEXT_PUBLIC_BSC_API_KEY,
            avalancheFujiTestnet: process.env.NEXT_PUBLIC_AVAX_API_KEY
        }
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
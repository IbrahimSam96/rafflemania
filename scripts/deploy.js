const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Raffle = await hre.ethers.getContractFactory("Raffle");
  const chainId = hre.network.config.chainId;

  let vrfCoordinatorV2 = "";
  let subscriptionId = "";
  let gasLane = "";
  let interval = "";
  let maniaInterval = "";
  let callbackGasLimit = "";


  // Goerli 
  if (chainId == 5) {
    vrfCoordinatorV2 = "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
    subscriptionId = "1518";
    gasLane = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
    interval = "120"; // 2 minutes
    maniaInterval = "600"; // 10 minutes
    callbackGasLimit = "500000";
  }
  // Polygon(Matic) Mumbai testnet <3
  if (chainId == 80001) {
    vrfCoordinatorV2 = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed";
    subscriptionId = "1813";
    gasLane = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f";
    interval = "120"; // 2 minutes
    maniaInterval = "600"; // 10 minutes
    callbackGasLimit = "500000";
  }
  // Binance(BNB) Smart Testnet 
  if (chainId == 97) {
    vrfCoordinatorV2 = "0x6A2AAd07396B36Fe02a22b33cf443582f682c82f";
    subscriptionId = "1826";
    gasLane = "0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314";
    interval = "120"; // 2 minutes
    maniaInterval = "600"; // 10 minutes
    callbackGasLimit = "500000";
  }
  // Avalanche(AVAX) Fuji
  if (chainId == 43113) {
    vrfCoordinatorV2 = "0x2eD832Ba664535e5886b75D64C46EB9a228C2610";
    subscriptionId = "388";
    gasLane = "0x354d2f95da55398f44b7cff77da56283d9c6c829a4bdf1bbcaf2ad6a4d081f61";
    interval = "120"; // 2 minutes
    maniaInterval = "600"; // 10 minutes
    callbackGasLimit = "500000";
  }

  const raffle = await Raffle.deploy(vrfCoordinatorV2, subscriptionId, gasLane, interval, maniaInterval, callbackGasLimit);
  await raffle.deployed();
  console.log("raffle deployed to:", raffle.address);

  if (chainId == 80001) {
    const writetoMumbai = `export const polygonAddress = "${raffle.address}"`
    fs.writeFileSync('./polygon.js', writetoMumbai)
  }
  if (chainId == 5) {
    const writetoGeorli = `export const ethAddress = "${raffle.address}"`
    fs.writeFileSync('./eth.js', writetoGeorli)
  }
  if (chainId == 97) {
    const writetoBinance = `export const bnbAddress = "${raffle.address}"`
    fs.writeFileSync('./bnb.js', writetoBinance)
  }
  if (chainId == 43113) {
    const writetoAvalanche = `export const avaxAddress = "${raffle.address}"`
    fs.writeFileSync('./avax.js', writetoAvalanche)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

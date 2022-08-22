const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Raffle = await hre.ethers.getContractFactory("Raffle");
  const chainId = hre.network.config.chainId;

  let vrfCoordinatorV2 = "";
  let subscriptionId = "";
  let gasLane = "";
  let interval = "";
  let callbackGasLimit = "";


  // Goerli 
  if (chainId == 5) {
    vrfCoordinatorV2 = "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D";
    subscriptionId = "50";
    gasLane = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";
    interval = "120"; // 2 minutes
    callbackGasLimit = "500000";
  }
  // Polygon(Matic) Mumbai testnet <3
  if (chainId == 80001) {
    vrfCoordinatorV2 = "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed";
    subscriptionId = "1496";
    gasLane = "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f";
    interval = "120"; // 2 minutes
    callbackGasLimit = "500000";
  }

  const raffle = await Raffle.deploy(vrfCoordinatorV2, subscriptionId, gasLane, interval, callbackGasLimit);
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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

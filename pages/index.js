import Head from 'next/head'
import { ethers } from 'ethers'
import React, { useEffect, useState, useRef } from 'react'
import Web3Modal from 'web3modal'
import Image from 'next/image';

import {
  polygonAddress
} from '../polygon';

import {
  ethAddress
} from '../eth';

import {
  bnbAddress
} from '../bnb';

import {
  avaxAddress
} from '../avax';

import Raffle from '../artifacts/contracts/Raffle.sol/Raffle.json'

// Ui Libraries
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Carousel/Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


import Marquee from "react-fast-marquee";

import { Fireworks } from '@fireworks-js/react'
import RaffleComponent from './components/Raffle';
import RaffleMania from './components/RaffleMania';

// https://polygon-mumbai.g.alchemy.com/v2/tSpg5zjh4lrrDfRaY1FA5p1Y-h_5vRuu
// https://eth-goerli.g.alchemy.com/v2/rVFVo_X3IvmhdA1s-9yBBrptPnjnFBbT
// https://rpc.ankr.com/bsc_testnet_chapel
// https://rpc.ankr.com/avalanche_fuji

const Home = () => {


  const toastId = useRef(null);
  // Polygon Raffles + RaffleMania
  const [polygonRaffles, setPolygonRaffles] = useState(undefined);
  const [polygonMania, setPolygonMania] = useState(undefined);

  // ETH Raffles + RaffleMania
  const [ethRaffles, setEthRaffles] = useState(undefined);
  const [ethereumMania, setEthereumMania] = useState(undefined);

  // Binance Raffles + RaffleMania
  const [bcsRaffles, setBcsRaffles] = useState(undefined);
  const [binanceMania, setBinanceMania] = useState(undefined);

  // Avalanche Raffles + RaffleMania
  const [avaxRaffles, setAvaxRaffles] = useState(undefined);
  const [avalancheMania, setAvalancheMania] = useState(undefined);



  const [celebration, setCelebration] = useState(false);

  // Polygon Endpoint
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/tSpg5zjh4lrrDfRaY1FA5p1Y-h_5vRuu");
    const contract = new ethers.Contract(polygonAddress, Raffle.abi, provider);

    contract.on('RaffleEnter', (address, raffle) => {
      console.log(address, raffle);
      getRafflesInfo();
      contract.removeListener('RaffleEnter');

    })

    contract.on('RaffleCalculating', (index) => {
      console.log(index);
      getRafflesInfo();
      contract.removeListener('RaffleCalculating');
    })

    contract.on('RaffleWon', (address, raffle) => {
      console.log(address, raffle);
      getRafflesInfo();


      setCelebration(true);

      setTimeout(() => {
        setCelebration(false);

      }, 20000);

      contract.removeListener('RaffleWon');
    })


    contract.on('RaffleManiaCalculating', (address, raffle) => {
      getRafflesInfo();

      contract.removeListener('RaffleManiaCalculating');
    })

    contract.on('RaffleManiaWon', (address, raffle) => {
      getRafflesInfo();

      setCelebration(true);

      setTimeout(() => {
        setCelebration(false);

      }, 20000);

      contract.removeListener('RaffleManiaWon');
    })

    getRafflesInfo();
  }, [])

  // Eth Endpoint
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/rVFVo_X3IvmhdA1s-9yBBrptPnjnFBbT");
    const contract = new ethers.Contract(ethAddress, Raffle.abi, provider);

    contract.on('RaffleEnter', (address, raffle) => {
      getEthRafflesInfo();
      contract.removeListener('RaffleEnter');

    })

    contract.on('RaffleCalculating', (index) => {
      console.log(index);
      getEthRafflesInfo();
      contract.removeListener('RaffleCalculating');
    })

    contract.on('RaffleWon', (address, raffle) => {
      console.log(address, raffle);
      getEthRafflesInfo();
      setCelebration(true);
      setTimeout(() => {
        setCelebration(false);

      }, 20000);
      contract.removeListener('RaffleWon');
    })

    contract.on('RaffleManiaCalculating', (address, raffle) => {
      getRafflesInfo();

      contract.removeListener('RaffleManiaCalculating');
    })

    contract.on('RaffleManiaWon', (address, raffle) => {
      getRafflesInfo();

      setCelebration(true);

      setTimeout(() => {
        setCelebration(false);

      }, 20000);

      contract.removeListener('RaffleManiaWon');
    })


    getEthRafflesInfo();
  }, [])

  // Binance Endpoint
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
    const contract = new ethers.Contract(bnbAddress, Raffle.abi, provider);

    contract.on('RaffleEnter', (address, raffle) => {
      console.log(address, raffle);
      getBSCRafflesInfo();
      contract.removeListener('RaffleEnter');

    })

    contract.on('RaffleCalculating', (index) => {
      console.log(index);
      getBSCRafflesInfo();
      contract.removeListener('RaffleCalculating');
    })

    contract.on('RaffleWon', (address, raffle) => {
      console.log(address, raffle);
      getBSCRafflesInfo();

      setCelebration(true);
      setTimeout(() => {
        setCelebration(false);

      }, 20000);
      contract.removeListener('RaffleWon');
    })

    contract.on('RaffleManiaCalculating', (address, raffle) => {
      getRafflesInfo();

      contract.removeListener('RaffleManiaCalculating');
    })

    contract.on('RaffleManiaWon', (address, raffle) => {
      getRafflesInfo();

      setCelebration(true);

      setTimeout(() => {
        setCelebration(false);

      }, 20000);

      contract.removeListener('RaffleManiaWon');
    })

    getBSCRafflesInfo();
  }, [])

  // Aavalanche Endpoint
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji");
    const contract = new ethers.Contract(avaxAddress, Raffle.abi, provider);

    contract.on('RaffleEnter', (address, raffle) => {
      console.log(address, raffle);
      getAVAXRafflesInfo();
      contract.removeListener('RaffleEnter');

    })

    contract.on('RaffleCalculating', (index) => {
      console.log(index);
      getAVAXRafflesInfo();
      contract.removeListener('RaffleCalculating');
    })

    contract.on('RaffleWon', (address, raffle) => {
      console.log(address, raffle);
      getAVAXRafflesInfo();
      setCelebration(true);
      setTimeout(() => {
        setCelebration(false);

      }, 20000);
      contract.removeListener('RaffleWon');
    })

    contract.on('RaffleManiaCalculating', (address, raffle) => {
      getRafflesInfo();

      contract.removeListener('RaffleManiaCalculating');
    })

    contract.on('RaffleManiaWon', (address, raffle) => {
      getRafflesInfo();

      setCelebration(true);

      setTimeout(() => {
        setCelebration(false);

      }, 20000);

      contract.removeListener('RaffleManiaWon');
    })


    getAVAXRafflesInfo();
  }, [])




  const enterRaffle = async (entranceFee) => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const { chainId } = await provider.getNetwork();

    if (chainId != 80001) {

      await connection.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers 
      }).then((res) => {
        console.log("Network Successfully Switched");
      }).catch(async (err) => {
        if (err.code == 4001) {
          console.log("User Rejected Transaction")
        }
        // This error code indicates that the chain has not been added to MetaMask
        else if (err.code == 4902) {
          console.log("User does'nt have Chain configured");
          await connection.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x13881",
              rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
              chainName: "Matic Mumbai",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
            }]
          });
        }
      })
    }
    else {
      const signer = provider.getSigner();
      let contract = new ethers.Contract(polygonAddress, Raffle.abi, signer);

      let value = ethers.utils.parseEther(ethers.utils.formatEther(entranceFee));


      let transaction = await contract.EnterRaffle({
        value: value,
        gasLimit: 9000000,
      });

      toastId.current = toast(
        <>
          <Image
            alt='Processing Transaction'
            src={'/Loading.svg'}
            width={30}
            height={30}
            className={`animate-spin inline  `}
          />
          <p className={`inline ml-2 align-super`} >Processing Transaction</p>
        </>, { autoClose: false, theme: "dark" });

      await transaction.wait().then((res) => {
        toast.update(toastId.current, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Transaction Successful" });
        console.log("Shatoor");
      })
        .catch((err) => {
          toast.update(toastId.current, { type: toast.TYPE.ERROR, autoClose: 5000, render: "Transaction Failed" });

          console.log(err)
        })

    }

  };

  const enterEthRaffle = async (entranceFee) => {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const { chainId } = await provider.getNetwork();

    if (chainId != 5) {
      await connection.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }], // chainId must be in hexadecimal numbers 
      }).then((res) => {
        console.log("Network Successfully Switched");
      }).catch(async (err) => {
        if (err.code == 4001) {
          console.log("User Rejected Transaction")
        }
        // This error code indicates that the chain has not been added to MetaMask
        else if (err.code == 4902) {
          console.log("User does'nt have Chain configured");
          await connection.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x5",
              rpcUrls: ["https://goerli.infura.io/v3/"],
              chainName: "Goerli Test Network",
              nativeCurrency: {
                name: "GoerliETH",
                symbol: "GoerliETH",
                decimals: 18
              },
              blockExplorerUrls: ["https://goerli.etherscan.io"]
            }]
          });
        }
      })

    }
    else {
      const signer = provider.getSigner();
      let contract = new ethers.Contract(ethAddress, Raffle.abi, signer);

      let value = ethers.utils.parseEther(ethers.utils.formatEther(entranceFee));


      let transaction = await contract.EnterRaffle({
        value: value,
        gasLimit: 9000000,
      });

      toastId.current = toast(
        <>
          <Image
            alt='Processing Transaction'
            src={'/Loading.svg'}
            width={30}
            height={30}
            className={`animate-spin inline  `}
          />
          <p className={`inline ml-2 align-super`} >Processing Transaction</p>
        </>, { autoClose: false, theme: "dark" });

      await transaction.wait().then((res) => {
        toast.update(toastId.current, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Transaction Successful" });
        console.log("Shatoor");
      })
        .catch((err) => {
          toast.update(toastId.current, { type: toast.TYPE.ERROR, autoClose: 5000, render: "Transaction Failed" });

          console.log(err)
        })
    }

  };

  const enterBSCRaffle = async (entranceFee) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);


    const { chainId } = await provider.getNetwork();

    if (chainId != 97) {
      await connection.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }], // chainId must be in hexadecimal numbers 
      }).then((res) => {
        console.log("Network Successfully Switched");
      }).catch(async (err) => {
        if (err.code == 4001) {
          console.log("User Rejected Transaction")
        }
        // This error code indicates that the chain has not been added to MetaMask
        else if (err.code == 4902) {
          console.log("User does'nt have Chain configured");
          await connection.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x61",
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              chainName: "BNB Smart Chain Testnet",
              nativeCurrency: {
                name: "tBNB",
                symbol: "tBNB",
                decimals: 18
              },
              blockExplorerUrls: ["https://testnet.bscscan.com/"]
            }]
          });
        }
      })
    }
    else {
      const signer = provider.getSigner();
      let contract = new ethers.Contract(bnbAddress, Raffle.abi, signer);

      let value = ethers.utils.parseEther(ethers.utils.formatEther(entranceFee));


      let transaction = await contract.EnterRaffle({
        value: value,
        gasLimit: 9000000,
      });

      toastId.current = toast(
        <>
          <Image
            alt='Processing Transaction'
            src={'/Loading.svg'}
            width={30}
            height={30}
            className={`animate-spin inline  `}
          />
          <p className={`inline ml-2 align-super`} >Processing Transaction</p>
        </>, { autoClose: false, theme: "dark" });

      await transaction.wait().then((res) => {
        toast.update(toastId.current, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Transaction Successful" });
        console.log("Shatoor");
      })
        .catch((err) => {
          toast.update(toastId.current, { type: toast.TYPE.ERROR, autoClose: 5000, render: "Transaction Failed" });

          console.log(err)
        })

    }

  };

  const enterAVAXRaffle = async (entranceFee) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);


    const { chainId } = await provider.getNetwork();

    if (chainId != 43113) {
      await connection.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xA869' }], // chainId must be in hexadecimal numbers 
      }).then((res) => {
        console.log("Network Successfully Switched");
      }).catch(async (err) => {
        if (err.code == 4001) {
          console.log("User Rejected Transaction")
        }
        // This error code indicates that the chain has not been added to MetaMask
        else if (err.code == 4902) {
          console.log("User does'nt have Chain configured");
          await connection.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0xA869",
              rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
              chainName: "Avalanche Testnet",
              nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18
              },
              blockExplorerUrls: ["https://testnet.snowtrace.io"]
            }]
          });
        }
      })
    }
    else {
      const signer = provider.getSigner();
      let contract = new ethers.Contract(avaxAddress, Raffle.abi, signer);

      let value = ethers.utils.parseEther(ethers.utils.formatEther(entranceFee));


      let transaction = await contract.EnterRaffle({
        value: value,
        gasLimit: 8000000,
      });

      toastId.current = toast(
        <>
          <Image
            alt='Processing Transaction'
            src={'/Loading.svg'}
            width={30}
            height={30}
            className={`animate-spin inline  `}
          />
          <p className={`inline ml-2 align-super`} >Processing Transaction</p>
        </>, { autoClose: false, theme: "dark" });

      await transaction.wait().then((res) => {
        toast.update(toastId.current, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Transaction Successful" });
        console.log("Shatoor");
      })
        .catch((err) => {
          toast.update(toastId.current, { type: toast.TYPE.ERROR, autoClose: 5000, render: "Transaction Failed" });

          console.log(err)
        })

    }
  };


  const getRafflesInfo = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/tSpg5zjh4lrrDfRaY1FA5p1Y-h_5vRuu");
    const contract = new ethers.Contract(polygonAddress, Raffle.abi, provider);
    const data = await contract.getallRaffles();
    setPolygonRaffles(data);

    const maniaData = await contract.s_raffleMania();
    setPolygonMania(maniaData);
  }

  const getEthRafflesInfo = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/rVFVo_X3IvmhdA1s-9yBBrptPnjnFBbT");
    const contract = new ethers.Contract(ethAddress, Raffle.abi, provider);
    const data = await contract.getallRaffles();
    setEthRaffles(data);

    const maniaData = await contract.s_raffleMania();
    setEthereumMania(maniaData);
  }

  const getBSCRafflesInfo = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
    const contract = new ethers.Contract(bnbAddress, Raffle.abi, provider);
    const data = await contract.getallRaffles();
    setBcsRaffles(data);

    const maniaData = await contract.s_raffleMania();
    setBinanceMania(maniaData);
  }

  const getAVAXRafflesInfo = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji");
    const contract = new ethers.Contract(avaxAddress, Raffle.abi, provider);
    const data = await contract.getallRaffles();
    setAvaxRaffles(data);

    const maniaData = await contract.s_raffleMania();
    setAvalancheMania(maniaData);
  }


  return (
    <div >
      <Head>
        <title>Rafflemania - Join a lottery </title>
        <meta name="Rafflemania" content="Join a raffle and win testnet MATIC and ETH" />
        <link rel="icon" href="/RafflemaniaLogo.png" />
      </Head>

      <div className={`h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[100px,100px,450px,450px,450px,450px,300px]  bg-[#100d23]  `}>
        <span className={`col-start-1 col-end-8 grid grid-rows-1 items-center grid-cols-[200px,1fr] bg-[#1e1d45] `}>
          <p className={`main2 inline text-4xl ml-2 row-start-1 col-start-1 shineEffect`}>RAFFLE</p>
          <p className={`main2 inline text-2xl	row-start-1 col-start-1 ml-28 shineEffect`}>MANIA</p>
          {/* <button className={` text-2xl row-start-1 col-start-3 connect`}>Connect</button> */}
          <span className={`row-start-1 col-start-1 col-end-4 self-end border-[2px] border-[#7b3fe4]`} ></span>
        </span>


        <ToastContainer />

        {celebration &&
          <Fireworks
            options={{ opacity: 0.5, explosion: 5, friction: 1 }}
            style={{
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              position: 'fixed',
            }}
          />
        }

        <span className={`col-start-1 col-end-8 row-start-2 row-end-3 mx-4 mt-4 `}>

          <Marquee gradient={false} className={`bg-[transparent] border-x-2 border-[#1e1d45] hover:border-[#6FCF97] `}>
            {polygonMania ?
              <RaffleMania mania={polygonMania} chain={"Polygon"} />
              :
              <span className={`flex mt-2 w-[430px] h-[50px] overflow-hidden bg-[#1e1d45] p-2 rounded ml-2 `}>
                <span className={`block bg-[grey] w-[35px] h-[35px] rounded-full animate-pulse`}>  </span>
                <span className={`block bg-[grey] ml-2 w-[290px] h-[35px] rounded animate-pulse `}>  </span>
                <span className={`block bg-[grey] ml-2 w-[100px] h-[35px] rounded animate-pulse `}>  </span>
              </span>
            }

            {ethereumMania ?
              <RaffleMania mania={ethereumMania} chain={"Ethereum"} />
              :
              <span className={`flex mt-2 w-[430px] h-[50px] overflow-hidden bg-[#1e1d45] p-2 rounded ml-2 `}>
                <span className={`block bg-[grey] w-[35px] h-[35px] rounded-full animate-pulse`}>  </span>
                <span className={`block bg-[grey] ml-2 w-[290px] h-[35px] rounded animate-pulse `}>  </span>
                <span className={`block bg-[grey] ml-2 w-[100px] h-[35px] rounded animate-pulse `}>  </span>
              </span>
            }

            {binanceMania ?
              <RaffleMania mania={binanceMania} chain={"Binance"} />
              :
              <span className={`flex mt-2 w-[430px] h-[50px] overflow-hidden bg-[#1e1d45] p-2 rounded ml-2 `}>
                <span className={`block bg-[grey] w-[35px] h-[35px] rounded-full animate-pulse`}>  </span>
                <span className={`block bg-[grey] ml-2 w-[290px] h-[35px] rounded animate-pulse `}>  </span>
                <span className={`block bg-[grey] ml-2 w-[100px] h-[35px] rounded animate-pulse `}>  </span>
              </span>
            }

            {avalancheMania ?
              <RaffleMania mania={avalancheMania} chain={"Avalanche"} />
              :
              <span className={`flex mt-2 w-[430px] h-[50px] overflow-hidden bg-[#1e1d45] p-2 rounded ml-2 `}>
                <span className={`block bg-[grey] w-[35px] h-[35px] rounded-full animate-pulse`}>  </span>
                <span className={`block bg-[grey] ml-2 w-[290px] h-[35px] rounded animate-pulse `}>  </span>
                <span className={`block bg-[grey] ml-2 w-[100px] h-[35px] rounded animate-pulse `}>  </span>
              </span>}

          </Marquee>
        </span>

        <span className={`col-start-1 col-end-8 row-start-3 row-end-4 grid grid-rows-[50px,400px] mx-4 border-y-2 pb-8 border-[#1e1d45] `}>

          <span className={`row-start-1 col-start-1 justify-self-center mt-2`}>
            <Image
              alt='Polygon'
              src={'/polygon.svg'}
              width={20}
              height={20}
              className={`inline`}
            />

            <p className={`text-[#7B3FE4] inline font-[Meta] text-xl sm:text-3xl ml-2 `}> Polygon (Mumbai) </p>
          </span>

          <Swiper
            navigation={true}
            modules={[Navigation]}
            allowTouchMove={false}
            className={`w-full mb-8`}
            loop={true}
          >
            {polygonRaffles ?

              polygonRaffles.map((raffle, index) => {

                var time = parseInt(raffle.lastTimeStamp._hex)
                var lastTimeStamp = new Date(time * 1000 + 1000 * 60 * 2);

                return (
                  <SwiperSlide key={index}>

                    <RaffleComponent
                      key={index}
                      raffle={raffle}
                      index={index}
                      lastTimeStamp={lastTimeStamp}
                      chain={"Polygon"}
                      currency={"MATIC"}
                      enterRaffle={enterRaffle}
                    />
                  </SwiperSlide >

                )
              })

              :

              <SwiperSlide >
                <span className={`col-start-1 row-start-2 row-end-3 grid grid-rows-[50px,50px,50px,50px,50px,50px,50px] max-w-[600px] bg-[#1e1d45] rounded mx-auto	 `}>

                  <span className={`bg-[grey] mx-auto w-[80%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-auto w-[80%] self-center h-[35px] rounded animate-pulse `}>  </span>

                </span>

              </SwiperSlide >


            }
          </Swiper>
        </span>


        <span className={`col-start-1 col-end-8 row-start-4 row-end-4 grid grid-rows-[50px,400px] mx-4 border-y-2 pb-8 border-[#1e1d45]`}>

          <span className={`row-start-1 col-start-1 justify-self-center mt-2`}>
            <Image
              alt='Ethereum'
              src={'/eth.svg'}
              width={20}
              height={20}
              className={`inline`}
            />
            <p className={`text-[grey] inline font-[Meta] text-xl sm:text-3xl ml-2 `}> Ethereum (Goerli) </p>
          </span>

          <Swiper
            navigation={true}
            modules={[Navigation]}
            allowTouchMove={false}
            className={`w-full mb-8`}
            loop={true}
          >

            {ethRaffles ?

              ethRaffles.map((raffle, index) => {

                var time = parseInt(raffle.lastTimeStamp._hex)
                var lastTimeStamp = new Date(time * 1000 + 1000 * 60 * 2.25);

                return (

                  <SwiperSlide key={index}>

                    <RaffleComponent
                      key={index}
                      raffle={raffle}
                      index={index}
                      lastTimeStamp={lastTimeStamp}
                      chain={"Ethereum"}
                      currency={"ETH"}
                      enterRaffle={enterEthRaffle}
                    />
                  </SwiperSlide>

                )

              })
              :


              <SwiperSlide >
                <span className={`col-start-1 row-start-2 row-end-3 grid grid-rows-[50px,50px,50px,50px,50px,50px,50px] max-w-[600px] bg-[#1e1d45] rounded mx-auto	 `}>

                  <span className={`bg-[grey] mx-auto w-[80%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-auto w-[80%] self-center h-[35px] rounded animate-pulse `}>  </span>

                </span>

              </SwiperSlide >

            }

          </Swiper>
        </span>

        <span className={`col-start-1 col-end-8 row-start-5 row-end-5 grid grid-rows-[50px,400px] mx-4 border-y-2 pb-8 border-[#1e1d45]`}>

          <span className={`row-start-1 col-start-1 justify-self-center mt-2`}>
            <Image
              alt='Binance'
              src={'/bnb.svg'}
              width={20}
              height={20}
              className={`inline`}
            />

            <p className={`text-[#F0B90B] inline font-[Meta] text-xl sm:text-3xl ml-2 `}> Binance (Testnet) </p>


          </span>

          <Swiper
            navigation={true}
            modules={[Navigation]}
            allowTouchMove={false}
            className={`w-full mb-8`}
            loop={true}
          >

            {bcsRaffles ?

              bcsRaffles.map((raffle, index) => {

                var time = parseInt(raffle.lastTimeStamp._hex)
                var lastTimeStamp = new Date(time * 1000 + 1000 * 60 * 2.25);
                return (

                  <SwiperSlide key={index}>

                    <RaffleComponent
                      key={index}
                      raffle={raffle}
                      index={index}
                      lastTimeStamp={lastTimeStamp}
                      chain={"Binance"}
                      currency={"BNB"}
                      enterRaffle={enterBSCRaffle}
                    />
                  </SwiperSlide>

                )

              })
              :

              <SwiperSlide >
                <span className={`col-start-1 row-start-2 row-end-3 grid grid-rows-[50px,50px,50px,50px,50px,50px,50px] max-w-[600px] bg-[#1e1d45] rounded mx-auto	 `}>

                  <span className={`bg-[grey] mx-auto w-[80%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-auto w-[80%] self-center h-[35px] rounded animate-pulse `}>  </span>

                </span>

              </SwiperSlide >
            }

          </Swiper>
        </span>

        <span className={`col-start-1 col-end-8 row-start-6 row-end-6 grid grid-rows-[50px,400px] mx-4 border-y-2 pb-8 border-[#1e1d45]`}>

          <span className={`row-start-1 col-start-1 justify-self-center mt-2`}>
            <Image
              alt='Aavalanche'
              src={'/avax.svg'}
              width={20}
              height={20}
              className={`inline`}
            />

            <p className={`text-[#E84142] inline font-[Meta] text-xl sm:text-3xl ml-2 `}> Avalanche (Fuji) </p>


          </span>

          <Swiper
            navigation={true}
            modules={[Navigation]}
            allowTouchMove={false}
            className={`w-full mb-8`}
            loop={true}
          >

            {avaxRaffles ?

              avaxRaffles.map((raffle, index) => {

                var time = parseInt(raffle.lastTimeStamp._hex)
                var lastTimeStamp = new Date(time * 1000 + 1000 * 60 * 2.25);
                return (

                  <SwiperSlide key={index}>

                    <RaffleComponent
                      key={index}
                      raffle={raffle}
                      index={index}
                      lastTimeStamp={lastTimeStamp}
                      chain={"Avalanche"}
                      currency={"AVAX"}
                      enterRaffle={enterAVAXRaffle}
                    />
                  </SwiperSlide>

                )

              })
              :

              <SwiperSlide >
                <span className={`col-start-1 row-start-2 row-end-3 grid grid-rows-[50px,50px,50px,50px,50px,50px,50px] max-w-[600px] bg-[#1e1d45] rounded mx-auto	 `}>

                  <span className={`bg-[grey] mx-auto w-[80%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-4 w-[30%] self-center h-[35px] rounded animate-pulse `}>  </span>
                  <span className={`bg-[grey] mx-auto w-[80%] self-center h-[35px] rounded animate-pulse `}>  </span>

                </span>

              </SwiperSlide >

            }

          </Swiper>

        </span>


      </div >
    </div >
  )
}

export default Home; 

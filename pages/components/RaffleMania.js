
import Countdown from 'react-countdown';
import { ethers } from 'ethers'
import Image from 'next/image';

const RaffleMania = ({ mania, chain }) => {

    return (
        <>
            {
                mania.balance ?
                    <span className={`flex ml-2`}  >

                        <span className={`flex mt-2 overflow-y-hidden 
                         bg-[#1e1d45]  p-2 rounded hover:border-[1px]
                         ${chain == 'Polygon' ? 'border-[#7b3fe4]' : chain == 'Ethereum' ? 'border-[#3B3B3B]' : chain == 'Binance' ? 'border-[#F0B90B]' : chain == "Avalanche" ? 'border-[#E84142]' : ''}
                          `}>

                            {chain == 'Polygon' ?
                                <Image
                                    alt='Polygon'
                                    src={'/polygon.svg'}
                                    width={20}
                                    height={20}
                                    className={`inline`}
                                /> :
                                chain == 'Ethereum' ?
                                    <Image
                                        alt='Ethereum'
                                        src={'/eth.svg'}
                                        width={20}
                                        height={20}
                                        className={`inline`}
                                    /> :
                                    chain == 'Binance' ?
                                        <Image
                                            alt='Binance'
                                            src={'/bnb.svg'}
                                            width={20}
                                            height={20}
                                            className={`inline`}
                                        /> :
                                        chain == "Avalanche" ?
                                            <Image
                                                alt='Aavalanche'
                                                src={'/avax.svg'}
                                                width={20}
                                                height={20}
                                                className={`inline`}
                                            />
                                            :
                                            <></>
                            }

                            <p className={` ${chain == 'Polygon' ? 'text-[#7B3FE4]' : chain == 'Ethereum' ? 'text-[darkgrey]' : chain == 'Binance' ? 'text-[#F0B90B]' : chain == "Avalanche" ? 'text-[#E84142]' : ''}
                            inline font-[Meta] text-xl sm:text-2xl ml-2
                            `}>

                                {chain}

                            </p>

                            <p className={`text-[#6FCF97] inline font-[Meta] text-xl sm:text-2xl ml-2 `}>  {parseInt(mania.balance._hex) == 0 ? '0.00' : ethers.utils.formatEther(mania.balance._hex)} {chain == 'Polygon' ? 'MATIC' : chain == 'Ethereum' ? 'ETH' : chain == 'Binance' ? 'BNB' : chain == "Avalanche" ? 'AVAX' : ''}</p>

                            {parseInt(mania.balance._hex) == 0 && mania.raffleState == 0 &&
                                <>
                                    <svg className={`inline`} width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.25968 4.35211C9.64783 4.35211 10.0222 4.40304 10.3828 4.50489C10.7435 4.604 11.0793 4.74577 11.3904 4.93021C11.7042 5.11464 11.9891 5.33625 12.2451 5.59501C12.5039 5.85103 12.7255 6.13594 12.9099 6.44977C13.0944 6.76084 13.2361 7.09668 13.3352 7.4573C13.4371 7.81792 13.488 8.19231 13.488 8.58045C13.488 8.9686 13.4371 9.34299 13.3352 9.70361C13.2361 10.0642 13.0944 10.4014 12.9099 10.7153C12.7255 11.0263 12.5039 11.3113 12.2451 11.57C11.9891 11.826 11.7042 12.0463 11.3904 12.2307C11.0793 12.4151 10.7435 12.5583 10.3828 12.6601C10.0222 12.7592 9.64783 12.8088 9.25968 12.8088C8.87153 12.8088 8.49715 12.7592 8.13653 12.6601C7.77591 12.5583 7.43869 12.4151 7.12487 12.2307C6.8138 12.0463 6.52888 11.826 6.27011 11.57C6.0141 11.3113 5.79387 11.0263 5.60944 10.7153C5.425 10.4014 5.28185 10.0642 5.17999 9.70361C5.08089 9.34299 5.03134 8.9686 5.03134 8.58045C5.03134 8.19231 5.08089 7.81792 5.17999 7.4573C5.28185 7.09668 5.425 6.76084 5.60944 6.44977C5.79387 6.13594 6.0141 5.85103 6.27011 5.59501C6.52888 5.33625 6.8138 5.11464 7.12487 4.93021C7.43869 4.74577 7.77591 4.604 8.13653 4.50489C8.49715 4.40304 8.87153 4.35211 9.25968 4.35211Z" fill="#6F6EC6" />
                                    </svg>
                                    <p className={`text-[#6f6ec6] font-bold font-[Meta] text-xs ml-1 inline self-center `}> Standby </p>
                                </>
                            }
                            {mania.raffleState == 0 && parseInt(mania.balance._hex) > 0 &&
                                <>
                                    <svg className={`inline animate-pulse `} width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.25968 4.35211C9.64783 4.35211 10.0222 4.40304 10.3828 4.50489C10.7435 4.604 11.0793 4.74577 11.3904 4.93021C11.7042 5.11464 11.9891 5.33625 12.2451 5.59501C12.5039 5.85103 12.7255 6.13594 12.9099 6.44977C13.0944 6.76084 13.2361 7.09668 13.3352 7.4573C13.4371 7.81792 13.488 8.19231 13.488 8.58045C13.488 8.9686 13.4371 9.34299 13.3352 9.70361C13.2361 10.0642 13.0944 10.4014 12.9099 10.7153C12.7255 11.0263 12.5039 11.3113 12.2451 11.57C11.9891 11.826 11.7042 12.0463 11.3904 12.2307C11.0793 12.4151 10.7435 12.5583 10.3828 12.6601C10.0222 12.7592 9.64783 12.8088 9.25968 12.8088C8.87153 12.8088 8.49715 12.7592 8.13653 12.6601C7.77591 12.5583 7.43869 12.4151 7.12487 12.2307C6.8138 12.0463 6.52888 11.826 6.27011 11.57C6.0141 11.3113 5.79387 11.0263 5.60944 10.7153C5.425 10.4014 5.28185 10.0642 5.17999 9.70361C5.08089 9.34299 5.03134 8.9686 5.03134 8.58045C5.03134 8.19231 5.08089 7.81792 5.17999 7.4573C5.28185 7.09668 5.425 6.76084 5.60944 6.44977C5.79387 6.13594 6.0141 5.85103 6.27011 5.59501C6.52888 5.33625 6.8138 5.11464 7.12487 4.93021C7.43869 4.74577 7.77591 4.604 8.13653 4.50489C8.49715 4.40304 8.87153 4.35211 9.25968 4.35211Z" fill="#27AE60" />
                                    </svg>
                                    <p className={`text-[#02ec7f] font-bold font-[Meta] text-xs ml-1 inline self-center`}>Active</p>
                                </>
                            }

                            {mania.raffleState == 1 &&
                                <>
                                    <svg className={`inline animate-pulse animate-spin`} width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.25968 4.35211C9.64783 4.35211 10.0222 4.40304 10.3828 4.50489C10.7435 4.604 11.0793 4.74577 11.3904 4.93021C11.7042 5.11464 11.9891 5.33625 12.2451 5.59501C12.5039 5.85103 12.7255 6.13594 12.9099 6.44977C13.0944 6.76084 13.2361 7.09668 13.3352 7.4573C13.4371 7.81792 13.488 8.19231 13.488 8.58045C13.488 8.9686 13.4371 9.34299 13.3352 9.70361C13.2361 10.0642 13.0944 10.4014 12.9099 10.7153C12.7255 11.0263 12.5039 11.3113 12.2451 11.57C11.9891 11.826 11.7042 12.0463 11.3904 12.2307C11.0793 12.4151 10.7435 12.5583 10.3828 12.6601C10.0222 12.7592 9.64783 12.8088 9.25968 12.8088C8.87153 12.8088 8.49715 12.7592 8.13653 12.6601C7.77591 12.5583 7.43869 12.4151 7.12487 12.2307C6.8138 12.0463 6.52888 11.826 6.27011 11.57C6.0141 11.3113 5.79387 11.0263 5.60944 10.7153C5.425 10.4014 5.28185 10.0642 5.17999 9.70361C5.08089 9.34299 5.03134 8.9686 5.03134 8.58045C5.03134 8.19231 5.08089 7.81792 5.17999 7.4573C5.28185 7.09668 5.425 6.76084 5.60944 6.44977C5.79387 6.13594 6.0141 5.85103 6.27011 5.59501C6.52888 5.33625 6.8138 5.11464 7.12487 4.93021C7.43869 4.74577 7.77591 4.604 8.13653 4.50489C8.49715 4.40304 8.87153 4.35211 9.25968 4.35211Z" fill="#E51400" />
                                    </svg>
                                    <p className={`text-red-600 font-bold font-[Meta] text-xs ml-1 inline self-center animate-pulse `}> No Entry </p>
                                </>
                            }
                        </span>

                        {parseInt(mania.lastTimeStamp._hex) == 0 ?
                            <>
                            </>

                            :
                            <>
                                <Countdown date={new Date(parseInt(mania.lastTimeStamp._hex) * 1000 + 1000 * 60 * 10)} renderer={(props) =>
                                    props.completed ?
                                        <>
                                        </>
                                        :
                                        <p className={`relative inline rounded text-[#6FCF97] font-[Meta] text-sm sm:text-xl h-min ml-2 `}> 0{props.minutes}:{props.seconds} </p>
                                }
                                />
                            </>
                        }
                    </span>

                    :
                    <span className={`flex mt-2 w-[430px] h-[50px]  overflow-hidden bg-[#1e1d45] p-2 rounded `}>
                        <span className={`block bg-[grey] w-[35px] h-[35px] rounded-full animate-pulse`}>  </span>
                        <span className={`block bg-[grey] ml-2 w-[290px] h-[35px] rounded animate-pulse `}>  </span>
                        <span className={`block bg-[grey] ml-2 w-[100px] h-[35px] rounded animate-pulse `}>  </span>

                    </span>
            }
        </>
    )
}

export default RaffleMania;
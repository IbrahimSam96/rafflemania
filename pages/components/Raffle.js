import Countdown from 'react-countdown';
import { ethers } from 'ethers'


const RaffleComponent = ({ raffle, index, lastTimeStamp, chain, currency, enterRaffle }) => {


    if (raffle) {

        return (

            <span className={`col-start-1 row-start-2 row-end-3 grid grid-rows-[50px,50px,50px,50px,50px,50px,50px] grid-cols-3 max-w-[600px] bg-[#1e1d45] rounded mx-auto	shadow-lg ${chain == 'Polygon' ? 'shadow-[#7B3FE4]' : chain == 'Ethereum' ? 'shadow-[#3B3B3B]' : chain == 'Binance' ? 'shadow-[#F0B90B]' : chain == "Avalanche" ? 'shadow-[#E84142]' : ''} `}>


                <p className={`text-[#6f6ec6] tracking-tight inline text-lg sm:text-2xl ml-2 self-center row-start-1 col-start-1`}>{ethers.utils.parseBytes32String(raffle.name)}</p>


                <span className={`row-start-1 col-start-3 self-center justify-self-center mr-12 sm:mr-4 flex  `}>

                    <p className={`text-[#6f6ec6] tracking-tight font-[Meta] text-sm sm:text-base self-center`}>Status:</p>

                    {raffle.players.length == 0 && raffle.raffleState == 0 &&
                        <>
                            <svg className={`inline`} width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.25968 4.35211C9.64783 4.35211 10.0222 4.40304 10.3828 4.50489C10.7435 4.604 11.0793 4.74577 11.3904 4.93021C11.7042 5.11464 11.9891 5.33625 12.2451 5.59501C12.5039 5.85103 12.7255 6.13594 12.9099 6.44977C13.0944 6.76084 13.2361 7.09668 13.3352 7.4573C13.4371 7.81792 13.488 8.19231 13.488 8.58045C13.488 8.9686 13.4371 9.34299 13.3352 9.70361C13.2361 10.0642 13.0944 10.4014 12.9099 10.7153C12.7255 11.0263 12.5039 11.3113 12.2451 11.57C11.9891 11.826 11.7042 12.0463 11.3904 12.2307C11.0793 12.4151 10.7435 12.5583 10.3828 12.6601C10.0222 12.7592 9.64783 12.8088 9.25968 12.8088C8.87153 12.8088 8.49715 12.7592 8.13653 12.6601C7.77591 12.5583 7.43869 12.4151 7.12487 12.2307C6.8138 12.0463 6.52888 11.826 6.27011 11.57C6.0141 11.3113 5.79387 11.0263 5.60944 10.7153C5.425 10.4014 5.28185 10.0642 5.17999 9.70361C5.08089 9.34299 5.03134 8.9686 5.03134 8.58045C5.03134 8.19231 5.08089 7.81792 5.17999 7.4573C5.28185 7.09668 5.425 6.76084 5.60944 6.44977C5.79387 6.13594 6.0141 5.85103 6.27011 5.59501C6.52888 5.33625 6.8138 5.11464 7.12487 4.93021C7.43869 4.74577 7.77591 4.604 8.13653 4.50489C8.49715 4.40304 8.87153 4.35211 9.25968 4.35211Z" fill="#6F6EC6" />
                            </svg>
                            <p className={`text-[#6f6ec6] font-bold font-[Meta] text-xs ml-1 inline self-center `}> Standby </p>
                        </>
                    }
                    {raffle.raffleState == 0 && raffle.players.length > 0 &&
                        <>
                            <svg className={`inline animate-pulse `} width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.25968 4.35211C9.64783 4.35211 10.0222 4.40304 10.3828 4.50489C10.7435 4.604 11.0793 4.74577 11.3904 4.93021C11.7042 5.11464 11.9891 5.33625 12.2451 5.59501C12.5039 5.85103 12.7255 6.13594 12.9099 6.44977C13.0944 6.76084 13.2361 7.09668 13.3352 7.4573C13.4371 7.81792 13.488 8.19231 13.488 8.58045C13.488 8.9686 13.4371 9.34299 13.3352 9.70361C13.2361 10.0642 13.0944 10.4014 12.9099 10.7153C12.7255 11.0263 12.5039 11.3113 12.2451 11.57C11.9891 11.826 11.7042 12.0463 11.3904 12.2307C11.0793 12.4151 10.7435 12.5583 10.3828 12.6601C10.0222 12.7592 9.64783 12.8088 9.25968 12.8088C8.87153 12.8088 8.49715 12.7592 8.13653 12.6601C7.77591 12.5583 7.43869 12.4151 7.12487 12.2307C6.8138 12.0463 6.52888 11.826 6.27011 11.57C6.0141 11.3113 5.79387 11.0263 5.60944 10.7153C5.425 10.4014 5.28185 10.0642 5.17999 9.70361C5.08089 9.34299 5.03134 8.9686 5.03134 8.58045C5.03134 8.19231 5.08089 7.81792 5.17999 7.4573C5.28185 7.09668 5.425 6.76084 5.60944 6.44977C5.79387 6.13594 6.0141 5.85103 6.27011 5.59501C6.52888 5.33625 6.8138 5.11464 7.12487 4.93021C7.43869 4.74577 7.77591 4.604 8.13653 4.50489C8.49715 4.40304 8.87153 4.35211 9.25968 4.35211Z" fill="#27AE60" />
                            </svg>
                            <p className={`text-[#02ec7f] font-bold font-[Meta] text-xs ml-1 inline self-center`}>Active</p>
                        </>
                    }

                    {raffle.raffleState == 1 &&
                        <>
                            <svg className={`inline animate-pulse animate-spin`} width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.25968 4.35211C9.64783 4.35211 10.0222 4.40304 10.3828 4.50489C10.7435 4.604 11.0793 4.74577 11.3904 4.93021C11.7042 5.11464 11.9891 5.33625 12.2451 5.59501C12.5039 5.85103 12.7255 6.13594 12.9099 6.44977C13.0944 6.76084 13.2361 7.09668 13.3352 7.4573C13.4371 7.81792 13.488 8.19231 13.488 8.58045C13.488 8.9686 13.4371 9.34299 13.3352 9.70361C13.2361 10.0642 13.0944 10.4014 12.9099 10.7153C12.7255 11.0263 12.5039 11.3113 12.2451 11.57C11.9891 11.826 11.7042 12.0463 11.3904 12.2307C11.0793 12.4151 10.7435 12.5583 10.3828 12.6601C10.0222 12.7592 9.64783 12.8088 9.25968 12.8088C8.87153 12.8088 8.49715 12.7592 8.13653 12.6601C7.77591 12.5583 7.43869 12.4151 7.12487 12.2307C6.8138 12.0463 6.52888 11.826 6.27011 11.57C6.0141 11.3113 5.79387 11.0263 5.60944 10.7153C5.425 10.4014 5.28185 10.0642 5.17999 9.70361C5.08089 9.34299 5.03134 8.9686 5.03134 8.58045C5.03134 8.19231 5.08089 7.81792 5.17999 7.4573C5.28185 7.09668 5.425 6.76084 5.60944 6.44977C5.79387 6.13594 6.0141 5.85103 6.27011 5.59501C6.52888 5.33625 6.8138 5.11464 7.12487 4.93021C7.43869 4.74577 7.77591 4.604 8.13653 4.50489C8.49715 4.40304 8.87153 4.35211 9.25968 4.35211Z" fill="#E51400" />
                            </svg>
                            <p className={`text-red-600 font-bold font-[Meta] text-xs ml-1 inline self-center animate-pulse `}> No Entry </p>
                        </>
                    }

                </span>


                <span className={`row-start-1 col-start-1 col-end-4 self-end border-2 ${chain == 'Polygon' ? 'border-[#7b3fe4]' : chain == 'Ethereum' ? 'border-[#3B3B3B]' : chain == 'Binance' ? 'border-[#F0B90B]' : chain == "Avalanche" ? 'border-[#E84142]' : ''} `} ></span>

                <span className={`flex row-start-2 col-start-1 col-end-4 self-center justify-self-start`}>

                    <svg className={`inline ml-2`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V10Z" fill="#7E869E" fillOpacity="0.25" />
                        <circle cx="12" cy="12" r="2" fill="#6FCF97" />
                        <rect x="5" y="8" width="3" height="1" rx="0.5" fill="#6FCF97" />
                        <rect x="16" y="15" width="3" height="1" rx="0.5" fill="#6FCF97" />
                    </svg>

                    <p className={`text-[#6FCF97] font-[Meta] text-xs sm:text-base inline row-start-2 col-start-1 self-center ml-4`}> Entrance Fee:</p>
                    <p className={`text-[#6FCF97] font-bold font-[Meta] text-xs sm:text-base inline row-start-2 col-start-1 self-center ml-4 tracking-tight`}>{ethers.utils.formatEther(raffle.entranceFee._hex)} {currency}</p>

                </span>

                <span className={`flex row-start-2 col-start-3  self-center justify-self-center`}>
                    {parseInt(raffle.lastTimeStamp._hex) == 0 ?
                        <>
                        </>
                        :
                        <>
                            <Countdown date={lastTimeStamp} renderer={(props) =>
                                props.completed ?
                                    <>
                                    </>
                                    :
                                    <>
                                        <p className={`text-[#6FCF97] font-[Meta] text-xs sm:text-base inline`}> Time left:</p>
                                        <p className={`text-[#6FCF97] font-bold font-[Meta] text-xs sm:text-lg ml-4 animate-pulse`}> 0{props.minutes}:{props.seconds}
                                        </p>
                                    </>


                            }
                            />
                        </>
                    }

                </span>

                <span className={`row-start-3 col-start-1 self-center flex justify-self-start`}>
                    <svg className={`inline ml-2`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 19C2 19.5523 2.44772 20 3 20C3.55228 20 4 19.5523 4 19H2ZM14 19C14 19.5523 14.4477 20 15 20C15.5523 20 16 19.5523 16 19H14ZM15 10C14.4477 10 14 10.4477 14 11C14 11.5523 14.4477 12 15 12V10ZM15 4C14.4477 4 14 4.44772 14 5C14 5.55228 14.4477 6 15 6V4ZM20 19C20 19.5523 20.4477 20 21 20C21.5523 20 22 19.5523 22 19H20ZM16.5 13C15.9477 13 15.5 13.4477 15.5 14C15.5 14.5523 15.9477 15 16.5 15V13ZM4 19V18H2V19H4ZM7 15H11V13H7V15ZM14 18V19H16V18H14ZM11 8C11 9.10457 10.1046 10 9 10V12C11.2091 12 13 10.2091 13 8H11ZM9 10C7.89543 10 7 9.10457 7 8H5C5 10.2091 6.79086 12 9 12V10ZM7 8C7 6.89543 7.89543 6 9 6V4C6.79086 4 5 5.79086 5 8H7ZM9 6C10.1046 6 11 6.89543 11 8H13C13 5.79086 11.2091 4 9 4V6ZM17 8C17 9.10457 16.1046 10 15 10V12C17.2091 12 19 10.2091 19 8H17ZM15 6C16.1046 6 17 6.89543 17 8H19C19 5.79086 17.2091 4 15 4V6ZM20 18V19H22V18H20ZM16.5 15H17V13H16.5V15ZM22 18C22 15.2386 19.7614 13 17 13V15C18.6569 15 20 16.3431 20 18H22ZM11 15C12.6569 15 14 16.3431 14 18H16C16 15.2386 13.7614 13 11 13V15ZM4 18C4 16.3431 5.34315 15 7 15V13C4.23858 13 2 15.2386 2 18H4Z" fill="#6FCF97" />
                    </svg>
                    <p className={`text-[#6FCF97] font-[Meta] text-xs sm:text-base inline ml-4 self-center`}>Players: </p>
                    <p className={`text-[#6FCF97] font-bold font-[Meta] text-xs sm:text-base inline ml-4 tracking-tight self-center`}>{raffle.players.length}  </p>

                </span>


                <span className={`row-start-4 col-start-1  col-end-4 self-center flex justify-self-start`}>
                    <svg className={`inline ml-2`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="#6FCF97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.5 9.08333L14.3563 8.96356C13.9968 8.66403 13.5438 8.5 13.0759 8.5H10.75C9.7835 8.5 9 9.2835 9 10.25V10.25C9 11.2165 9.7835 12 10.75 12H13.25C14.2165 12 15 12.7835 15 13.75V13.75C15 14.7165 14.2165 15.5 13.25 15.5H10.412C9.8913 15.5 9.39114 15.2969 9.01782 14.934L9 14.9167" stroke="#6FCF97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8L12 7" stroke="#6FCF97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 17V16" stroke="#6FCF97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>


                    <p className={`text-[#6FCF97] font-[Meta] text-xs sm:text-base inline ml-4 self-center `}>Balance: </p>
                    <p className={`text-[#6FCF97] font-bold font-[Meta] text-xs sm:text-base inline ml-4 tracking-tight self-center`}>{ethers.utils.formatEther(raffle.balance._hex)} {currency} </p>

                </span>

                <span className={`row-start-5 col-start-1 col-end-4 self-center flex justify-self-start`}>

                    <svg className={`inline ml-2`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 3.5H17.7C19.4913 3.5 20.387 3.5 20.9435 4.0565C21.5 4.61299 21.5 5.50866 21.5 7.3V7.5" stroke="#6FCF97" strokeLinecap="round" />
                        <path d="M17.5 20.5H17.7C19.4913 20.5 20.387 20.5 20.9435 19.9435C21.5 19.387 21.5 18.4913 21.5 16.7V16.5" stroke="#6FCF97" strokeLinecap="round" />
                        <path d="M6.5 3.5H6.3C4.50866 3.5 3.61299 3.5 3.0565 4.0565C2.5 4.61299 2.5 5.50866 2.5 7.3V7.5" stroke="#6FCF97" strokeLinecap="round" />
                        <path d="M6.5 20.5H6.3C4.50866 20.5 3.61299 20.5 3.0565 19.9435C2.5 19.387 2.5 18.4913 2.5 16.7V16.5" stroke="#6FCF97" strokeLinecap="round" />
                        <path d="M7.21484 15.7847C7.68758 15.1024 8.37508 14.5254 9.21678 14.1204C10.0585 13.7155 11.0187 13.5 12 13.5C12.9813 13.5 13.9415 13.7155 14.7832 14.1204C15.6249 14.5254 16.3124 15.1024 16.7852 15.7847" stroke="#6FCF97" strokeLinecap="round" />
                        <circle cx="12" cy="9" r="2.5" stroke="#6FCF97" strokeLinecap="round" />
                    </svg>

                    <p className={`text-[#6FCF97] font-[Meta] text-xs sm:text-base inline sm:ml-4 self-center`}>Recent Winner: </p>
                    <p className={`text-[#6FCF97] font-bold font-[Meta] text-xs sm:text-base inline ml-2 tracking-tight self-center`}>{raffle.recentWinner.substring(0, 7)}...{raffle.recentWinner.substring(37, 42)} </p>

                </span>

                <span className={`row-start-6 col-start-1 col-end-4 self-center flex justify-self-start`}>

                    <svg className={`inline ml-2`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="8" fill="#7E869E" fillOpacity="0.25" />
                        <path d="M12 7V11.75C12 11.8881 12.1119 12 12.25 12H15" stroke="#6FCF97" strokeLinecap="round" />
                    </svg>
                    <p className={`text-[#6FCF97]  font-[Meta] text-xs sm:text-base inline ml-4 self-center`}>Duration: </p>
                    <p className={`text-[#6FCF97] font-bold font-[Meta] text-xs sm:text-base inline ml-2 tracking-tight self-center `}>2 mins </p>

                </span>


                <span className={`row-start-6 col-start-1 col-end-4 self-end border-[2px]  
            ${chain == 'Polygon' ? 'border-[#7b3fe4]' : chain == 'Ethereum' ? 'border-[#3B3B3B]' : chain == 'Binance' ? 'border-[#F0B90B]' : chain == "Avalanche" ? 'border-[#E84142]' : ''} `} ></span>

                <button
                    disabled={raffle.raffleState == 1}
                    onClick={() => {
                        enterRaffle(raffle.entranceFee._hex)
                    }}
                    className={`text-[#6f6ec6] font-[Meta] text-base
                 row-start-7 col-start-1 col-end-4 px-4 self-center justify-self-center
                  ${chain == 'Polygon' ? 'hover:text-[#7B3FE4]' : chain == 'Ethereum' ? 'hover:text-[darkgrey]' : chain == 'Binance' ? 'hover:text-[#F0B90B]' : chain == "Avalanche" ? 'hover:text-[#E84142]' : ''}
                }`}>Enter Draw </button>
            </span>
        )
    }
}

export default RaffleComponent;

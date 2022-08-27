// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

import "hardhat/console.sol";

error Raffle__WrongAmount();
error Raffle__UpkeepNotNeeded();
error Raffle__TransferFailed();

/**
@title Raffle-mania Smart Contract  
@author Ibrahim Samara Twitter: @dev_jdeed
@dev This implements Chainlink VRF V2 and Chainlink Keepers 
 */

contract Raffle is VRFConsumerBaseV2, KeeperCompatibleInterface {
    // Type Declarations
    enum RaffleState {
        OPEN,
        CALCULATING
    }
    // Chainlink VRF Variables
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    uint64 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint256 private immutable i_interval;
    uint256 private immutable i_mania_interval;

    // Structs
    struct raffle {
        uint256 entranceFee;
        uint256 lastTimeStamp;
        address recentWinner;
        address payable[] players;
        RaffleState raffleState;
        uint256 balance;
        bytes32 name;
    }

    struct raffleMania {
        uint256 lastTimeStamp;
        address recentWinner;
        address payable[] players;
        RaffleState raffleState;
        uint256 balance;
    }

    // Raffle Variables
    raffle[] public s_raffles;
    mapping(uint256 => bool) s_raffleToPerform;
    // RaffleMania Variables
    raffleMania public s_raffleMania;
    bool public raffleManiaToPerform;
    // Raffle Events
    event RaffleEnter(address indexed player, uint256 raffleEntered);
    event RaffleCalculating(uint256 rafflePerforming);
    event RaffleWon(address indexed player, uint256 raffleWon);
    // RaffleMania Events
    event RaffleManiaWon(address indexed player, uint256 amount);
    event RaffleManiaCalculating(RaffleState state);

    constructor(
        address vrfCoordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane, // keyHash
        uint256 interval,
        uint256 maniaInterval,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        // Initialize VRF variables to performUpkeep
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_interval = interval;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        i_mania_interval = maniaInterval;
        // Creating 4 raffles each with the respective entranceFee  0.01, 0.25, 0.5, 1

        s_raffles.push(
            raffle(
                10000000000000000,
                0,
                address(0),
                new address payable[](0),
                RaffleState.OPEN,
                0,
                "Pleb"
            )
        );

        s_raffles.push(
            raffle(
                250000000000000000,
                0,
                address(0),
                new address payable[](0),
                RaffleState.OPEN,
                0,
                ""
            )
        );

        s_raffles.push(
            raffle(
                500000000000000000,
                0,
                address(0),
                new address payable[](0),
                RaffleState.OPEN,
                0,
                ""
            )
        );

        s_raffles.push(
            raffle(
                1000000000000000000,
                0,
                address(0),
                new address payable[](0),
                RaffleState.OPEN,
                0,
                "Degen"
            )
        );
    }

    function EnterRaffle() public payable {
        bool firstCheck = (msg.value != s_raffles[0].entranceFee);
        bool secondCheck = (msg.value != s_raffles[1].entranceFee);
        bool thirdCheck = (msg.value != s_raffles[2].entranceFee);
        bool fourthCheck = (msg.value != s_raffles[3].entranceFee);
        // If amount sent does'nt match any of the raffle entranceFee revert transaction with Raffle__WrongAmount();
        bool dontAcceptPayement = (firstCheck &&
            secondCheck &&
            thirdCheck &&
            fourthCheck);

        if (dontAcceptPayement) {
            revert Raffle__WrongAmount();
        }
        /**
         * @dev This is the function that allows 'players' to join the raffle
         * the following conditions should be true to add players to an array of players for that specific raffle:
         * 1. msg.value == entrance fee.
         * 2. The lottery is open.

         @dev This function allocated 3% to RaffleMania and 95% to the raffle.  
         */

        // Number of Raffles available
        uint256 raffleCount = s_raffles.length;

        for (uint256 i = 0; i < raffleCount; i++) {
            // msg.value needs to match entry fee for that specific raffle
            if (s_raffles[i].entranceFee == msg.value) {
                // Needs to be Open
                if (s_raffles[i].raffleState == RaffleState.OPEN) {
                    // If no players are in the raffle, activate timer.
                    if (s_raffles[i].players.length == 0) {
                        s_raffles[i].lastTimeStamp = block.timestamp;
                    }
                    // Otherwise add next player to raffle and increase raffle balance
                    s_raffles[i].players.push(payable(msg.sender));
                    s_raffles[i].balance += (msg.value / 100) * 95;
                    emit RaffleEnter(msg.sender, i);

                    // Rafflemania
                    // If raffleMania is performing return 3% to sender for not Qualifiying.
                    if (s_raffleMania.raffleState == RaffleState.CALCULATING) {
                        (bool success, ) = msg.sender.call{
                            value: (msg.value / 100) * 3
                        }("");

                        if (!success) {
                            revert Raffle__TransferFailed();
                        }
                    }
                    // Otherwise check if raffle needs activating timer and then add player and balances.
                    else {
                        // If no players are in the raffle, activate timer.
                        if (s_raffleMania.players.length == 0) {
                            s_raffleMania.lastTimeStamp = block.timestamp;
                        }
                        s_raffleMania.balance += (msg.value / 100) * 3;
                        s_raffleMania.players.push(payable(msg.sender));
                    }
                }
            } else {}
        }
    }

    /**
     * @dev This is the function that the Chainlink Keeper nodes call
     * they look for `upkeepNeeded` to return True.
     * the following should be true for this to return true:
     * 1. The time interval has passed between raffle runs.
     * 2. The lottery is open.
     * 4. Implicity, this contract's subscription is funded with LINK.
     */

    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /*CheckData*/
        )
    {
        // Number of Raffles available
        uint256 raffleCount = s_raffles.length;
        // loop over raffles to check if upKeep is required for ANY raffle
        for (uint256 i = 0; i < raffleCount; i++) {
            bool isOpen = s_raffles[i].raffleState == RaffleState.OPEN;
            bool timePassed = ((block.timestamp - s_raffles[i].lastTimeStamp) >
                i_interval);
            bool hasPlayers = s_raffles[i].players.length > 0;
            upkeepNeeded = (timePassed && isOpen && hasPlayers);
            // If any raffle returns upkeepNeeded == true, then we break loop and return upkeepNeeded
            if (upkeepNeeded) {
                break;
            }
            // Check if RaffleMania requires  upkeepNeeded
            bool mania_isOpen = s_raffleMania.raffleState == RaffleState.OPEN;
            bool mania_timePassed = ((block.timestamp -
                s_raffleMania.lastTimeStamp) > i_mania_interval);
            bool mania_hasPlayers = s_raffleMania.players.length > 0;

            upkeepNeeded = (mania_timePassed &&
                mania_isOpen &&
                mania_hasPlayers);
            // Reassigning upkeepNeeded to check if it returns true, then we break loop and return upkeepNeeded
            if (upkeepNeeded) {
                break;
            }
        }
        return (upkeepNeeded, "0x0"); // can we comment this out?
    }

    /**
     * @dev Once `checkUpkeep` is returning `true`, this function is called
     * and it kicks off a Chainlink VRF call to get a random winner.
     */

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");

        if (!upkeepNeeded) {
            revert Raffle__UpkeepNotNeeded();
        }

        // Number of Raffles available
        uint256 raffleCount = s_raffles.length;
        // Number of random words to request from Chainlink VRF
        uint32 NUM_WORDS;
        // bool check for every raffle if it needs to perform
        bool m_upkeepNeeded;
        // bool check for raffleMania if it needs to perform
        bool mania_upkeepNeeded;

        for (uint256 i = 0; i < raffleCount; i++) {
            bool isOpen = s_raffles[i].raffleState == RaffleState.OPEN;
            bool timePassed = ((block.timestamp - s_raffles[i].lastTimeStamp) >
                i_interval);
            bool hasPlayers = s_raffles[i].players.length > 0;
            m_upkeepNeeded = (timePassed && isOpen && hasPlayers);

            // This raffle needs to perform: Increase number of words required from VRF + Mark this raffle that it needs to perform.
            if (m_upkeepNeeded) {
                NUM_WORDS++;
                s_raffleToPerform[i] = true;
                s_raffles[i].raffleState = RaffleState.CALCULATING;
                emit RaffleCalculating(i);
            } else {
                s_raffleToPerform[i] = false;
            }
        }

        // RaffleMania check if it needs to perform
        bool mania_isOpen = s_raffleMania.raffleState == RaffleState.OPEN;
        bool mania_timePassed = ((block.timestamp -
            s_raffleMania.lastTimeStamp) > i_mania_interval);
        bool mania_hasPlayers = s_raffleMania.players.length > 0;

        mania_upkeepNeeded = (mania_timePassed &&
            mania_isOpen &&
            mania_hasPlayers);

        if (mania_upkeepNeeded) {
            raffleManiaToPerform = true;
            NUM_WORDS++;
            s_raffleMania.raffleState = RaffleState.CALCULATING;
            emit RaffleManiaCalculating(RaffleState.CALCULATING);
        }

        // Initiate request for random words
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
    }

    /**
     * @dev This is the function that Chainlink VRF node
     * calls to: Select the winner + send the money to the random winner.
     */

    function fulfillRandomWords(
        uint256, /*requestId*/
        uint256[] memory randomWords
    ) internal override {
        // Number of Raffles available
        uint256 raffleCount = s_raffles.length;

        uint256 wordToChoose = randomWords.length - 1;

        for (uint256 i = 0; i < raffleCount; i++) {
            if (s_raffleToPerform[i] == true) {
                uint256 indexofWinner = randomWords[wordToChoose] %
                    s_raffles[i].players.length;
                address payable recentWinner = s_raffles[i].players[
                    indexofWinner
                ];
                s_raffles[i].recentWinner = recentWinner;
                // Reseting VARIABLES
                s_raffles[i].raffleState = RaffleState.OPEN;
                s_raffles[i].players = new address payable[](0);
                s_raffles[i].lastTimeStamp = 0;
                s_raffleToPerform[i] = false;

                emit RaffleWon(recentWinner, i);

                (bool success, ) = recentWinner.call{
                    value: s_raffles[i].balance
                }("");
                if (!success) {
                    revert Raffle__TransferFailed();
                }
                // Reset Raffle Balance AFTER success
                s_raffles[i].balance = 0;
            }
        }

        if (raffleManiaToPerform) {
            uint256 indexofWinner = randomWords[wordToChoose] %
                s_raffleMania.players.length;
            address payable recentWinner = s_raffleMania.players[indexofWinner];
            s_raffleMania.recentWinner = recentWinner;
            // Reseting VARIABLES
            s_raffleMania.raffleState = RaffleState.OPEN;
            s_raffleMania.players = new address payable[](0);
            s_raffleMania.lastTimeStamp = 0;
            raffleManiaToPerform = false;

            emit RaffleManiaWon(recentWinner, s_raffleMania.balance);

            (bool success, ) = recentWinner.call{value: s_raffleMania.balance}(
                ""
            );

            if (!success) {
                revert Raffle__TransferFailed();
            }
            // Reset Raffle Balance AFTER success
            s_raffleMania.balance = 0;
        }
    }

    // View / Pure Functions
    function getRaffle(uint256 index) public view returns (raffle memory) {
        return s_raffles[index];
    }

    function getallRaffles() public view returns (raffle[] memory) {
        return s_raffles;
    }

    function getRaffleManiaCount() public view returns (uint256 length) {
        length = s_raffleMania.players.length;
        return length;
    }
}

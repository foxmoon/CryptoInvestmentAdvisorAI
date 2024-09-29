import Web3 from 'web3';

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const RPC_URL = "https://rpc.ankr.com/eth_sepolia";

export async function getChainlinkData(aggregatorAddress) {
  try {
    console.log("Using RPC URL:", RPC_URL);
    const web3 = new Web3(RPC_URL);
    const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, aggregatorAddress);

    const roundData = await priceFeed.methods.latestRoundData().call();
    const decimals = await priceFeed.methods.decimals().call();

    if (!roundData.answer || !decimals) {
      throw new Error("Invalid data received from Chainlink");
    }

    const price = (Number(roundData.answer.toString()) / Math.pow(10, Number(decimals))).toFixed(2);
    const updatedAt = new Date(Number(roundData.updatedAt) * 1000).toISOString();

    console.log("Fetched price:", price, "Updated at:", updatedAt);

    return { price, updatedAt };
  } catch (error) {
    console.error("Error in getChainlinkData:", error);
    throw error;
  }
}

import { ethers } from 'ethers';

const AGGREGATOR_ABI = [{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"}];

export async function getChainlinkData(providerUrl, aggregatorAddress) {
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const aggregator = new ethers.Contract(aggregatorAddress, AGGREGATOR_ABI, provider);

  try {
    const roundData = await aggregator.latestRoundData();
    return {
      price: ethers.utils.formatUnits(roundData.answer, 8),
      updatedAt: new Date(roundData.updatedAt.toNumber() * 1000).toISOString()
    };
  } catch (error) {
    console.error("Error fetching Chainlink data:", error);
    return null;
  }
}
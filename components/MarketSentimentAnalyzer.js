import { useState, useEffect } from 'react';
import Web3 from 'web3';

export default function MarketSentimentAnalyzer({ onSentimentChange }) {
  const [sentiment, setSentiment] = useState(null);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const web3 = new Web3("https://rpc.ankr.com/eth_sepolia");
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

        // 替换为BTC/USDT的Chainlink Price Feed地址
        const btcUsdtPriceFeedAddress = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";
        const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, btcUsdtPriceFeedAddress);

        const roundData = await priceFeed.methods.latestRoundData().call();
        const decimals = await priceFeed.methods.decimals().call();
        const price = Number(roundData.answer) / Math.pow(10, decimals);

        let currentSentiment = 'Neutral';

        if (price < 50000) {
          currentSentiment = 'Bearish';
        } else if (price >= 60000 && price < 65000) {
          currentSentiment = 'Neutral';
        } else if (price >= 65000) {
          currentSentiment = 'Bullish';
        }

        setSentiment(currentSentiment);
        onSentimentChange(currentSentiment);
      } catch (error) {
        console.error('Error fetching market sentiment:', error);
        setSentiment('Neutral'); // 默认值
        onSentimentChange('Neutral');
      }
    };

    fetchSentiment();
    // 设置一个定时器，每5分钟更新一次情绪
    const timer = setInterval(fetchSentiment, 5 * 60 * 1000);

    return () => clearInterval(timer);
  }, [onSentimentChange]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium">Market Sentiment:</h3>
      <p className={`text-xl font-bold ${
        sentiment === 'Bullish' ? 'text-green-600' :
        sentiment === 'Bearish' ? 'text-red-600' :
        'text-yellow-600'
      }`}>
        {sentiment || 'Loading...'}
      </p>
    </div>
  );
}

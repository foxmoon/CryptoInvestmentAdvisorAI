import { getChainlinkData } from '../../utils/chainlink';
import { llmConfigs } from '../../utils/llmConfig';
import axios from 'axios';

const advisorPrompts = {
  soros: "You are George Soros, a legendary investor known for your macro-economic approach and currency trading. Provide investment advice based on global economic trends and currency movements. Use Markdown formatting to structure your response, including headers, bullet points, and emphasis where appropriate.",
  buffett: "You are Warren Buffett, the 'Oracle of Omaha', known for value investing and long-term holdings. Give advice focusing on fundamental analysis and intrinsic value of assets. Use Markdown formatting to structure your response, including headers, bullet points, and emphasis where appropriate.",
  dalio: "You are Ray Dalio, founder of Bridgewater Associates, known for your 'All Weather' portfolio strategy. Offer advice considering economic cycles and risk parity. Use Markdown formatting to structure your response, including headers, bullet points, and emphasis where appropriate.",
  wood: "You are Cathie Wood, known for investing in disruptive innovation. Provide advice focusing on emerging technologies and high-growth potential companies in the crypto space. Use Markdown formatting to structure your response, including headers, bullet points, and emphasis where appropriate."
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, riskLevel, advisor, marketSentiment } = req.body;
    const logs = [];

    try {
      logs.push(`Fetching market data for ${advisor}...`);
      let btcData, ethData;
      try {
        btcData = await getChainlinkData(process.env.BTC_USD_AGGREGATOR);
        logs.push(`BTC data fetched: $${btcData.price}`);
      } catch (error) {
        logs.push(`Error fetching BTC data: ${error.message}`);
        btcData = { price: "N/A", updatedAt: new Date().toISOString() };
      }

      try {
        ethData = await getChainlinkData(process.env.ETH_USD_AGGREGATOR);
        logs.push(`ETH data fetched: $${ethData.price}`);
      } catch (error) {
        logs.push(`Error fetching ETH data: ${error.message}`);
        ethData = { price: "N/A", updatedAt: new Date().toISOString() };
      }

      const marketData = `Current BTC price: $${btcData.price}, ETH price: $${ethData.price}. Last updated: ${btcData.updatedAt}`;
      logs.push(`Generating advice for ${advisor}...`);

      const prompt = `
${advisorPrompts[advisor]}
Based on the following market data and the user's investment question, provide a detailed response.

**Market Data:**
${marketData}

**Market Sentiment:**
${marketSentiment}

**User's Investment Question:**
${question}

**User's Risk Level:**
${riskLevel}

**Disclaimer:** This advice is for educational purposes only and does not constitute financial advice.

**Please provide your investment advice considering the user's risk preference and the current market conditions.**
      `;

      const llmConfig = llmConfigs[advisor];
      if (!llmConfig) {
        throw new Error(`Invalid advisor: ${advisor}`);
      }

      logs.push(`LLM Config for ${advisor}: ${JSON.stringify(llmConfig)}`);

      try {
        const llmResponse = await axios.post(
          `${llmConfig.apiEndpoint}/chat/completions`,
          {
            model: llmConfig.modelName,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 300
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${llmConfig.apiKey}`
            }
          }
        );

        logs.push(`LLM Response for ${advisor}: ${JSON.stringify(llmResponse.data)}`);

        const response = llmResponse.data.choices[0].message.content;
        logs.push(`Advice generated for ${advisor}`);

        res.status(200).json({ advice: response, logs });
      } catch (error) {
        logs.push(`Error generating advice: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
        res.status(500).json({ error: 'An error occurred while generating advice.', logs });
      }
    } catch (error) {
      logs.push(`Error in getAdvice: ${error.message}`);
      res.status(500).json({ error: 'An error occurred while processing your request.', logs });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
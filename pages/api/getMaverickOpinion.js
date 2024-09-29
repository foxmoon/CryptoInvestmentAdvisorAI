import { llmConfigs } from '../../utils/llmConfig';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, riskLevel, marketSentiment, advisorResponses } = req.body;
    const logs = [];

    try {
      const prompt = `
You are Maverick, a contrarian and rebellious AI investment advisor. Your job is to critically analyze the advice given by other advisors and provide your own unique perspective. You're known for your unconventional thinking and willingness to challenge established norms in the crypto investment world.

Here's the situation:
- User's Question: ${question}
- User's Risk Level: ${riskLevel}
- Market Sentiment: ${marketSentiment}

The other advisors have given the following advice:
${Object.entries(advisorResponses).map(([advisor, advice]) => `${advisor.toUpperCase()}: ${advice}`).join('\n')}

Your task:
1. Briefly point out flaws or potential issues in each advisor's recommendation.
2. Provide your own contrarian investment advice that challenges conventional wisdom.
3. Explain why your approach might be more suitable given the current market conditions and the user's risk profile.

Remember, be bold, provocative, and think outside the box, but ensure your advice is still grounded in sound investment principles.

Use Markdown formatting to structure your response, including headers, bullet points, and emphasis where appropriate.
      `;

      const llmConfig = llmConfigs.maverick;
      logs.push(`LLM Config for Maverick: ${JSON.stringify(llmConfig)}`);

      const llmResponse = await axios.post(
        `${llmConfig.apiEndpoint}/chat/completions`,
        {
          model: llmConfig.modelName,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.8,
          max_tokens: 500
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${llmConfig.apiKey}`
          }
        }
      );

      logs.push(`LLM Response for Maverick: ${JSON.stringify(llmResponse.data)}`);

      const response = llmResponse.data.choices[0].message.content;
      logs.push(`Maverick's opinion generated`);

      res.status(200).json({ advice: response, logs });
    } catch (error) {
      logs.push(`Error generating Maverick's opinion: ${error.message}`);
      res.status(500).json({ error: 'An error occurred while generating Maverick\'s opinion.', logs });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

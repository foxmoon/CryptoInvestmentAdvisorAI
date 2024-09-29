import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { responses } = req.body;
    
    const prompt = `Based on the following advice from different advisors, provide a consensus recommendation:\n\n${Object.entries(responses).map(([advisor, advice]) => `${advisor}: ${advice}`).join('\n\n')}`;
    
    try {
      const response = await axios.post(process.env.CONSENSUS_ENDPOINT, {
        model: 'llama',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      res.status(200).json({ consensus: response.data.choices[0].message.content.trim() });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to get consensus' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
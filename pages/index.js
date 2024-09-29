import { useState, useEffect } from 'react';
import Head from 'next/head';
import AdvisorResponse from '../components/AdvisorResponse';
import InvestmentSimulator from '../components/InvestmentSimulator';
import MarketSentimentAnalyzer from '../components/MarketSentimentAnalyzer';
import RiskAssessor from '../components/RiskAssessor';
import Console from '../components/Console';
import { marked } from 'marked';
import WalletConnection from '../components/WalletConnection';
import { useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';
import ExpandableContent from '../components/ExpandableContent';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [riskLevel, setRiskLevel] = useState('balanced');
  const [responses, setResponses] = useState({});
  const [maverickOpinion, setMaverickOpinion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [consensusAdvice, setConsensusAdvice] = useState('');
  const [logs, setLogs] = useState({});
  const [marketSentiment, setMarketSentiment] = useState(null);
  const { address, isConnected } = useAccount();
  console.log("Wallet connection status:", isConnected);
  const { data: session } = useSession();

  const advisors = [
    { name: 'soros', image: '/images/soros.png' },
    { name: 'buffett', image: '/images/buffett.png' },
    { name: 'dalio', image: '/images/dalio.png' },
    { name: 'wood', image: '/images/Katie_Haun.png' },
  ];

  useEffect(() => {
    console.log("Wallet connection status:", isConnected, "Address:", address);
  }, [isConnected, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clicked. isConnected:", isConnected, "address:", address);
    if (!isConnected) {
      open();
      return;
    }
    setIsLoading(true);
    setResponses({});
    setMaverickOpinion('');
    setConsensusAdvice('');
    setLogs({});

    try {
      // Fetch advice from all advisors
      const advisorPromises = advisors.map(advisor => 
        fetch('/api/getAdvice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question, riskLevel, advisor: advisor.name, marketSentiment }),
        }).then(res => res.json())
      );

      const advisorResults = await Promise.all(advisorPromises);
      const newResponses = {};
      const newLogs = {};
      advisorResults.forEach((result, index) => {
        const advisorName = advisors[index].name;
        newResponses[advisorName] = result.advice;
        newLogs[advisorName] = result.logs || [];
      });
      setResponses(newResponses);
      setLogs(newLogs);

      // Fetch Maverick's opinion
      const maverickResponse = await fetch('/api/getMaverickOpinion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, riskLevel, marketSentiment, advisorResponses: newResponses }),
      }).then(res => res.json());

      setMaverickOpinion(maverickResponse.advice);
      setLogs(prev => ({ ...prev, maverick: maverickResponse.logs }));

      // Calculate consensus advice
      const consensusAdvice = calculateConsensusAdvice(newResponses);
      setConsensusAdvice(consensusAdvice);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setLogs(prev => ({...prev, error: ['Error fetching advice: ' + error.message]}));
    }

    setIsLoading(false);
  };

  const calculateConsensusAdvice = (responses) => {
    // Combine all advisors' advice with markdown formatting
    const allAdvice = Object.values(responses).join('\n\n');
    return `
## Consensus Advice

After analyzing the recommendations from all advisors, here's a synthesized consensus view:

${allAdvice}

### Key Takeaways:

- Consider the diverse perspectives offered by each advisor
- Evaluate the advice in the context of your personal risk tolerance and investment goals
- Remember that this is a consensus view and may not capture all nuances of individual recommendations

*Always conduct your own research and consider consulting with a professional financial advisor before making investment decisions.*
    `;
  };

  const handleSentimentChange = (sentiment) => {
    setMarketSentiment(sentiment);
  };

  const renderMarkdown = (text) => {
    return { __html: marked(text) };
  };

  const isSubmitDisabled = !isConnected || !question.trim();
  console.log("Submit button disabled:", isSubmitDisabled, "isConnected:", isConnected, "question:", question);

  console.log("Render - isConnected:", isConnected, "address:", address, "question:", question);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Crypto Investment Advisor AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-5">Crypto Investment Advisor AI</h1>
            <WalletConnection />
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700">Your investment question</label>
                <input
                  type="text"
                  name="question"
                  id="question"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    console.log("Question updated:", e.target.value);
                  }}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="riskLevel" className="block text-sm font-medium text-gray-700">Risk Level</label>
                <select
                  id="riskLevel"
                  name="riskLevel"
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="conservative">Conservative</option>
                  <option value="balanced">Balanced</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitDisabled}
                onClick={(e) => {
                  console.log("Button clicked, disabled status:", isSubmitDisabled);
                  // ... 其余代码 ...
                }}
              >
                {isConnected ? 'Submit' : 'Connect Wallet to Submit'}
              </button>
            </form>
            <MarketSentimentAnalyzer onSentimentChange={handleSentimentChange} />
            <div className="mt-6 space-y-6">
              {advisors.map(advisor => (
                <div key={advisor.name}>
                  <AdvisorResponse
                    advisor={advisor.name}
                    response={responses[advisor.name]}
                    isLoading={isLoading}
                    imageUrl={advisor.image}
                  />
                </div>
              ))}
                     {maverickOpinion && (
          <ExpandableContent
            title={
              <div className="flex items-center">
                <img src="/images/maverick.png" alt="Maverick" className="w-8 h-8 mr-2 rounded-full" />
                Maverick's Contrarian View:
              </div>
            }
            content={maverickOpinion}
            bgColor="bg-red-100"
          />
        )}
        {consensusAdvice && (
          <ExpandableContent
            title="Consensus Advice:"
            content={consensusAdvice}
            bgColor="bg-green-100"
          />
        )}
            </div>
            {Object.keys(responses).length > 0 && (
              <InvestmentSimulator advisorResponses={responses} />
            )}
            {Object.keys(responses).length > 0 && marketSentiment && (
              <RiskAssessor responses={responses} marketSentiment={marketSentiment} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
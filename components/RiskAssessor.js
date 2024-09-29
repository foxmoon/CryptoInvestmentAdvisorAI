import { useState, useEffect } from 'react';

export default function RiskAssessor({ responses, marketSentiment }) {
  const [riskLevel, setRiskLevel] = useState(null);

  useEffect(() => {
    const assessRisk = () => {
      const riskFactors = Object.values(responses).map(analyzeRiskFromResponse);
      const marketRiskFactor = getMarketRiskFactor(marketSentiment);
      return calculateOverallRisk(riskFactors, marketRiskFactor);
    };

    setRiskLevel(assessRisk());
  }, [responses, marketSentiment]);

  const analyzeRiskFromResponse = (response) => {
    if (!response || typeof response !== 'string') {
      return 0; // 返回中性风险分数，如果响应无效
    }

    const lowRiskKeywords = ['conservative', 'safe', 'low risk'];
    const highRiskKeywords = ['aggressive', 'high risk', 'volatile'];
    
    let riskScore = 0;
    const lowerCaseResponse = response.toLowerCase();

    lowRiskKeywords.forEach(keyword => {
      if (lowerCaseResponse.includes(keyword)) riskScore -= 1;
    });
    highRiskKeywords.forEach(keyword => {
      if (lowerCaseResponse.includes(keyword)) riskScore += 1;
    });

    return riskScore;
  };

  const getMarketRiskFactor = (sentiment) => {
    switch (sentiment) {
      case 'Bullish': return -1;
      case 'Bearish': return 1;
      default: return 0;
    }
  };

  const calculateOverallRisk = (riskFactors, marketRiskFactor) => {
    if (riskFactors.length === 0) {
      return 'Unknown'; // 如果没有有效的风险因素，返回未知
    }
    const averageRisk = riskFactors.reduce((a, b) => a + b, 0) / riskFactors.length;
    const overallRisk = averageRisk + marketRiskFactor;

    if (overallRisk < -0.5) return 'Low';
    if (overallRisk > 0.5) return 'High';
    return 'Medium';
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium">Risk Assessment</h3>
      <p className={`text-xl font-bold ${
        riskLevel === 'Low' ? 'text-green-600' :
        riskLevel === 'High' ? 'text-red-600' :
        riskLevel === 'Medium' ? 'text-yellow-600' :
        'text-gray-600'
      }`}>
        {riskLevel || 'Assessing...'}
      </p>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function InvestmentSimulator({ advisorResponses }) {
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10);
  const [futureValue, setFutureValue] = useState(0);

  useEffect(() => {
    const suggestedParams = analyzeSuggestedParams(advisorResponses);
    setYears(suggestedParams.years);
    setRate(suggestedParams.rate);
  }, [advisorResponses]);

  useEffect(() => {
    const fv = initialInvestment * Math.pow((1 + rate / 100), years);
    setFutureValue(fv.toFixed(2));
  }, [initialInvestment, years, rate]);

  const analyzeSuggestedParams = (responses) => {
    let totalYears = 0;
    let totalRate = 0;
    let count = 0;

    Object.values(responses).forEach(response => {
      if (response && typeof response === 'string') {
        const yearMatch = response.match(/(\d+)\s*years?/);
        const rateMatch = response.match(/(\d+(?:\.\d+)?)%/);

        if (yearMatch) {
          totalYears += parseInt(yearMatch[1]);
          count++;
        }
        if (rateMatch) {
          totalRate += parseFloat(rateMatch[1]);
          count++;
        }
      }
    });

    return {
      years: count > 0 ? Math.round(totalYears / count) : 5,
      rate: count > 0 ? Math.round(totalRate / count) : 10
    };
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium">Investment Simulator</h3>
      <div className="mt-2 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Initial Investment ($)</label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Investment Duration (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Annual Return Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <p className="text-lg font-medium">Future Value: ${futureValue}</p>
        </div>
      </div>
    </div>
  );
}

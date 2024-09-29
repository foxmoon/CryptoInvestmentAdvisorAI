// utils/simulation.js

/**
 * Simple investment simulation based on advisors' recommendations.
 * This is a rudimentary example. For more accurate simulations, consider using libraries like Monte Carlo simulations.
 */

export function simulateInvestment(advisorResponses, riskLevel, marketSentiment) {
  // Example: Assign weights based on risk level
  const riskProfiles = {
    conservative: { btc: 30, eth: 40, alt: 20, stable: 10 },
    balanced: { btc: 40, eth: 35, alt: 20, stable: 5 },
    aggressive: { btc: 50, eth: 30, alt: 15, stable: 5 },
  };

  // Adjust based on market sentiment
  let allocation = { ...riskProfiles[riskLevel] };

  if (marketSentiment === 'Bearish') {
    allocation.alt -= 5;
    allocation.btc += 5;
  } else if (marketSentiment === 'Bullish') {
    allocation.alt += 5;
    allocation.btc -= 5;
  }

  // Normalize allocations
  const total = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  for (let asset in allocation) {
    allocation[asset] = (allocation[asset] / total) * 100;
  }

  // Example: Projected returns based on simple growth rates
  const projectedReturns = {
    btc: 1.05, // 5% growth
    eth: 1.07, // 7% growth
    alt: 1.10, // 10% growth
    stable: 1.02, // 2% growth
  };

  // Initial investment
  const initialInvestment = 10000; // $10,000

  // Calculate final portfolio value
  let finalValue = 0;
  for (let asset in allocation) {
    finalValue += (initialInvestment * (allocation[asset] / 100)) * projectedReturns[asset];
  }

  // Calculate total return
  const totalReturn = ((finalValue - initialInvestment) / initialInvestment) * 100;

  return {
    allocation,
    finalValue: finalValue.toFixed(2),
    totalReturn: totalReturn.toFixed(2),
  };
}
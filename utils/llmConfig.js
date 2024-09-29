export const llmConfigs = {
  soros: {
    apiEndpoint: process.env.SOROS_ENDPOINT,
    modelName: 'phi',
    apiKey: process.env.LLM_API_KEY
  },
  buffett: {
    apiEndpoint: process.env.BUFFETT_ENDPOINT,
    modelName: 'yicoder',
    apiKey: process.env.LLM_API_KEY
  },
  dalio: {
    apiEndpoint: process.env.DALIO_ENDPOINT,
    modelName: 'yicoder',
    apiKey: process.env.LLM_API_KEY
  },
  wood: {
    apiEndpoint: process.env.WOOD_ENDPOINT,
    modelName: 'phi',
    apiKey: process.env.LLM_API_KEY
  },
  maverick: {
    apiEndpoint: process.env.MAVERICK_ENDPOINT,
    modelName: 'phi',
    apiKey: process.env.LLM_API_KEY
  }
};
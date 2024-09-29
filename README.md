# Crypto Investment Advisor AI 项目文档

# Crypto Investment Advisor AI Project Documentation
https://www.cryptoadvisorai.xyz/
#(Due to request LLM time,part of functions is not enable)
---

## 项目介绍 / Project Introduction

### 中文 / Chinese

**Crypto Investment Advisor AI** 是一个基于区块链和人工智能技术的投资顾问系统。该系统通过集成 Chainlink 实时获取虚拟货币市场数据，结合 GaiaNet 的多角色 AI 节点，向用户提供个性化的投资建议。用户可以通过连接 Web3 钱包进行身份验证，输入投资问题后，系统将分析市场数据并通过不同 AI 角色节点生成专业建议。系统还包括一个投资模拟器，帮助用户直观地了解基于专家意见的潜在收益。

### English

**Crypto Investment Advisor AI** is an investment advisory system leveraging blockchain and artificial intelligence technologies. The system integrates Chainlink to fetch real-time cryptocurrency market data and utilizes GaiaNet's multi-role AI nodes to provide personalized investment advice to users. Users can authenticate via a Web3 wallet, submit investment questions, and the system will analyze market data and generate professional recommendations through different AI role nodes. Additionally, the system includes an investment simulator that offers users an intuitive understanding of potential returns based on expert opinions.

---

## 技术栈 / Technology Stack

- **前端 / Frontend**: Next.js, React
- **后端 / Backend**: Next.js API Routes
- **区块链集成 / Blockchain Integration**: Chainlink Oracles, Web3 Wallets (e.g., MetaMask)
- **人工智能 / Artificial Intelligence**: GaiaNet AI Nodes
- **样式 / Styling**: Tailwind CSS
- **数据库 / Database**: (如果有使用，可以列出)
- **其他 / Others**: NextAuth.js for authentication

---

## 功能概述 / Features Overview

- **实时市场数据**: 通过 Chainlink 调取并展示最新的虚拟币市场活跃度。
- **钱包认证**: 用户通过 Web3 钱包（如 MetaMask）进行安全认证。
- **多角色 AI 建议**: 集成多个 GaiaNet AI 角色节点（如 Soros, Buffett, Dalio, Wood），提供多元化的投资建议。
- **折叠展示**: 长篇建议内容自动折叠，仅显示前 100 字，用户可点击“查看详情”展开全文。
- **反对意见与共识汇总**: Most Brat Agent 提供独立反驳意见，并汇总专家意见形成共识建议。
- **投资模拟器**: 基于专家意见的量化投资模拟器，直观展示潜在收益。

---

## 部署指南 / Deployment Instructions

### 前提条件 / Prerequisites

- **Node.js**: v14.x 或以上
- **npm** 或 **Yarn**
- **Web3 钱包**（如 MetaMask）
- **Chainlink 账户**（用于获取 API 密钥）
- **GaiaNet 访问权限**（根据需要）

### 安装步骤 / Installation Steps

1. **克隆仓库 / Clone the Repository**

   ```bash
   git clone https://github.com/your-username/crypto-investment-advisor-ai.git
   cd crypto-investment-advisor-ai
   ```

2. **安装依赖 / Install Dependencies**

   使用 **npm**:

   ```bash
   npm install
   ```

   或使用 **Yarn**:

   ```bash
   yarn install
   ```

3. **配置环境变量 / Configure Environment Variables**

   创建一个 `.env.local` 文件并添加必要的环境变量：

   ```env
   NEXT_PUBLIC_CHAINLINK_API_KEY=your_chainlink_api_key
   NEXTAUTH_URL=http://localhost:3000
   # 其他必要的环境变量
   ```

4. **启动开发服务器 / Start the Development Server**

   使用 **npm**:

   ```bash
   npm run dev
   ```

   或使用 **Yarn**:

   ```bash
   yarn dev
   ```

   访问 [http://localhost:3000](http://localhost:3000) 查看应用。

5. **构建生产版 / Build for Production**

   使用 **npm**:

   ```bash
   npm run build
   npm start
   ```

   或使用 **Yarn**:

   ```bash
   yarn build
   yarn start
   ```

---

## 架构图 / Architecture Diagram

mermaid
graph TD
%% User Interaction
User[User] -->|Opens Page| Frontend[Next.js Frontend]
User -->|Logs In via Wallet| Wallet[Web3 Wallet (e.g., MetaMask)]
User -->|Submits Question| Frontend
%% Frontend Components
Frontend -->|Fetches Market Data| Chainlink[Chainlink Oracles]
Frontend -->|Handles Authentication| Wallet
Frontend -->|Sends Question & Data| Backend[Next.js API Routes]
%% Backend Processes
Backend -->|Requests Market Data| Chainlink
Backend -->|Sends to AI Nodes| GaiaNet[GaiaNet AI Nodes]
Backend -->|Fetches Maverick Opinion| MaverickAPI[Maverick's API]
Backend -->|Calculates Consensus| ConsensusModule[Consensus Module]
%% AI Nodes
GaiaNet -->|Returns Advice| Backend
GaiaNet -->|Logs Data| Logs[Logging Service]
%% Responses to Frontend
Backend -->|Sends Advisor Responses| Frontend
Backend -->|Sends Maverick Opinion| Frontend
Backend -->|Sends Consensus Advice| Frontend
%% Frontend Display Components
Frontend -->|Displays Advisor Responses| AdvisorResponse[AdvisorResponse Component]
Frontend -->|Displays Maverick Opinion| ExpandableContent[Maverick's Contrarian View]
Frontend -->|Displays Consensus Advice| ExpandableContent[Consensus Advice]
Frontend -->|Shows Market Sentiment| MarketSentiment[MarketSentimentAnalyzer]
Frontend -->|Assesses Risk| RiskAssessor[RiskAssessor]
Frontend -->|Simulates Investments| InvestmentSimulator[InvestmentSimulator Component]
Frontend -->|Displays Logs| Console[Console Component]
%% Styling and Data Flow
classDef frontend fill:#f9f,stroke:#333,stroke-width:2px;
classDef backend fill:#bbf,stroke:#333,stroke-width:2px;
classDef aiNodes fill:#bfb,stroke:#333,stroke-width:2px;
classDef components fill:#ffebcd,stroke:#333,stroke-width:2px;
class Frontend,Wallet,MarketSentiment,RiskAssessor,InvestmentSimulator,Console frontend;
class Backend,Chainlink,ConsensusModule,MaverickAPI backend;
class GaiaNet,Logs aiNodes;
class AdvisorResponse,ExpandableContent,InvestmentSimulator components;


### 架构概述 / Architecture Overview

This diagram illustrates the architecture of the **Crypto Investment Advisor AI** system, detailing the interaction between the frontend, backend, external services, and AI components.

本图展示了**加密投资顾问 AI**系统的架构，详细说明了前端、后端、外部服务和 AI 组件之间的交互。

### 组件划分 / Components Breakdown

1. **User / 用户**
   - Interacts with the system by accessing the webpage, logging in via a Web3 wallet, and submitting investment questions.
   - 通过访问网页、使用 Web3 钱包登录以及提交投资问题与系统交互。

2. **Frontend (Next.js Frontend) / 前端 (Next.js 前端)**
   - **AdvisorResponse Component**: Displays responses from different AI advisors with collapsible functionality.
   - **ExpandableContent Component**: Handles the display of Maverick's Contrarian View and Consensus Advice with collapsible sections.
   - **MarketSentimentAnalyzer**: Shows real-time market sentiment data.
   - **RiskAssessor**: Assesses investment risk based on user input and market data.
   - **InvestmentSimulator**: Provides a quantitative investment simulation based on expert advice.
   - **Console Component**: Displays logs and system messages for debugging and user information.

   - **Chainlink Oracles**: Fetches real-time cryptocurrency market data to display market activity.
   - **Wallet Connection**: Manages user authentication via Web3 wallets (e.g., MetaMask).

3. **Backend (Next.js API Routes) / 后端 (Next.js API 路由)**
   - **Chainlink Integration**: Requests and receives real-time market data.
   - **GaiaNet AI Nodes**: Sends user questions and market data to different AI role nodes (e.g., Soros, Buffett) for generating advice.
   - **Maverick's API**: Retrieves Maverick's Contrarian View based on experts' opinions.
   - **Consensus Module**: Aggregates and synthesizes expert advice into a consensus view.
   - **Logging Service**: Logs all interactions and data for monitoring and debugging purposes.

4. **AI Nodes / AI 节点**
   - **GaiaNet AI Nodes**: Each node represents a different expert advisor (e.g., Soros, Buffett). They process the market data and user questions to generate tailored investment advice.

5. **External Services / 外部服务**
   - **Chainlink Oracles**: Provides reliable and tamper-proof real-time data for the system.
   - **Web3 Wallets**: Enables secure user authentication and transaction signing.

### 数据流动 / Data Flow

1. **系统初始化 / System Initialization**
   - User accesses the frontend, which fetches real-time market data from Chainlink Oracles to display current market activity.
   - 用户访问前端，前端通过 Chainlink Oracles 获取实时市场数据以显示当前市场活跃度。

2. **用户认证 / User Authentication**
   - User clicks the login button and authenticates via their Web3 wallet (e.g., MetaMask). Upon successful authentication, the user can input their investment question.
   - 用户点击登录按钮，通过 Web3 钱包（如 MetaMask）进行认证。认证成功后，用户可以输入投资问题。

3. **提交问题 / Submitting a Question**
   - User enters a question, such as "Increase BTC 3 thd ?" and selects a risk level.
   - Upon clicking submit, the frontend sends the question along with selected risk level and market sentiment data to the backend API.
   - 用户输入问题，例如 "Increase BTC 3 thd ?" 并选择风险等级。点击提交后，前端将问题、选择的风险等级及市场情绪数据发送到后端 API。

4. **后端处理 / Backend Processing**
   - The backend requests the latest market data from Chainlink.
   - The backend sends the question and market data to each GaiaNet AI Node for generating individual advisor responses.
   - The backend also fetches Maverick's Contrarian View by sending the aggregated expert opinions.
   - After receiving all responses, the backend calculates a consensus advice by aggregating individual expert opinions.
   - 后端从 Chainlink 请求最新的市场数据。后端将问题和市场数据发送给每个 GaiaNet AI 节点，以生成各自的顾问回应。后端还通过发送汇总的专家意见来获取 Maverick 的反对意见。在收到所有回应后，后端通过汇总各个专家的意见来计算共识建议。

5. **显示回应 / Displaying Responses**
   - The frontend receives the advisor responses, Maverick's opinion, and consensus advice.
   - Each advisor's response is displayed using the **AdvisorResponse Component** with collapsible sections showing the first 100 characters and a "Read more" button to expand.
   - Maverick's Contrarian View and Consensus Advice are displayed using the **ExpandableContent Component**, also with collapsible functionality.
   - 前端接收顾问回应、Maverick 的意见和共识建议。每个顾问的回应使用 **AdvisorResponse Component** 显示，内容前 100 字可折叠，并有 "Read more" 按钮展开。Maverick 的反对意见和共识建议使用 **ExpandableContent Component** 显示，同样具有折叠功能。

6. **投资模拟 / Investment Simulation**
   - Based on the aggregated expert opinions, the **InvestmentSimulator Component** provides a quantitative simulation of potential investment returns, offering users an intuitive tool to visualize possible outcomes.
   - 基于汇总的专家意见，**InvestmentSimulator Component** 提供潜在投资回报的量化模拟，帮助用户直观地了解可能的结果。

### 样式与功能 / Styling and Functionality

- **折叠内容 / Collapsible Content**
  - The **AdvisorResponse Component** and **ExpandableContent Component** include collapsible functionality to manage lengthy texts, enhancing user experience without overwhelming them with information.
  - **AdvisorResponse Component** 和 **ExpandableContent Component** 包含折叠功能，用于管理冗长的文本，提升用户体验，避免信息过载。

- **动态数据渲染 / Dynamic Data Rendering**
  - Data from Chainlink and AI nodes is dynamically rendered on the frontend, ensuring real-time updates and accurate advice based on the latest market conditions.
  - 来自 Chainlink 和 AI 节点的数据在前端动态渲染，确保实时更新，并基于最新的市场状况提供准确的建议。

- **响应式设计 / Responsive Design**
  - The frontend is designed to be responsive, ensuring compatibility across various devices and screen sizes for seamless user interaction.
  - 前端设计为响应式，确保在各种设备和屏幕尺寸上兼容，提供无缝的用户交互体验。

---

## 结尾 / Conclusion

**Thank you for using Crypto Investment Advisor AI. We hope this system helps you make informed and profitable investment decisions in the cryptocurrency market.**

**感谢您使用加密投资顾问 AI。希望该系统能帮助您在虚拟货币市场中做出明智且有利可图的投资决策。**

---


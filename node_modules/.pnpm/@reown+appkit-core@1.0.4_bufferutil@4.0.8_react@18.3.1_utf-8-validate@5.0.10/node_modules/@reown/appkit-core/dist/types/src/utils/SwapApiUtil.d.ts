import type { SwapTokenWithBalance } from './TypeUtil.js';
import type { BlockchainApiSwapAllowanceRequest, BlockchainApiBalanceResponse } from './TypeUtil.js';
export type TokenInfo = {
    address: `0x${string}`;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
    domainVersion?: string;
    eip2612?: boolean;
    isFoT?: boolean;
    tags?: string[];
};
export declare const SwapApiUtil: {
    getTokenList(): Promise<SwapTokenWithBalance[]>;
    fetchGasPrice(): Promise<import("./TypeUtil.js").BlockchainApiGasPriceResponse | null>;
    fetchSwapAllowance({ tokenAddress, userAddress, sourceTokenAmount, sourceTokenDecimals }: Pick<BlockchainApiSwapAllowanceRequest, "userAddress" | "tokenAddress"> & {
        sourceTokenAmount: string;
        sourceTokenDecimals: number;
    }): Promise<boolean>;
    getMyTokensWithBalance(forceUpdate?: string): Promise<SwapTokenWithBalance[]>;
    mapBalancesToSwapTokens(balances: BlockchainApiBalanceResponse['balances']): SwapTokenWithBalance[];
};

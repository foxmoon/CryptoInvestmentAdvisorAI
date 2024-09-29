import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { SolConstantsUtil } from './SolanaConstantsUtil.js';
const NetworkImageIds = {
    '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'a1b58899-f671-4276-6a5e-56ca5bd59700',
    '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z': 'a1b58899-f671-4276-6a5e-56ca5bd59700',
    EtWTRABZaYq6iMfeYKouRu166VU2xqa1: 'a1b58899-f671-4276-6a5e-56ca5bd59700'
};
export const SolHelpersUtil = {
    detectRpcUrl(chain, projectId) {
        if (chain.rpcUrl.includes(new URL(CommonConstantsUtil.BLOCKCHAIN_API_RPC_URL).hostname)) {
            return `${chain.rpcUrl}?chainId=solana:${chain.chainId}&projectId=${projectId}`;
        }
        return chain.rpcUrl;
    },
    getChain(chains, chainId) {
        const chain = chains.find(lChain => lChain.chainId === chainId);
        if (chain) {
            return chain;
        }
        return SolConstantsUtil.DEFAULT_CHAIN;
    },
    getChainFromCaip(chains, chainCaipId = ':') {
        const chainId = (chainCaipId?.split(':')[1] ?? '').replace(/\s/gu, '');
        const selectedChain = chains.find(chain => chain.chainId === chainId);
        if (selectedChain) {
            return {
                ...selectedChain,
                id: `solana:${chainId}`,
                imageId: NetworkImageIds[chainId],
                chainNamespace: CommonConstantsUtil.CHAIN.SOLANA
            };
        }
        return {
            ...SolConstantsUtil.DEFAULT_CHAIN,
            id: `solana:${chainId}`,
            imageId: NetworkImageIds[chainId],
            chainNamespace: CommonConstantsUtil.CHAIN.SOLANA
        };
    },
    getCaipDefaultChain(chain) {
        if (!chain) {
            return undefined;
        }
        return {
            id: `solana:${chain.chainId}`,
            name: chain.name,
            imageId: NetworkImageIds[chain.chainId],
            chainNamespace: CommonConstantsUtil.CHAIN.SOLANA
        };
    },
    hexStringToNumber(value) {
        const hexString = value.startsWith('0x') ? value.slice(2) : value;
        const decimalValue = parseInt(hexString, 16);
        return decimalValue;
    },
    getAddress(provider) {
        const address = provider.publicKey?.toBase58();
        return address;
    }
};
//# sourceMappingURL=SolanaHelpersUtils.js.map
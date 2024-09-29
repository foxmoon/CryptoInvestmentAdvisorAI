import { ConstantsUtil as CommonConstantsUtil } from '@reown/appkit-common';
import { ConstantsUtil } from '../ConstantsUtil.js';
import { PresetsUtil } from '../PresetsUtil.js';
export const EthersHelpersUtil = {
    getCaipDefaultChain(chain) {
        if (!chain) {
            return undefined;
        }
        return {
            id: `${ConstantsUtil.EIP155}:${chain.chainId}`,
            name: chain.name,
            imageId: PresetsUtil.NetworkImageIds[chain.chainId],
            chainNamespace: CommonConstantsUtil.CHAIN.EVM
        };
    },
    hexStringToNumber(value) {
        const string = value.startsWith('0x') ? value.slice(2) : value;
        const number = parseInt(string, 16);
        return number;
    },
    numberToHexString(value) {
        return `0x${value.toString(16)}`;
    },
    async getUserInfo(provider) {
        const [addresses, chainId] = await Promise.all([
            EthersHelpersUtil.getAddresses(provider),
            EthersHelpersUtil.getChainId(provider)
        ]);
        return { chainId, addresses };
    },
    async getChainId(provider) {
        const chainId = await provider.request({ method: 'eth_chainId' });
        return Number(chainId);
    },
    async getAddress(provider) {
        const [address] = await provider.request({ method: 'eth_accounts' });
        return address;
    },
    async getAddresses(provider) {
        const addresses = await provider.request({ method: 'eth_accounts' });
        return addresses;
    },
    async addEthereumChain(provider, caipNetwork) {
        await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: EthersHelpersUtil.numberToHexString(caipNetwork.chainId),
                    rpcUrls: [caipNetwork.rpcUrl],
                    chainName: caipNetwork.name,
                    nativeCurrency: {
                        name: caipNetwork.currency,
                        decimals: 18,
                        symbol: caipNetwork.currency
                    },
                    blockExplorerUrls: [caipNetwork.explorerUrl],
                    iconUrls: [PresetsUtil.NetworkImageIds[caipNetwork.chainId]]
                }
            ]
        });
    }
};
//# sourceMappingURL=EthersHelpersUtil.js.map
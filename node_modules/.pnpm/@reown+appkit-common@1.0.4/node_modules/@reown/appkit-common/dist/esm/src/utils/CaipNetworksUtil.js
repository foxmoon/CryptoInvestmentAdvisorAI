const RPC_URL_HOST = 'rpc.walletconnect.org';
export const CaipNetworksUtil = {
    extendRpcUrlWithProjectId(rpcUrl, projectId) {
        const isReownUrl = rpcUrl.includes(RPC_URL_HOST);
        if (isReownUrl) {
            const url = new URL(rpcUrl);
            if (!url.searchParams.has('projectId')) {
                url.searchParams.set('projectId', projectId);
            }
            return url.toString();
        }
        return rpcUrl;
    },
    extendCaipNetwork(caipNetwork, { networkImageIds, customNetworkImageUrls, projectId }) {
        return {
            ...caipNetwork,
            imageId: networkImageIds[caipNetwork.chainId],
            imageUrl: customNetworkImageUrls?.[caipNetwork.chainId],
            rpcUrl: CaipNetworksUtil.extendRpcUrlWithProjectId(caipNetwork.rpcUrl, projectId)
        };
    },
    extendCaipNetworks(caipNetworks, { networkImageIds, customNetworkImageUrls, projectId }) {
        return caipNetworks.map(caipNetwork => CaipNetworksUtil.extendCaipNetwork(caipNetwork, {
            networkImageIds,
            customNetworkImageUrls,
            projectId
        }));
    }
};
//# sourceMappingURL=CaipNetworksUtil.js.map
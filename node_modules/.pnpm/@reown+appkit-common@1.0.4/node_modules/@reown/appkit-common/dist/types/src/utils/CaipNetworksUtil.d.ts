import type { CaipNetwork } from './TypeUtil.js';
type ExtendCaipNetworkParams = {
    networkImageIds: Record<number | string, string>;
    customNetworkImageUrls: Record<number | string, string> | undefined;
    projectId: string;
};
export declare const CaipNetworksUtil: {
    extendRpcUrlWithProjectId(rpcUrl: string, projectId: string): string;
    extendCaipNetwork(caipNetwork: CaipNetwork, { networkImageIds, customNetworkImageUrls, projectId }: ExtendCaipNetworkParams): CaipNetwork;
    extendCaipNetworks(caipNetworks: CaipNetwork[], { networkImageIds, customNetworkImageUrls, projectId }: ExtendCaipNetworkParams): CaipNetwork[];
};
export {};

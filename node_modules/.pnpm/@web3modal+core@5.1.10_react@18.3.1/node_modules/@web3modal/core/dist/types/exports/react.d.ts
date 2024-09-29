export declare function useAppKitNetwork(): {
    caipNetwork: {
        readonly id: `eip155:${string}` | `eip155:${number}` | `solana:${string}` | `solana:${number}` | `polkadot:${string}` | `polkadot:${number}`;
        readonly chainId: import("@reown/appkit-common").ChainId;
        readonly chainNamespace: import("@reown/appkit-common").ChainNamespace;
        readonly name: string;
        readonly currency: string;
        readonly explorerUrl: string;
        readonly rpcUrl: string;
        readonly imageUrl?: string | undefined;
        readonly imageId?: string | undefined;
    } | undefined;
    chainId: import("@reown/appkit-common").ChainId | undefined;
};
export declare function useAppKitAccount(): {
    caipAddress: `eip155:${string}:${string}` | `eip155:${number}:${string}` | `solana:${string}:${string}` | `solana:${number}:${string}` | `polkadot:${string}:${string}` | `polkadot:${number}:${string}` | undefined;
    address: string | undefined;
    isConnected: boolean;
    status: "reconnecting" | "connected" | "disconnected" | "connecting" | undefined;
};

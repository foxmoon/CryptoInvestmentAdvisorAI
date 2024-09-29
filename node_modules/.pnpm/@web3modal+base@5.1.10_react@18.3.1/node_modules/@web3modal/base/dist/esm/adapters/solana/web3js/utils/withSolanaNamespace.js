export function withSolanaNamespace(chainId) {
    if (typeof chainId === 'string') {
        return `solana:${chainId}`;
    }
    return undefined;
}
//# sourceMappingURL=withSolanaNamespace.js.map
export declare function getAddressFromMessage(message: string): string;
export declare function getChainIdFromMessage(message: string): string;
export declare function verifySignature({ address, message, signature, chainId, projectId }: {
    address: string;
    message: string;
    signature: string;
    chainId: string;
    projectId: string;
}): Promise<boolean>;

export declare const ContractUtil: {
    getERC20Abi: (tokenAddress: string) => {
        type: string;
        name: string;
        stateMutability: string;
        inputs: {
            name: string;
            type: string;
        }[];
        outputs: {
            name: string;
            type: string;
        }[];
    }[];
};

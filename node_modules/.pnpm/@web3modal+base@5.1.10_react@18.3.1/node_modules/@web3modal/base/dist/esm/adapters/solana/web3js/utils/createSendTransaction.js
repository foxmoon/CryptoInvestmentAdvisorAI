import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL, ComputeBudgetProgram } from '@solana/web3.js';
const COMPUTE_BUDGET_CONSTANTS = {
    UNIT_PRICE_MICRO_LAMPORTS: 20000000,
    UNIT_LIMIT: 500
};
export async function createSendTransaction({ provider, to, value, connection }) {
    if (!provider.publicKey) {
        throw Error('No public key found');
    }
    const toPubkey = new PublicKey(to);
    const lamports = Math.floor(value * LAMPORTS_PER_SOL);
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    const instructions = [
        ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: COMPUTE_BUDGET_CONSTANTS.UNIT_PRICE_MICRO_LAMPORTS
        }),
        ComputeBudgetProgram.setComputeUnitLimit({ units: COMPUTE_BUDGET_CONSTANTS.UNIT_LIMIT }),
        SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey,
            lamports
        })
    ];
    return new Transaction({ feePayer: provider.publicKey, blockhash, lastValidBlockHeight }).add(...instructions);
}
//# sourceMappingURL=createSendTransaction.js.map
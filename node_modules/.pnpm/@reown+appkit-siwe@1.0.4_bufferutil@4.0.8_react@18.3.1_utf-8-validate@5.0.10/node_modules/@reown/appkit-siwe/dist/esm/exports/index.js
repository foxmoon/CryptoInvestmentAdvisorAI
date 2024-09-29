import { AppKitSIWEClient } from '../src/client.js';
export { getAddressFromMessage, getChainIdFromMessage, verifySignature } from '../core/helpers/index.js';
export { formatMessage, getDidChainId, getDidAddress } from '@walletconnect/utils';
export { SIWEController } from '../core/controller/SIWEController.js';
export * from '../core/utils/TypeUtils.js';
export function createSIWEConfig(siweConfig) {
    return new AppKitSIWEClient(siweConfig);
}
export * from '../scaffold/partials/w3m-connecting-siwe/index.js';
export * from '../scaffold/views/w3m-connecting-siwe-view/index.js';
//# sourceMappingURL=index.js.map
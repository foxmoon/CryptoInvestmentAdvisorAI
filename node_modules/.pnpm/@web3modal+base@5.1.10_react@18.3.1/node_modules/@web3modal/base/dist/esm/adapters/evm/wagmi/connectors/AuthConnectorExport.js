import { authConnector as authConnectorWagmi } from './AuthConnector.js';
export function authConnector(parameters) {
    return authConnectorWagmi({
        email: true,
        showWallets: true,
        walletFeatures: true,
        ...parameters
    });
}
//# sourceMappingURL=AuthConnectorExport.js.map
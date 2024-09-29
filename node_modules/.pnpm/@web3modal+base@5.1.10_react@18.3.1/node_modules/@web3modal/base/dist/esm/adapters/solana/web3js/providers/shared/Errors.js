export class WalletStandardFeatureNotSupportedError extends Error {
    constructor(feature) {
        super(`The wallet does not support the "${feature}" feature`);
    }
}
export class WalletConnectMethodNotSupportedError extends Error {
    constructor(method) {
        super(`The method "${method}" is not supported by the wallet`);
    }
}
//# sourceMappingURL=Errors.js.map
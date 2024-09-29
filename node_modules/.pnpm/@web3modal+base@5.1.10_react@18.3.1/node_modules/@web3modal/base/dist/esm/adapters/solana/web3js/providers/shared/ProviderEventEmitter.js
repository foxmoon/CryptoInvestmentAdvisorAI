export class ProviderEventEmitter {
    constructor() {
        this.listeners = {
            accountsChanged: [],
            chainChanged: [],
            connect: [],
            disconnect: [],
            auth_rpcRequest: [],
            auth_rpcSuccess: [],
            auth_rpcError: []
        };
    }
    on(event, listener) {
        this.listeners[event].push(listener);
    }
    removeListener(event, listener) {
        this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    }
    emit(event, data) {
        this.listeners[event].forEach(listener => listener(data));
    }
}
//# sourceMappingURL=ProviderEventEmitter.js.map
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { proxy, ref, subscribe as sub } from 'valtio/vanilla';
import { ChainController, OptionsController } from '@reown/appkit-core';
const state = proxy({
    status: 'uninitialized'
});
export const SIWEController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    _getClient() {
        if (!state._client) {
            throw new Error('SIWEController client not set');
        }
        return state._client;
    },
    async getNonce(address) {
        const client = this._getClient();
        const nonce = await client.getNonce(address);
        this.setNonce(nonce);
        return nonce;
    },
    async getSession() {
        try {
            const client = this._getClient();
            const session = await client.getSession();
            if (session) {
                this.setSession(session);
                this.setStatus('success');
            }
            return session || undefined;
        }
        catch {
            return undefined;
        }
    },
    createMessage(args) {
        const client = this._getClient();
        const message = client.createMessage(args);
        this.setMessage(message);
        return message;
    },
    async verifyMessage(args) {
        const client = this._getClient();
        const isValid = await client.verifyMessage(args);
        return isValid;
    },
    async signIn() {
        const client = this._getClient();
        const session = await client.signIn();
        return session;
    },
    async signOut() {
        const client = this._getClient();
        await client.signOut();
        this.setStatus('ready');
        this.setSession(undefined);
        client.onSignOut?.();
    },
    onSignIn(args) {
        const client = this._getClient();
        client.onSignIn?.(args);
    },
    onSignOut() {
        const client = this._getClient();
        client.onSignOut?.();
    },
    async setSIWEClient(client) {
        state._client = ref(client);
        state.session = await this.getSession();
        state.status = state.session ? 'success' : 'ready';
        ChainController.setAccountProp('siweStatus', state.status, 'eip155');
        OptionsController.setIsSiweEnabled(client.options.enabled);
    },
    setNonce(nonce) {
        state.nonce = nonce;
    },
    setStatus(status) {
        state.status = status;
        ChainController.setAccountProp('siweStatus', state.status, 'eip155');
    },
    setMessage(message) {
        state.message = message;
    },
    setSession(session) {
        state.session = session;
        state.status = session ? 'success' : 'ready';
        ChainController.setAccountProp('siweStatus', state.status, 'eip155');
    }
};
//# sourceMappingURL=SIWEController.js.map
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { proxy, ref } from 'valtio/vanilla';
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js';
import { StorageUtil } from '../utils/StorageUtil.js';
import { TransactionsController } from './TransactionsController.js';
import { ChainController } from './ChainController.js';
import {} from '@reown/appkit-wallet';
import { ModalController } from './ModalController.js';
import { ConnectorController } from './ConnectorController.js';
import { EventsController } from './EventsController.js';
// -- State --------------------------------------------- //
const state = proxy({
    wcError: false,
    buffering: false,
    status: 'disconnected'
});
// -- Controller ---------------------------------------- //
export const ConnectionController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    _getClient(chain) {
        return ChainController.getConnectionControllerClient(chain);
    },
    setClient(client) {
        state._client = ref(client);
    },
    async connectWalletConnect() {
        StorageUtil.setConnectedConnector('WALLET_CONNECT');
        await ChainController.state?.universalAdapter?.connectionControllerClient?.connectWalletConnect?.(uri => {
            state.wcUri = uri;
            state.wcPairingExpiry = CoreHelperUtil.getPairingExpiry();
        });
    },
    async connectExternal(options, chain, setChain = true) {
        await this._getClient(chain).connectExternal?.(options);
        if (setChain) {
            ChainController.setActiveNamespace(chain);
            StorageUtil.setConnectedConnector(options.type);
        }
    },
    async reconnectExternal(options) {
        await this._getClient().reconnectExternal?.(options);
        StorageUtil.setConnectedConnector(options.type);
    },
    async setPreferredAccountType(accountType) {
        ModalController.setLoading(true);
        const authConnector = ConnectorController.getAuthConnector();
        if (!authConnector) {
            return;
        }
        await authConnector?.provider.setPreferredAccount(accountType);
        await this.reconnectExternal(authConnector);
        ModalController.setLoading(false);
        EventsController.sendEvent({
            type: 'track',
            event: 'SET_PREFERRED_ACCOUNT_TYPE',
            properties: { accountType, network: ChainController.state.activeCaipNetwork?.id || '' }
        });
    },
    async signMessage(message) {
        return this._getClient().signMessage(message);
    },
    parseUnits(value, decimals) {
        return this._getClient().parseUnits(value, decimals);
    },
    formatUnits(value, decimals) {
        return this._getClient().formatUnits(value, decimals);
    },
    async sendTransaction(args) {
        return this._getClient().sendTransaction(args);
    },
    async estimateGas(args) {
        return this._getClient().estimateGas(args);
    },
    async writeContract(args) {
        return this._getClient().writeContract(args);
    },
    async getEnsAddress(value) {
        return this._getClient().getEnsAddress(value);
    },
    async getEnsAvatar(value) {
        return this._getClient().getEnsAvatar(value);
    },
    checkInstalled(ids, chain) {
        return this._getClient(chain).checkInstalled?.(ids) || false;
    },
    resetWcConnection() {
        state.wcUri = undefined;
        state.wcPairingExpiry = undefined;
        state.wcLinking = undefined;
        state.recentWallet = undefined;
        TransactionsController.resetTransactions();
        StorageUtil.deleteWalletConnectDeepLink();
    },
    setWcLinking(wcLinking) {
        state.wcLinking = wcLinking;
    },
    setWcError(wcError) {
        state.wcError = wcError;
        state.buffering = false;
    },
    setRecentWallet(wallet) {
        state.recentWallet = wallet;
    },
    setBuffering(buffering) {
        state.buffering = buffering;
    },
    setStatus(status) {
        state.status = status;
    },
    async disconnect() {
        const connectionControllerClient = this._getClient();
        try {
            await connectionControllerClient?.disconnect();
            this.resetWcConnection();
        }
        catch (error) {
            throw new Error('Failed to disconnect');
        }
    }
};
//# sourceMappingURL=ConnectionController.js.map
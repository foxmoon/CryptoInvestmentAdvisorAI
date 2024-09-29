var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApiController, AssetUtil, ConnectorController, OptionsController, RouterController, StorageUtil } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { WalletUtil } from '../../utils/WalletUtil.js';
let W3mConnectRecommendedWidget = class W3mConnectRecommendedWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.connectors = ConnectorController.state.connectors;
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const connector = this.connectors.find(c => c.type === 'WALLET_CONNECT');
        if (!connector) {
            return null;
        }
        const { recommended } = ApiController.state;
        const { customWallets, featuredWalletIds } = OptionsController.state;
        const { connectors } = ConnectorController.state;
        const recent = StorageUtil.getRecentWallets();
        const injected = connectors.filter(c => c.type === 'INJECTED' || c.type === 'ANNOUNCED');
        const injectedWallets = injected.filter(i => i.name !== 'Browser Wallet');
        if (featuredWalletIds || customWallets || !recommended.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        const overrideLength = injectedWallets.length + recent.length;
        const maxRecommended = Math.max(0, 2 - overrideLength);
        const wallets = WalletUtil.filterOutDuplicateWallets(recommended).slice(0, maxRecommended);
        if (!wallets.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${wallets.map(wallet => html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
              name=${wallet?.name ?? 'Unknown'}
              @click=${() => this.onConnectWallet(wallet)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `;
    }
    onConnectWallet(wallet) {
        const connector = ConnectorController.getConnector(wallet.id, wallet.rdns);
        if (connector) {
            RouterController.push('ConnectingExternal', { connector });
        }
        else {
            RouterController.push('ConnectingWalletConnect', { wallet });
        }
    }
};
__decorate([
    state()
], W3mConnectRecommendedWidget.prototype, "connectors", void 0);
W3mConnectRecommendedWidget = __decorate([
    customElement('w3m-connect-recommended-widget')
], W3mConnectRecommendedWidget);
export { W3mConnectRecommendedWidget };
//# sourceMappingURL=index.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AssetUtil, ConnectorController, CoreHelperUtil, OptionsController, RouterController, StorageUtil } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
let W3mConnectCustomWidget = class W3mConnectCustomWidget extends LitElement {
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
        const { customWallets } = OptionsController.state;
        if (!customWallets?.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        const wallets = this.filterOutDuplicateWallets(customWallets);
        return html `<wui-flex flexDirection="column" gap="xs">
      ${wallets.map(wallet => html `
          <wui-list-wallet
            imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
            name=${wallet.name ?? 'Unknown'}
            @click=${() => this.onConnectWallet(wallet)}
            data-testid=${`wallet-selector-${wallet.id}`}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`;
    }
    filterOutDuplicateWallets(wallets) {
        const recent = StorageUtil.getRecentWallets();
        const connectorRDNSs = this.connectors
            .map(connector => connector.info?.rdns)
            .filter(Boolean);
        const recentRDNSs = recent.map(wallet => wallet.rdns).filter(Boolean);
        const allRDNSs = connectorRDNSs.concat(recentRDNSs);
        if (allRDNSs.includes('io.metamask.mobile') && CoreHelperUtil.isMobile()) {
            const index = allRDNSs.indexOf('io.metamask.mobile');
            allRDNSs[index] = 'io.metamask';
        }
        const filtered = wallets.filter(wallet => !allRDNSs.includes(String(wallet?.rdns)));
        return filtered;
    }
    onConnectWallet(wallet) {
        RouterController.push('ConnectingWalletConnect', { wallet });
    }
};
__decorate([
    state()
], W3mConnectCustomWidget.prototype, "connectors", void 0);
W3mConnectCustomWidget = __decorate([
    customElement('w3m-connect-custom-widget')
], W3mConnectCustomWidget);
export { W3mConnectCustomWidget };
//# sourceMappingURL=index.js.map
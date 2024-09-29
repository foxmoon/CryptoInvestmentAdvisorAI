var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApiController, AssetUtil, ConnectorController, RouterController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { WalletUtil } from '../../utils/WalletUtil.js';
let W3mConnectFeaturedWidget = class W3mConnectFeaturedWidget extends LitElement {
    constructor() {
        super(...arguments);
        this.unsubscribe = [];
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    render() {
        const { featured } = ApiController.state;
        if (!featured.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        const wallets = WalletUtil.filterOutDuplicateWallets(featured);
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${wallets.map(wallet => html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getWalletImage(wallet))}
              name=${wallet.name ?? 'Unknown'}
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
W3mConnectFeaturedWidget = __decorate([
    customElement('w3m-connect-featured-widget')
], W3mConnectFeaturedWidget);
export { W3mConnectFeaturedWidget };
//# sourceMappingURL=index.js.map
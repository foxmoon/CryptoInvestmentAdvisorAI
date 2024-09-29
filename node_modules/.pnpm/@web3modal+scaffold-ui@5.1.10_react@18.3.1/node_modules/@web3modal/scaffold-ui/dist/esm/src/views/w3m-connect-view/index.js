var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import styles from './styles.js';
import { ConnectorController, RouterController } from '@web3modal/core';
import { state } from 'lit/decorators/state.js';
let W3mConnectView = class W3mConnectView extends LitElement {
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
        return html `
      <wui-flex flexDirection="column" .padding=${['3xs', 's', 's', 's']}>
        <w3m-email-login-widget></w3m-email-login-widget>
        <w3m-social-login-widget></w3m-social-login-widget>
        ${this.walletListTemplate()}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `;
    }
    walletListTemplate() {
        const authConnector = this.connectors.find(c => c.type === 'AUTH');
        if (authConnector?.socials) {
            if (authConnector?.showWallets) {
                return html `
          <wui-flex flexDirection="column" gap="xs" .margin=${['xs', '0', '0', '0']}>
            <w3m-connector-list></w3m-connector-list>
            <wui-flex class="all-wallets">
              <w3m-all-wallets-widget></w3m-all-wallets-widget>
            </wui-flex>
          </wui-flex>
        `;
            }
            return html `<wui-list-button
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`;
        }
        return html `<w3m-wallet-login-list></w3m-wallet-login-list>`;
    }
    onContinueWalletClick() {
        RouterController.push('ConnectWallets');
    }
};
W3mConnectView.styles = styles;
__decorate([
    state()
], W3mConnectView.prototype, "connectors", void 0);
W3mConnectView = __decorate([
    customElement('w3m-connect-view')
], W3mConnectView);
export { W3mConnectView };
//# sourceMappingURL=index.js.map
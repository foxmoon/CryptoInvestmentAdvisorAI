var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApiController, AssetUtil, ConnectorController, CoreHelperUtil, RouterController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
let W3mConnectAnnouncedWidget = class W3mConnectAnnouncedWidget extends LitElement {
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
        const announcedConnectors = this.connectors.filter(connector => connector.type === 'ANNOUNCED');
        if (!announcedConnectors?.length) {
            this.style.cssText = `display: none`;
            return null;
        }
        return html `
      <wui-flex flexDirection="column" gap="xs">
        ${announcedConnectors.map(connector => {
            if (connector.info?.rdns && ApiController.state.excludedRDNS) {
                if (ApiController.state.excludedRDNS.includes(connector?.info?.rdns)) {
                    return null;
                }
            }
            return html `
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
              name=${connector.name ?? 'Unknown'}
              @click=${() => this.onConnector(connector)}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${connector.id}`}
              .installed=${true}
            >
            </wui-list-wallet>
          `;
        })}
      </wui-flex>
    `;
    }
    onConnector(connector) {
        if (connector.type === 'WALLET_CONNECT') {
            if (CoreHelperUtil.isMobile()) {
                RouterController.push('AllWallets');
            }
            else {
                RouterController.push('ConnectingWalletConnect');
            }
        }
        else {
            RouterController.push('ConnectingExternal', { connector });
        }
    }
};
__decorate([
    state()
], W3mConnectAnnouncedWidget.prototype, "connectors", void 0);
W3mConnectAnnouncedWidget = __decorate([
    customElement('w3m-connect-announced-widget')
], W3mConnectAnnouncedWidget);
export { W3mConnectAnnouncedWidget };
//# sourceMappingURL=index.js.map
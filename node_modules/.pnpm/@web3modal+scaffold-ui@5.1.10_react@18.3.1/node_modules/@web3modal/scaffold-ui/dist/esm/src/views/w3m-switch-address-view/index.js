var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AccountController, BlockchainApiController, ChainController, ModalController, NetworkController, OptionsController, StorageUtil } from '@web3modal/core';
import { UiHelperUtil, customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import styles from './styles.js';
import { ifDefined } from 'lit/directives/if-defined.js';
let W3mSwitchAddressView = class W3mSwitchAddressView extends LitElement {
    constructor() {
        super();
        this.metadata = OptionsController.state.metadata;
        this.allAccounts = AccountController.state.allAccounts || [];
        this.balances = {};
        this.labels = AccountController.state.addressLabels;
        this.currentAddress = AccountController.state.address || '';
        this.connectedConnector = StorageUtil.getConnectedConnector();
        this.shouldShowIcon = this.connectedConnector === 'AUTH';
        this.caipNetwork = NetworkController.state.caipNetwork;
        AccountController.subscribeKey('allAccounts', allAccounts => {
            this.allAccounts = allAccounts;
        });
    }
    connectedCallback() {
        super.connectedCallback();
        this.allAccounts.forEach(account => {
            BlockchainApiController.getBalance(account.address, this.caipNetwork?.id).then(response => {
                let total = this.balances[account.address] || 0;
                if (response.balances.length > 0) {
                    total = response.balances.reduce((acc, balance) => acc + (balance?.value || 0), 0);
                }
                this.balances[account.address] = total;
                this.requestUpdate();
            });
        });
    }
    getAddressIcon(type) {
        if (type === 'smartAccount') {
            return 'lightbulb';
        }
        return 'mail';
    }
    render() {
        return html `
      <wui-flex justifyContent="center" .padding=${['xl', '0', 'xl', '0']}>
        <wui-banner-img
          imageSrc=${ifDefined(this.metadata?.icons[0])}
          text=${ifDefined(this.metadata?.url)}
          size="sm"
        ></wui-banner-img>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxl" .padding=${['l', 'xl', 'xl', 'xl']}>
        ${this.allAccounts.map((account, index) => this.getAddressTemplate(account, index))}
      </wui-flex>
    `;
    }
    getAddressTemplate(account, index) {
        const label = this.labels?.get(account.address);
        return html `
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        data-testid="switch-address-item"
      >
        <wui-flex alignItems="center">
          <wui-avatar address=${account.address}></wui-avatar>
          ${this.shouldShowIcon
            ? html `<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="glass-002"
                background="gray"
                icon="${this.getAddressIcon(account.type)}"
                ?border=${true}
              ></wui-icon-box>`
            : html `<wui-flex .padding="${['0', '0', '0', 's']}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${label
            ? label
            : UiHelperUtil.getTruncateString({
                string: account.address,
                charsStart: 4,
                charsEnd: 6,
                truncate: 'middle'
            })}</wui-text
            >
            <wui-text class="address-description" variant="small-400">
              ${typeof this.balances[account.address] === 'number'
            ? `$${this.balances[account.address]?.toFixed(2)}`
            : html `<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          ${account.address?.toLowerCase() === this.currentAddress?.toLowerCase()
            ? ''
            : html `
                <wui-button
                  data-testid=${`w3m-switch-address-button-${index}`}
                  textVariant="small-600"
                  size="md"
                  variant="accent"
                  @click=${() => this.onSwitchAddress(account.address)}
                  >Switch to</wui-button
                >
              `}
        </wui-flex>
      </wui-flex>
    `;
    }
    onSwitchAddress(address) {
        AccountController.setShouldUpdateToAddress(address, ChainController.state.activeChain);
        ModalController.close();
    }
};
W3mSwitchAddressView.styles = styles;
__decorate([
    state()
], W3mSwitchAddressView.prototype, "allAccounts", void 0);
__decorate([
    state()
], W3mSwitchAddressView.prototype, "balances", void 0);
W3mSwitchAddressView = __decorate([
    customElement('w3m-switch-address-view')
], W3mSwitchAddressView);
export { W3mSwitchAddressView };
//# sourceMappingURL=index.js.map
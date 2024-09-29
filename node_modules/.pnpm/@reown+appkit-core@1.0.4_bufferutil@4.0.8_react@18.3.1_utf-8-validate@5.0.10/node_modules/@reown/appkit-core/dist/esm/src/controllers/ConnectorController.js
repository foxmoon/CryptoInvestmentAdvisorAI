import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { proxy, snapshot } from 'valtio/vanilla';
import { getW3mThemeVariables } from '@reown/appkit-common';
import { OptionsController } from './OptionsController.js';
import { ThemeController } from './ThemeController.js';
import { ChainController } from './ChainController.js';
// -- State --------------------------------------------- //
const state = proxy({
    allConnectors: [],
    connectors: []
});
// -- Controller ---------------------------------------- //
export const ConnectorController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    setConnectors(connectors) {
        const newConnectors = connectors.filter(newConnector => !state.allConnectors.some(existingConnector => existingConnector.id === newConnector.id &&
            this.getConnectorName(existingConnector.name) ===
                this.getConnectorName(newConnector.name) &&
            existingConnector.chain === newConnector.chain));
        state.allConnectors = [...state.connectors, ...newConnectors];
        state.connectors = this.mergeMultiChainConnectors(state.allConnectors);
    },
    mergeMultiChainConnectors(connectors) {
        const connectorsByNameMap = this.generateConnectorMapByName(connectors);
        const mergedConnectors = [];
        connectorsByNameMap.forEach(keyConnectors => {
            const firstItem = keyConnectors[0];
            const isAuthConnector = firstItem?.id === 'w3mAuth';
            if (keyConnectors.length > 1) {
                mergedConnectors.push({
                    name: firstItem?.name,
                    imageUrl: firstItem?.imageUrl,
                    imageId: firstItem?.imageId,
                    connectors: [...keyConnectors],
                    type: isAuthConnector ? 'AUTH' : 'MULTI_CHAIN',
                    // These values are just placeholders, we don't use them in multi-chain connector select screen
                    chain: 'eip155',
                    id: firstItem?.id || ''
                });
            }
            else if (firstItem) {
                mergedConnectors.push(firstItem);
            }
        });
        return mergedConnectors;
    },
    generateConnectorMapByName(connectors) {
        const connectorsByNameMap = new Map();
        connectors.forEach(connector => {
            const { name } = connector;
            const connectorName = this.getConnectorName(name);
            if (!connectorName) {
                return;
            }
            const connectorsByName = connectorsByNameMap.get(connectorName) || [];
            const haveSameConnector = connectorsByName.find(c => c.chain === connector.chain);
            if (!haveSameConnector) {
                connectorsByName.push(connector);
            }
            connectorsByNameMap.set(connectorName, connectorsByName);
        });
        return connectorsByNameMap;
    },
    getConnectorName(name) {
        if (!name) {
            return name;
        }
        const nameOverrideMap = {
            'Trust Wallet': 'Trust'
        };
        return nameOverrideMap[name] || name;
    },
    getUniqueConnectorsByName(connectors) {
        const uniqueConnectors = [];
        connectors.forEach(c => {
            if (!uniqueConnectors.find(uc => uc.chain === c.chain)) {
                uniqueConnectors.push(c);
            }
        });
        return uniqueConnectors;
    },
    addConnector(connector) {
        if (connector.id === 'w3mAuth') {
            const authConnector = connector;
            const optionsState = snapshot(OptionsController.state);
            const themeMode = ThemeController.getSnapshot().themeMode;
            const themeVariables = ThemeController.getSnapshot().themeVariables;
            authConnector?.provider?.syncDappData?.({
                metadata: optionsState.metadata,
                sdkVersion: optionsState.sdkVersion,
                projectId: optionsState.projectId,
                sdkType: optionsState.sdkType
            });
            authConnector.provider.syncTheme({
                themeMode,
                themeVariables,
                w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
            });
            this.setConnectors([connector]);
        }
        else {
            this.setConnectors([connector]);
        }
    },
    getAuthConnector() {
        const activeNamespace = ChainController.state.activeChain;
        const authConnector = state.connectors.find(c => c.id === 'w3mAuth');
        if (!authConnector) {
            return undefined;
        }
        if (authConnector?.connectors?.length) {
            const connector = authConnector.connectors.find(c => c.chain === activeNamespace);
            return connector;
        }
        return authConnector;
    },
    getAnnouncedConnectorRdns() {
        return state.connectors.filter(c => c.type === 'ANNOUNCED').map(c => c.info?.rdns);
    },
    getConnectors() {
        return state.connectors;
    },
    getConnector(id, rdns) {
        return state.connectors.find(c => c.explorerId === id || c.info?.rdns === rdns);
    },
    syncIfAuthConnector(connector) {
        if (connector.id !== 'w3mAuth') {
            return;
        }
        const authConnector = connector;
        const optionsState = snapshot(OptionsController.state);
        const themeMode = ThemeController.getSnapshot().themeMode;
        const themeVariables = ThemeController.getSnapshot().themeVariables;
        authConnector?.provider?.syncDappData?.({
            metadata: optionsState.metadata,
            sdkVersion: optionsState.sdkVersion,
            sdkType: optionsState.sdkType,
            projectId: optionsState.projectId
        });
        authConnector.provider.syncTheme({
            themeMode,
            themeVariables,
            w3mThemeVariables: getW3mThemeVariables(themeVariables, themeMode)
        });
    }
};
//# sourceMappingURL=ConnectorController.js.map
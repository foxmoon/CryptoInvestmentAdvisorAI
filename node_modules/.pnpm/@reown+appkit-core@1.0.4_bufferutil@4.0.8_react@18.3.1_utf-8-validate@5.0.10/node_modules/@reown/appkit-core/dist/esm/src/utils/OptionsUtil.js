import { ConstantsUtil } from './ConstantsUtil.js';
export const OptionsUtil = {
    getFeatureValue(key, features) {
        const optionValue = features?.[key];
        if (optionValue === undefined) {
            return ConstantsUtil.DEFAULT_FEATURES[key];
        }
        return optionValue;
    }
};
//# sourceMappingURL=OptionsUtil.js.map
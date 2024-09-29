import { describe, it, expect } from 'vitest';
import { OptionsUtil } from '../../src/utils/OptionsUtil';
import { ConstantsUtil } from '../../src/utils/ConstantsUtil';
describe('OptionsUtil', () => {
    describe('getFeatureValue', () => {
        it('should return the default value when feature is not provided', () => {
            const defaultValue = ConstantsUtil.DEFAULT_FEATURES.swaps;
            const result = OptionsUtil.getFeatureValue('swaps');
            expect(result).toBe(defaultValue);
        });
        it('should handle disabling feature values', () => {
            const features = {
                swaps: false
            };
            const result = OptionsUtil.getFeatureValue('swaps', features);
            expect(result).toBe(false);
        });
    });
});
//# sourceMappingURL=OptionsUtil.test.js.map
import { erc20ABI } from '../contracts/erc20.js';
import { usdtABI } from '../contracts/usdt.js';
import { ConstantsUtil } from './ConstantsUtil.js';
export const ContractUtil = {
    getERC20Abi: (tokenAddress) => {
        if (ConstantsUtil.USDT_CONTRACT_ADDRESSES.includes(tokenAddress)) {
            return usdtABI;
        }
        return erc20ABI;
    }
};
//# sourceMappingURL=ContractUtil.js.map
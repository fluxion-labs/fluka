import { Address } from 'viem';

import { EVMABIMethod, EVMContract } from '@/store/collections';

export function parseSc(sc: EVMContract): [Address, EVMABIMethod[]] {
  const address = sc.contract?.address as Address;
  try {
    const parsedAbi = sc.contract?.abi && JSON.parse(sc.contract.abi);
    if (Array.isArray(parsedAbi) && parsedAbi.length > 0) {
      return [address, parsedAbi];
    }
    return [address, []];
  } catch {
    return [address, []];
  }
}

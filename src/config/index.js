import {RPCS, ChainIds, contracts, WSRPCS} from '../consts';

const isTestNet = true;
const chainId = isTestNet ? ChainIds.rinkeby : ChainIds.homestead;
const contractsAddresses = contracts[chainId];
const rpc = RPCS[chainId];
const wsrpc = WSRPCS[chainId];
const maxMint = 5;

const Config = {
    chainId,
    contracts: contractsAddresses,
    rpc,
    wsrpc,
    maxMint
};

export default Config;



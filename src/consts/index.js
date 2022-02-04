
const ChainIds = {
    homestead: 1,
    rinkeby: 4,
}

const RPCS = {
    [ChainIds.homestead]: 'https://mainnet.infura.io/v3/859f217886ed4c58aada5e127e2ebe7b',
    [ChainIds.rinkeby]: 'https://rinkeby.infura.io/v3/859f217886ed4c58aada5e127e2ebe7b',
}

const WSRPCS = {
    [ChainIds.homestead]: 'wss://mainnet.infura.io/ws/v3/859f217886ed4c58aada5e127e2ebe7b',
    [ChainIds.rinkeby]: 'wss://rinkeby.infura.io/ws/v3/859f217886ed4c58aada5e127e2ebe7b',
}

const contracts = {
    [ChainIds.homestead]: {
        nft: '0x952309485dc3981855fbF92B17ED08E2fb7dbb05',
        sale: '0x58e6aCCfDf934EEb5C8910421Cfc8FF95D1F5968',
    },
    [ChainIds.rinkeby]: {
        nft: '0x952309485dc3981855fbF92B17ED08E2fb7dbb05',
        sale: '0x58e6aCCfDf934EEb5C8910421Cfc8FF95D1F5968',
    }
};

export {RPCS, ChainIds, contracts, WSRPCS};

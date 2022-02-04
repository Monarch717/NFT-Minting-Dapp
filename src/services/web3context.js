import React, {useContext} from 'react';
import Web3 from 'web3';
import Config from "../config";
import ABIS from "../consts/abis";
import {useWallet} from "use-wallet";


const web3 = new Web3(Config.rpc);
const wsWeb3 = new Web3(Config.wsrpc);
const readContractNFT = new web3.eth.Contract(ABIS.NFTAbi, Config.contracts.nft);
const readContractSale = new web3.eth.Contract(ABIS.SaleAbi, Config.contracts.sale);
const defaultValue = {web3, wsWeb3, readContractNFT, readContractSale, chainId: Config.chainId};
const MyContext = React.createContext(defaultValue);

const WebContextProvider = ({children}) => {
  const wallet = useWallet();

  const value = React.useMemo(() => {
    const connectedWeb3 = wallet.isConnected() ? new Web3(wallet.ethereum) : undefined;
    return {...defaultValue, connectedWeb3};
  }, [wallet]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const useWeb3Context = () => useContext(MyContext);

export {useWeb3Context};
export default WebContextProvider;

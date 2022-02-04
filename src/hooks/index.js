import React from 'react';
import Config from "../config";
import ABIS from "../consts/abis";
import {useWeb3Context} from "../services/web3context";
import {subscribeEvent} from "../services/web3";

const useCurrentSales = () => {
  const {wsWeb3, readContractNFT, readContractSale} = useWeb3Context();
  const [totalSales, setTotalSales] = React.useState(0);
  const [totalMinted, setTotalMinted] = React.useState(0);
  // const [maxPerWallet, setMaxPerWallet] = React.useState(Config.maxMint);

  React.useEffect(() => {
    const contract = new wsWeb3.eth.Contract(ABIS.NFTAbi, Config.contracts.nft);
    const subscription = subscribeEvent(wsWeb3, contract, 'Transfer', (err, result) => {
      // Check if mint event
      if (wsWeb3.utils.toBN(result.from).isZero()) {
        // Fetch again
        readContractNFT.methods.totalSupply().call().then(n => {
          setTotalMinted(n);
        });
      }
    });
    return  () => {
      subscription.unsubscribe();
    }
  }, [wsWeb3]);

  // On load, read total sales
  React.useEffect( () => {
    readContractNFT.methods.totalSupply().call().then(value => {
      console.log('totalSupply - ', value);
      setTotalMinted(parseInt(value));
    }).catch(error => {
      console.log('totalSupply - ', error);
    });
    readContractSale.methods.totalSales().call().then(value => {
      console.log('totalSales - ', value);
      setTotalSales(parseInt(value));
    }).catch(error => {
      console.log('totalSales - ',error);
    });
    // readContractSale.methods.maxPerWallet().call().then(value => {
    //   console.log('Max Per Walelt - ', value);
    //   setMaxPerWallet(parseInt(value));
    // });
  }, [readContractNFT]);

  return {totalMinted, totalSales, /*maxPerWallet*/};
};

export {useCurrentSales};

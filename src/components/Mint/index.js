import React from 'react';
import {useWallet} from "use-wallet";
import Web3 from "web3";
import MintWidget from "./MintWidget";
import Config from "../../config";
import {useWeb3Context} from "../../services/web3context";

const Mint = () => {
  const [mintPrice, setMintPrice] = React.useState('0');
  const [maxMint, setMaxMint] = React.useState(Config.maxMint);
  const wallet = useWallet();
  const {readContractSale} = useWeb3Context();

  // Update Mint Price
  React.useEffect(() => {
    readContractSale.methods.mintFee().call().then(fee => {
      const ethers = Web3.utils.fromWei(fee);
      setMintPrice(ethers);
    }).catch(error => {
      console.log(error);
    });
    readContractSale.methods.maxPerWallet().call().then(value => {
      setMaxMint(parseInt(value));
    });
  }, [readContractSale]);

  return (
    <div className={'flex flex-col items-center'}>
      <div className={'text-xl md:text-3xl'}>{`Mint price (${mintPrice} Eth + Gas)`}</div>
      <div className={'text-xl md:text-3xl mb-5 text-center'}>Maximum of {maxMint} Mouth Breathers per wallet</div>
      {
        wallet.isConnected() ?
          (
            <MintWidget maxMint={maxMint}/>
          ) :
          (
            <>
              <button className={'text-xl md:text-3xl px-10 bg-primary py-4 rounded-full'} onClick={() => wallet.connect()}>Connect wallet</button>
            </>
          )
      }
    </div>
  );
};

export default Mint;

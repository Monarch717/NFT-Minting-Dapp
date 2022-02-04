import React from 'react';
import {useCurrentSales} from "../../../hooks";
import {useWeb3Context} from "../../../services/web3context";
import {useWallet} from "use-wallet";
import {contractCall} from "../../../services/web3";
import {ClipLoader} from "react-spinners";

const MintWidget = ({maxMint}) => {
  const [mint, setMint] = React.useState(1);
  const {totalMinted, totalSales, max } = useCurrentSales();
  const {readContractNFT, readContractSale, web3, connectedWeb3, chainId} = useWeb3Context();
  const [minting, setMinting] = React.useState(false);

  const wallet = useWallet();

  const onUpdateMint = (v) => {
    const newMint = mint + v;
    if (newMint <= 0) {
      setMint(1);
      return;
    }
    if (newMint > maxMint) {
      setMint(maxMint);
      return;
    }
    setMint(newMint);
  };

  const onMintPressed = async () => {
    if (minting) {
      return;
    }

    setMinting(true);
    try {
      // Check everything.
      const account = wallet.account;
      const balance = parseInt(await readContractNFT.methods.balanceOf(account).call());

      const connectedChainId = await connectedWeb3.eth.getChainId();
      console.log('Chain Ids == ', connectedChainId, chainId);
      if (connectedChainId !== chainId) {
        throw new Error('Please select correct network in your wallet');
      }
      if (mint > maxMint) {
        throw new Error('Maximum mint count exceeded');
      }

      const totalSupply = parseInt(await readContractNFT.methods.totalSupply().call());

      if (totalSupply >= totalSales) {
        throw new Error('Sale end');
      }

      if (totalSupply + mint > totalSales) {
        throw new Error(`Minted token + Mint exceeds maximum available tokens :${totalSales}. Try decrease mint count`);
      }

      console.log(balance, mint, balance + mint, maxMint);
      if (balance + mint > maxMint) {
        throw new Error(`You already have ${balance} tokens, and can't mint ${mint} token(s). Max mint is ${maxMint}`);
      }
      const canMint = await readContractSale.methods.canMint(account, mint).call();
      if (!canMint) {
        throw new Error(`You are not able to mint, may be max mint reached`);
      }

      const mintPrice = await readContractSale.methods.mintFee().call();
      const mintPriceBN = web3.utils.toBN(mintPrice);
      // check balance
      const ethBalance = await web3.eth.getBalance(account);
      const ethBalanceBN = web3.utils.toBN(ethBalance);

      const value = mintPriceBN.mul(web3.utils.toBN(mint));

      console.log('Required Value : ', value.toString(10));
      console.log('Current Account Balance : ', ethBalanceBN.toString(10));

      if (value.gte(ethBalanceBN)){
        throw new Error(`Not enough balance to mint ${mint} tokens. Require ${web3.utils.fromWei(mintPrice)} ETH + GAS`);
      }

      const method = readContractSale.methods.mint(account, mint);

      await contractCall(connectedWeb3, method, {
        from: account, to: readContractSale.options.address,
        maxGas: 1000000,
        value,
        txHash: (hash) => {
          alert(`Mint transaction hash: ${hash}`)
        },
        receipt: (receipt) => {
          if (receipt.status) {
            alert('Transaction succeed');
          } else {
            alert('Transaction Failed');
          }
          setMinting(false);
        },
        error: (err) => {
          alert(`Error : ${err.message}`);
          setMinting(false);
        }
      })
    }catch(err) {
      alert(`Error : ${err.message}`);
      console.log(err);
      setMinting(false);
    }finally {
    }
  }

  return (
    <div className={'flex flex-col'}>
      <div className={'flex flex-row justify-center'}>
        <button className={'text-xl md:text-3xl bg-primary rounded-full font-bold w-16 md:w-20 h-16 md:h-20'} onClick={() => onUpdateMint(-1)}>-</button>
        <button className={'text-xl md:text-3xl bg-primary rounded-full px-10 mx-3'} onClick={onMintPressed}>{minting ? <ClipLoader /> : `Mint ${mint}`}</button>
        <button className={'text-xl md:text-3xl bg-primary rounded-full font-bold w-16 md:w-20 h-16 md:h-20'} onClick={() => onUpdateMint(1)}>+</button>
      </div>
      <div className={'text-xl md:text-3xl mt-10 text-center'}>{totalMinted}/{totalSales} Minted</div>
    </div>
  );
};

export default MintWidget;

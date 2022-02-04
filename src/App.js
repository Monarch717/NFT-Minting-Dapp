import React from "react";
import Main from './pages/Main';
import {UseWalletProvider} from "use-wallet";
import Config from './config';
import WebContextProvider from "./services/web3context";

const App = () => {
    return (
      <UseWalletProvider chainId={Config.chainId}>
        <WebContextProvider>
          <Main/>
        </WebContextProvider>
      </UseWalletProvider>
    )
}

export default App

"use client";
import { ChainId, ThirdwebProvider, } from "@thirdweb-dev/react";
import { MetaMaskProvider } from "metamask-react";

import App from "./Pages/App";


export default function Home() {

  


  return (
  <ThirdwebProvider desiredChainId={11155111}>
  <MetaMaskProvider>

  <App/>

  </MetaMaskProvider>
  </ThirdwebProvider>

  );
}

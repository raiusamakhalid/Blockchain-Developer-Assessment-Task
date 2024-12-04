"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import contractABI from "../Contract/contractABI.json";
import Button from "../Compnents/Button";
import InputBox from "../Compnents/InputBox";
const { ethers } = require("ethers");

const contractAddress = "0x57EC43187B9e6e241E29636C98694A05c6bB522C"; // Replace with your deployed contract address

export default function App() {
  const [mintAmount, setMintAmount] = useState("");
  const [mintRecipient, setMintRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState();
  const [chainId, setChainId] = useState("");

  useEffect(() => {
    const loadContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      const { chainId } = await provider.getNetwork();

      setChainId(chainId);
      setContract(contractInstance);
    };
    loadContract();
  }, []);

  useEffect(() => {
    const handleChainChange = () => {
      window.location.reload();
    };

    window.ethereum?.on("chainChanged", handleChainChange);

    return () => window.ethereum?.removeListener("chainChanged", handleChainChange);
  }, []);

  const mintTokens = async () => {
    if (!contract || !mintAmount || !mintRecipient) {
      alert("Please connect wallet, enter amount, and recipient address.");
      return;
    }
    try {
      const tx = await contract.mint(mintRecipient, ethers.utils.parseEther(mintAmount));
      await tx.wait();
      alert("Tokens minted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error minting tokens.");
    }
  };

  const transferTokens = async () => {
    if (!contract || !transferAmount || !transferRecipient) {
      alert("Please connect wallet, enter amount, and recipient address.");
      return;
    }
    try {
      const tx = await contract.transfer(transferRecipient, ethers.utils.parseEther(transferAmount));
      await tx.wait();
      alert("Tokens transferred successfully!");
    } catch (error) {
      console.error(error);
      alert("Error transferring tokens.");
    }
  };

  const queryBalance = async () => {
    if (!contract || !address) {
      alert("Please connect wallet and enter an address.");
      return;
    }
    try {
      const balance = await contract.balanceOf(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
      alert("Error fetching balance.");
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center h-20 bg-blue-500">
        <div className="flex items-center ml-96">
          <h1 className="text-3xl font-bold text-white ml-96">Basic Token App</h1>
        </div>
        <div className="mr-4">
          <ConnectWallet />
        </div>
      </div>
      {chainId !== 11155111 ? ( // Replace with the required network chain ID
        <div className="flex justify-center mt-8">
          <div className="bg-red-200 p-4 rounded-md shadow-md">
            <p className="text-red-700">
              You're on the wrong network. Please switch to the correct network to use this application.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-56">
          <div className="p-8 bg-gray-100 rounded-md shadow-md">
            <div className="flex justify-center mt-1">
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h1 className="text-center text-lg font-bold text-blue-500">
                  Balance: {balance ? balance + " BTK" : "0 BTK"}
                </h1>
              </div>
            </div>

            {/* Query Balance Section */}
            <div className="flex items-center mb-4 mt-5">
              <InputBox onChange={(e) => setAddress(e.target.value)} value={address} placeholder={"Enter address..."} />
              <Button btntext="Query Balance" onClick={queryBalance} />
            </div>

            {/* Mint Tokens Section */}
            <div className="flex items-center mb-4">
              <InputBox
                onChange={(e) => setMintRecipient(e.target.value)}
                value={mintRecipient}
                placeholder={"Recipient address..."}
              />
              <InputBox
                onChange={(e) => setMintAmount(e.target.value)}
                value={mintAmount}
                placeholder={"Amount..."}
              />
              <Button btntext="Mint Tokens" onClick={mintTokens} />
            </div>

            {/* Transfer Tokens Section */}
            <div className="flex items-center mb-4">
              <InputBox
                onChange={(e) => setTransferRecipient(e.target.value)}
                value={transferRecipient}
                placeholder={"Recipient address..."}
              />
              <InputBox
                onChange={(e) => setTransferAmount(e.target.value)}
                value={transferAmount}
                placeholder={"Amount..."}
              />
              <Button btntext="Transfer Tokens" onClick={transferTokens} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

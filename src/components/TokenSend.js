import { useState} from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Message from './Message'

const tokenAddress = "0xC310E335d83CaF670847F148FA25aEe381f6d613"

const TokenSend = (props) => {

  const [userAccount, setUserAccount] = useState(null)
  const [amount, setAmount] = useState()

  const [balance, setBalance] = useState()
  const [showBalance, setShowBalance] = useState(false);

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  
  // async function connectWallet(){

  // }
  

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, provider)
      const balance = await contract.daiBalance(account);
      console.log("Balance: ", balance.toString());
      setBalance(balance.toString());
      setShowBalance(true);
    }
  }
  async function sendCoins() {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, signer);
    const transation = await contract.send(userAccount,amount);
    
    await transation.wait();
    console.log(`${amount} Coins successfully sent to ${userAccount}`);
  }
}

const tokenAddress = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa';
const tokenSymbol = 'DAI';
const tokenDecimals = 18;
const tokenImage = 'http://placekitten.com/200/300';

async function AddTokenToMetamask(){
try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}
}


    return (
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <Card.Body>
        
        <button onClick={getBalance} >Connect</button>

        <Card.Subtitle> { showBalance ? <Message balance={balance}/> : null }
        </Card.Subtitle>
        <br></br>
        <div className="d-grid gap-2">
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Payee 0x address" />
        {console.log(userAccount)}
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <Button onClick={sendCoins} variant="success">send </Button>
        <button onClick={AddTokenToMetamask}>AddTokenToMetamask</button>
        </div>
        </Card.Body>
        
        </Card>
        
    )
}

export default TokenSend

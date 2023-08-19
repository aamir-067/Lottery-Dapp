import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { Web3 } from 'web3';
import './App.css';
import { getManager, getContractBalance, getLotteryPrice, participate, setTheWinner, getTotalCostumers } from './utils/ContractInteraction';
import { searchPerson } from './utils/ContractInteraction';

function App() {
  const [managerView, setManagerView] = useState(false);
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null });
  const [winner, setWinner] = useState('');
  const [manager, setManager] = useState('');
  const [accounts, setAccounts] = useState([])
  const [participant, setParticipants] = useState(0);
  const [accBalance, setAccountBalance] = useState(0);
  const [prize, setPrize] = useState(0);
  const [lotteryPrice, setLotteryPrice] = useState(0);
  const [uncheckedAddress, setUncheckedAddress] = useState('');

  const initializeWeb3 = async () => {
    try {
      const p = await detectEthereumProvider();
      if (p) {
        // await p.enable();
        let w = await new Web3(p)
        await setWeb3Api({ provider: p, web3: w });
        await web3Api.provider.enable();
      }
      else {
        console.error('metamask is not installed');
      }
    } catch (err) {
      console.error(err);
    }
    // await getAccountBalance()
  };

  async function getAllAccounts() {
    let accs = await web3Api.web3.eth.getAccounts();
    setAccounts(accs);
    accs[0] && getAccountBalance(accs[0]);
  }

  async function getAccountBalance(acc) {
    let bal = await web3Api.web3.eth.getBalance(acc);
    setAccountBalance(bal);
  }

  async function getLotteryManager() {
    let mana = await getManager(web3Api.web3, accounts[0]);
    setManager(mana)
  }

  async function getPrize() {
    let bal = await getContractBalance(web3Api.web3);
    setPrize(bal);
  }
  async function getlotteryValue() {
    let lotPrice = await getLotteryPrice(web3Api.web3, accounts[0]);
    setLotteryPrice(lotPrice);
  }

  async function getTheLottery() {
    await participate(web3Api.web3, accounts[0])
    await getPrize();
    await getAllParticipants();
    getAccountBalance(accounts[0])
  }

  async function declearWinner() {
    let win = await setTheWinner(web3Api.web3, accounts[0]);
    setWinner(win);
    await getAllParticipants();
    await getPrize();
  }

  async function getAllParticipants() {
    let cos = await getTotalCostumers(web3Api.web3, accounts[0]);
    setParticipants(cos);
    await getPrize();
  }

  //  manager section functions.
  const getInput = (e) => {
    setUncheckedAddress(e.target.value);
  }

  async function checkAddressDetails() {
    if (manager.length !== uncheckedAddress.length) {
      console.error('please enter a valid address');
      return;
    }
    if (manager === accounts[0]) {
      let res = await searchPerson(web3Api.web3, accounts[0], uncheckedAddress);
      if (res) {
        console.log('The address is participated in Lottery')
      } else {
        console.log('The address is not participate in Lottery');
      }
    } else {
      console.error('Only manager can check the participant details');
    }
  }


  async function initializeAll() {
    try {
      await initializeWeb3();
      await getAllAccounts();
      await getLotteryManager();
      await getPrize();
      await getlotteryValue();
      await getAllParticipants();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    initializeAll();
  }, [web3Api.provider]);

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Lottery Application</h1>
        </header>

        <section className="section">
          <h2>Participants' View</h2>
          <p className="paragraph">Lottery Manager : {manager ? manager : 'undefined'}</p>
          <p className="paragraph">Lottery Prize: {prize ? web3Api.web3.utils.fromWei(prize, 'gwei') : prize} Gwei</p>
          <p className="paragraph">Total Participants: {`${participant}`}</p>
          <p className="paragraph">Previous Lottery Winner : {winner ? winner : 'not declared yet'}</p>
          <button className="button" onClick={() => {
            setManagerView(!managerView)
          }} >
            Toggle Manager View
          </button>
        </section>

        {!managerView && (       // removed && !winner
          <section className="section">
            <div className="wallet">
              <h2>Join the Lottery</h2>
              {accounts.length ? '' : (<button className="button" onClick={initializeAll}>Connect wallet</button>)}
            </div>
            <p className="paragraph">Connected Wallet : {accounts ? accounts[0] : '0x000'}</p>
            <p className="paragraph">Lottery Price : {lotteryPrice ? web3Api.web3.utils.fromWei(Number(lotteryPrice), 'gwei') : 0} Gwei</p>
            <p className="paragraph">Wallet Balance : {accBalance ? web3Api.web3.utils.fromWei(Number(accBalance), 'ether') : 0} eth</p>
            <button className="button" onClick={getTheLottery}>
              Participate in Lottery
            </button>
          </section>
        )}

        {managerView && (
          <section className="section manager-view">
            <h2>Manager's View</h2>
            <p className='paragraph'>Participant Details</p>
            <input
              className="input"
              id='input'
              type="text"
              onChange={(e) => { getInput(e) }}
              placeholder="participant address"
            />
            <button className="button" onClick={checkAddressDetails} >
              Search
            </button>
            <div className='setWinnerDiv'><button className="button setWinner" onClick={declearWinner}>Declare Winner</button></div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;

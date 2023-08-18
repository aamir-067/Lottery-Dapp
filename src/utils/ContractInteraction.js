import { Web3 } from 'web3';
import Lottery from 'contracts/Lottery2.json';
const contractAddress = '0xB3b65AA5E19D1501f3e5eE52021b930B00D22BE1';
const ganacheContractAddress = '0xef396e0ca9cB014832aeD27DceB7dfa0c17825d5';
let web3, contract

async function createContract(provider) {
    web3 = provider
    contract = new web3.eth.Contract(Lottery.abi, ganacheContractAddress);
}

async function getContractBalance(provider) {
    if (!contract) {
        await createContract(provider);
    }
    let bal = await web3.eth.getBalance(ganacheContractAddress);
    return bal;
}

async function getManager(provider, caller) {
    if (!contract) {
        await createContract(provider);
    }
    let man = await contract.methods.manager().call({ from: caller });
    return man
}


async function getTotalCostumers(provider, caller) {
    if (!contract) {
        await createContract(provider);
    }
    let mans = await contract.methods.totalPersons().call({ from: caller });
    return mans;
}



async function getLotteryPrice(provider, caller) {
    if (!contract) {
        await createContract(provider);
    }
    let price = await contract.methods.lotteryPrice().call({ from: caller });
    console.log('lottery Price is : ', price);
    return price;
}



async function participate(provider, caller) {
    if (!contract) {
        await createContract(provider);
    }
    let lotteryPrice = await contract.methods.lotteryPrice().call({ from: caller });
    let bal = await web3.eth.getBalance(caller);
    try {
        if (Number(lotteryPrice) >= Number(bal)) {
            Error('Not enough money to participate in the lottery');
            return;
        }
        await contract.methods.takeLottery().send({ from: caller, value: web3.utils.toWei(Number(lotteryPrice), 'wei') });
    } catch (e) {
        alert('Error Occurred', e)
    }

}

async function setTheWinner(provider, caller) {
    if (!contract) {
        await createContract(provider);
    }
    let winner;
    try {
        let man = await getManager(provider, caller);
        if (caller != man) {
            return new Error('Sorry Only the managers are allowed to declare a winner');
        } else {
            winner = await contract.methods.declearWinner().send({ from: caller });
        }
        return winner;
    } catch (e) {
        Error(e);
    }
}


export { getManager, getContractBalance, getLotteryPrice, participate, setTheWinner, getTotalCostumers }
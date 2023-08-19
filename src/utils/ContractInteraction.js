import Lottery from 'contracts/Lottery2.json';
const contractAddress = '0x69cA62eD541F91D86b19e2af2C219F2F86428b66';
// const ganacheContractAddress = '0x05E2De803161978D8f05Ca5408F0e396bF3Ed19e';
let web3, contract

async function createContract(provider) {
    web3 = provider
    contract = new web3.eth.Contract(Lottery.abi, contractAddress);
}

async function getContractBalance(provider) {
    if (!contract) {
        await createContract(provider);
    }
    let bal = await web3.eth.getBalance(contractAddress);
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


async function searchPerson(provider, caller, ad) {
    if (!contract) {
        await createContract(provider);
    }
    try {
        let res = await contract.methods.isParticipated(ad).call({ from: caller });
        return res;

    } catch (e) {
        console.error(e);
    }
    return false;
}

async function setTheWinner(provider, caller) {
    if (!contract) {
        await createContract(provider);
    }
    let winner;
    try {
        let man = await getManager(provider, caller);
        if (caller !== man) {
            return new Error('Sorry Only the managers are allowed to declare a winner');
        } else {
            await contract.methods.declearWinner().send({ from: caller });
            winner = await contract.methods.winner().call({ from: caller });
        }
        console.log('winner is : ', winner);
        return winner;
    } catch (e) {
        Error(e);
    }
}


export { getManager, getContractBalance, getLotteryPrice, participate, setTheWinner, getTotalCostumers, searchPerson }
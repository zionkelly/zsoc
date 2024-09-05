import {ethers} from "ethers";

const redstoneRpcUrl = 'https://rpc.redstonechain.com';

// Create a provider to connect to the Redstone network
const provider = new ethers.providers.JsonRpcProvider(redstoneRpcUrl);

const contractAddress = '0xF75b1b7bDB6932e487c4aA8d210F4A682ABeAcf0';

// Function to get the transactions of the contract address
async function getContractTransactions(contractAddress) {
    // Get the latest block number
    //const latestBlock = await provider.getBlockNumber();
    const latestBlock = 5171445;
    const startBlock = latestBlock;
    console.log(`Latest block ${latestBlock}`);

    for (let i = startBlock; i <= latestBlock; i++) {
        try {
            const block = await provider.getBlockWithTransactions(i);
            //console.log(block)

            block.transactions.forEach(tx => {
                //if (tx.to && tx.to.toLowerCase() === contractAddress.toLowerCase()) 
                if (true) {
                    console.log(`Transaction found in block ${i}:`);
                    console.log(`Tx Hash: ${tx.hash}`);
                    console.log(`From: ${tx.from}`);
                    console.log(`To: ${tx.to}`);
                    console.log(`Value: ${ethers.utils.formatEther(tx.value.toString())} ETH`);
                    console.log(`Data: ${tx.data}`);
                    console.log('---');
                }
            });
        } catch (error) {
            console.error(`Error fetching block ${i}:`, error);
        }
    }
}

// Call the function
getContractTransactions(contractAddress).then(()=>console.log("okay"));
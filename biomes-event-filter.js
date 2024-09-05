import { ethers } from 'ethers';

// Setup provider (using a sample RPC provider)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.redstonechain.com');

// The contract address (replace with the specific contract address you're interested in)
const contractAddress = "0xF75b1b7bDB6932e487c4aA8d210F4A682ABeAcf0";

// The ABI with the HelloStore event
const abi = [
    "event HelloStore(bytes32 indexed storeVersion)"
];

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, provider);

// Set up the filter for the HelloStore event
const filter = contract.filters.HelloStore(); // No parameters needed, hence no arguments passed

// Listen for the HelloStore event
contract.on(filter, (storeVersion) => {
    console.log(`HelloStore event detected: StoreVersion: ${storeVersion}`);
});

// Optionally, you can also fetch past events
async function fetchPastEvents() {
    const events = await contract.queryFilter(filter);
    events.forEach(event => {
        console.log(`Past HelloStore event: StoreVersion: ${event.args.storeVersion}`);
    });
}

console.log("About to run query...");
// Fetch past events
fetchPastEvents().then(() => console.log("Done"));

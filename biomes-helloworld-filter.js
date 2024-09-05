import { ethers } from 'ethers';

// Setup provider (using a sample RPC provider)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.redstonechain.com');

// The contract address (replace with the specific contract address you're interested in)
const contractAddress = "0xF75b1b7bDB6932e487c4aA8d210F4A682ABeAcf0";

// The ABI with the HelloWorld event
const abi = [
    "event HelloWorld(bytes32 indexed worldVersion)"
];

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, provider);

// Set up the filter for the HelloWorld event
const filter = contract.filters.HelloWorld(); // No parameters needed, hence no arguments passed

// Listen for the HelloStore event
contract.on(filter, (worldVersion) => {
    console.log(`HelloStore event detected: WorldVersion: ${worldVersion}`);
});

// Optionally, you can also fetch past events
async function fetchPastEvents() {
    const events = await contract.queryFilter(filter);
    events.forEach(event => {
        console.log(`Past HelloWorld event: WorldVersion: ${event.args.worldVersion}`);
    });
}

console.log("About to run query...");
// Fetch past events
fetchPastEvents().then(() => console.log("Done"));
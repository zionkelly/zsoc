import { ethers } from 'ethers';

// Setup provider (using a sample RPC provider)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.redstonechain.com');

// The contract address (replace with the specific contract address you're interested in)
const contractAddress = "0xF75b1b7bDB6932e487c4aA8d210F4A682ABeAcf0";

// The ABI with the Upgraded event
const abi = [
    "event Upgraded(address indexed implementation)"
    ];

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, provider);

// Set up the filter for the Upgraded event
const filter = contract.filters.Upgraded(); // No parameters needed, hence no arguments passed

// Listen for the Upgraded event
contract.on(filter, (implementation) => {
    console.log(`Upgraded event detected: Implementation: ${implementation}`);
});

// Optionally, you can also fetch past events
async function fetchPastEvents() {
    const events = await contract.queryFilter(filter);
    events.forEach(event => {
        console.log(`Past Upgraded event: Implementation: ${event.args.implementation}`);
    });
}

console.log("About to run query...");
// Fetch past events
fetchPastEvents().then(() => console.log("Done"));
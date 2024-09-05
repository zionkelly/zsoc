import {ethers} from 'ethers';

// Setup provider (using a sample RPC provider)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.redstonechain.com');

// The ERC-721 contract address (replace with the specific contract address you're interested in)
const contractAddress = "0x503d84474458eb0a7a58c9112a0cAE7A403d52C3";

// The ERC-721 ABI with only the Transfer event
const abi = [
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, provider);

// Set up the filter for the Transfer event
const filter = contract.filters.Transfer(null, null, 1); // (from, to, tokenId) - null means any value

// Listen for the event
contract.on(filter, (from, to, tokenId) => {
    console.log(`Transfer event detected: ${from} -> ${to} (Token ID: ${tokenId.toString()})`);
});

// Optionally, you can also fetch past events
async function fetchPastEvents() {
    const events = await contract.queryFilter(filter); // last 10,000 blocks
    events.forEach(event => {
        console.log(`Past Transfer event: ${event.args.from} -> ${event.args.to} (Token ID: ${event.args.tokenId.toString()})`);
    });
}
console.log("about to run query")
// Fetch past events
fetchPastEvents().then((results)=>console.log("done"));

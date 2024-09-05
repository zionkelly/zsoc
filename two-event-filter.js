import { program, Option } from "commander";
import { ethers } from 'ethers';

program.enablePositionalOptions();

program
  .command("filter")
  .option("--name <name>", "name of the event")
  .option("--args <args>", "arguments to the event")
  .action((options) => filtercmd(program, options));

async function filtercmd(program, options) { 
  // Access the 'name' option
  const eventName = options.name;
  console.log(`Event name provided: ${eventName}`);

  // Parse the --args option (comma-separated values)
  const args = options.args ? options.args.split(',') : [];
  console.log(`Event arguments provided: ${args}`);

  // Connect to an Ethereum node
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.redstonechain.com");

  // The contract address (replace with the specific contract address you're interested in)
  const contractAddress = "0x503d84474458eb0a7a58c9112a0cAE7A403d52C3"; // biomes on redstone

  // ABI definition based on the event name provided
  const abi = [
      `event ${eventName}(address indexed from, address indexed to, uint256 indexed tokenId)`
  ];

  const eventId = ethers.utils.id(`${eventName}(address,address,uint256)`);
  console.log(`${eventName} event ID: ${eventId}`);

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Set up the filter for the event, passing in the arguments
  const filter = {
    address: contractAddress,
    topics: [
      eventId,            // The event ID (topic 0)
      args[0] || null,    // Argument 1 (e.g., 'from'), null means "any"
      args[1] || null,    // Argument 2 (e.g., 'to'), null means "any"
      args[2] || null     // Argument 3 (e.g., 'tokenId'), null means "any"
    ]
  };

  // Listen for the event
  contract.on(filter, (from, to, tokenId) => {
      console.log(`${eventName} event detected: ${from} -> ${to} (Token ID: ${tokenId.toString()})`);
  });

  console.log("about to run query");
  // Fetch past events
  fetchPastEvents(contract, filter).then((results) => console.log("done"));
}

// Optionally, you can also fetch past events
async function fetchPastEvents(contract, filter) {
    const events = await contract.queryFilter(filter);
    events.forEach(event => {
        console.log(JSON.stringify(event));
    });
}

try {
  program.parse();
} catch (err) {
  if (err.code === "commander.helpDisplayed") process.exit(1);
  console.log(err);
  process.exit(1);
}
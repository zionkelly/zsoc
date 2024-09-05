import {ethers} from "ethers";

// Setup provider (using a sample RPC provider)
const provider = new ethers.providers.JsonRpcProvider('https://rpc.redstonechain.com');

const contractAddress = '0xF75b1b7bDB6932e487c4aA8d210F4A682ABeAcf0';

// Simple Bloom Filter class for demonstration
class BloomFilter {
  constructor(size, hashCount) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = new Array(size).fill(false);
  }

  hash1(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * 31 + item.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  hash2(item) {
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      hash = (hash * 37 + item.charCodeAt(i)) % this.size;
    }
    return hash;
  }

  add(item) {
    this.bitArray[this.hash1(item)] = true;
    this.bitArray[this.hash2(item)] = true;
  }

  contains(item) {
    return this.bitArray[this.hash1(item)] && this.bitArray[this.hash2(item)];
  }
}

// Initialize Bloom filter
const filterSize = 100;
const numHashFunctions = 2;
const bloomFilter = new BloomFilter(filterSize, numHashFunctions);
bloomFilter.add(contractAddress.toLowerCase());

// Function to fetch and process transactions
async function getContractTransactions() {
  try {
    const latestBlockNumber = await provider.getBlockNumber();
    const startBlock = latestBlockNumber - 200;

    for (let i = startBlock; i <= latestBlockNumber; i++) {
      const block = await provider.getBlockWithTransactions(i);

      console.log(`Checking block ${i} with ${block.transactions.length} transactions`);

      block.transactions.forEach(tx => {
        if (tx.to && bloomFilter.contains(tx.to.toLowerCase())) {
          console.log(`Transaction found in block ${i}:`);
          console.log(`Tx Hash: ${tx.hash}`);
          console.log(`From: ${tx.from}`);
          console.log(`To: ${tx.to}`);
          console.log(`Value: ${ethers.utils.formatEther(tx.value.toString())} ETH`);
          console.log(`Data: ${tx.data}`);
          console.log('---');
        }
      });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

// Execute the function
getContractTransactions();

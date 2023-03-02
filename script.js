// -------importing sha256 from crypto module -------
const { createHash } = require("crypto");
const date = new Date();
// -------Creating genesis block ---------
const genesisBlock = {
  blockId: 1,
  timeStamp: `${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${date.getMilliseconds()}`,
  nonce: "",
  transactions: hash("shreyaa=>lakshmi=>42s"),
  previousBlockHash:
    "0000000000000000000000000000000000000000000000000000000000000000",
};
genesisBlock.currentBlockHash = `${genesisBlock.blockId}${genesisBlock.nonce}${genesisBlock.timeStamp}${genesisBlock.transactions}${genesisBlock.previousBlockHash}`;
// -------Creating Blockchain Array ---------
const blockChain = [genesisBlock];
// ----------- Merkle tree --------------------

function merkleTree(transactions) {
  let hashedTransactions = transactions.map((transaction) => hash(transaction));
  console.log(hashedTransactions);
  let noOfTransactions = hashedTransactions.length;
  if (noOfTransactions % 2 !== 0) {
    hashedTransactions[noOfTransactions] =
      hashedTransactions[noOfTransactions - 1];
  }
  console.log(hashedTransactions);
  let transactionTree = hashedTransactions;
  while (transactionTree.length > 1) {
    const combinedTransactions = [];
    for (let i = 0; i < transactionTree.length; i += 2) {
      let left = transactionTree[i];
      let right = transactionTree[i + 1];
      const twoTempTransactions = hash(left + right);
      combinedTransactions.push(twoTempTransactions);
    }
    transactionTree = combinedTransactions;
  }

  let root = transactionTree[0];
  console.log("ct", transactionTree[0]);
  return root;
}
// ------- Mining Block ---------
function mineBlock(block, difficulty) {
  while (
    block.currentBlockHash.substring(0, difficulty) !==
    Array(difficulty + 1).join("0")
  ) {
    block.nonce = ++block.nonce;
    block.currentBlockHash = hash(
      `${block.blockId}${block.nonce}${block.timeStamp}${block.transactions}${block.previousBlockHash}`
    );
  }
  console.log(
    "Mining Block: " + block.currentBlockHash + "nonce =" + block.nonce
  );
}
mineBlock(blockChain[0], 3);
let id = 1;
// ------- Generating Hash ----------
function hash(string) {
  return createHash("sha256").update(string).digest("hex");
}

// ------- Creating a Block ---------
function createBlock(transactions) {
  // -----------calculating merkle tree root value ----------
  let merkleTransaction = merkleTree(transactions);
  console.log("mmmmct", hash(merkleTransaction));
  const date = new Date();
  // -------- Adding Timestamp ---------
  const createdTimeOfBlock = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${date.getMilliseconds()}`;
  let lengthOfChain = blockChain.length;
  let block = {
    blockId: ++id,
    timeStamp: createdTimeOfBlock,
    nonce: 11,
    transactions: hash(merkleTransaction),
    previousBlockHash: blockChain[lengthOfChain - 1].currentBlockHash,
  };
  block.currentBlockHash = `${block.blockId}${block.nonce}${block.timeStamp}${block.transactions}${block.previousBlockHash}`;
  mineBlock(block, 3);
  blockChain.push(block);
}
createBlock(["geetaaa=>seeta=>50btc", "ram=>seeta=>50btc"]);
// createBlock("ram=>seeta=>50btc");
// createBlock("ram=>lakshman=>150btc");
createBlock([
  "geetaaa=>seeta=>50btc",
  "ram=>seeta=>50btc",
  "RamVishnu=>SeetaLakshmi=>42s",
]);
console.log(blockChain);
// Validation
function validationOfBlockchain() {
  blockChain[1].transactions = ["Changed the transactions"];
  if (blockChain[2].previousBlockHash !== blockChain[1].currentBlockHash) {
    console.log("Tampereddddddd");
  }
}
validationOfBlockchain();

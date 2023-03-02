// -------importing sha256 from crypto module -------
const { clear } = require("console");
const { createHash } = require("crypto");
// -------Creating genesis block ---------
const genesisBlock = {
  blockId: 1,
  timeStamp: new Date(),
  nonce: "",
  transaction: hash("shreyaa=>lakshmi=>42s"),
  previousBlockHash:
    "0000000000000000000000000000000000000000000000000000000000000000",
};
genesisBlock.currentBlockHash = `${genesisBlock.blockId}${genesisBlock.nonce}${genesisBlock.timeStamp}${genesisBlock.transaction}${genesisBlock.previousBlockHash}`;
// -------Creating Blockchain Array ---------
const blockChain = [genesisBlock];
// ------- Mining Block ---------
function mineBlock(block, difficulty) {
  while (
    block.currentBlockHash.substring(0, difficulty) !==
    Array(difficulty + 1).join("0")
  ) {
    block.nonce = ++block.nonce;
    block.currentBlockHash = hash(
      `${block.blockId}${block.nonce}${block.timeStamp}${block.transaction}${block.previousBlockHash}`
    );
  }
  console.log(
    "BLOCK MINED: " + block.currentBlockHash + "nonce =" + block.nonce
  );
}
mineBlock(blockChain[0], 3);
let id = 1;
// ------- Generating Hash ---------
function hash(string) {
  return createHash("sha256").update(string).digest("hex");
}
// ------- Creating a Block ---------
function createBlock(transaction) {
  const date = new Date();
  // -------- Adding Timestamp ---------
  const createdTimeOfBlock = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} ${date.getMilliseconds()}`;
  let lengthOfChain = blockChain.length;
  let block = {
    blockId: ++id,
    timeStamp: createdTimeOfBlock,
    nonce: 11,
    transaction: hash(transaction),
    previousBlockHash: blockChain[lengthOfChain - 1].currentBlockHash,
  };
  block.currentBlockHash = `${block.blockId}${block.nonce}${block.timeStamp}${block.transaction}${block.previousBlockHash}`;
  mineBlock(block, 3);
  blockChain.push(block);
}
createBlock("geetaaa=>seeta=>50btc");
createBlock("ram=>seeta=>50btc");
createBlock("ram=>lakshman=>150btc");
createBlock("RamVishnu=>SeetaLakshmi=>42s");
console.log(blockChain);

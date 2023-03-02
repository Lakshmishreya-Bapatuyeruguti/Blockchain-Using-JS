// -------importing sha256 from crypto module -------
const { createHash } = require("crypto");
// -------Creating genesis block ---------
const genesisBlock = {
  blockId: 1,
  timeStamp: "temp",
  nonce: "",
  transaction: "shreya=>lakshmi=>42s",
  previousBlockHash:
    "0000000000000000000000000000000000000000000000000000000000000000",
  currentBlockHash: hash(
    `${this.blockId}${this.nonce}${this.timeStamp}${this.transaction}${this.previousBlockHash}`
  ),
};
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
      `${block.blockId}${block.nonce}${this.timeStamp}${this.transaction}${block.previousBlockHash}`
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
function createBlock(timeStamp, transaction) {
  let lengthOfChain = blockChain.length;
  let block = {
    blockId: ++id,
    timeStamp,
    nonce: 11,
    transaction: hash(transaction),
    previousBlockHash: blockChain[lengthOfChain - 1].currentBlockHash,
    currentBlockHash: hash(
      `${this.blockId}${this.nonce}${this.timeStamp}${this.transaction}${this.previousBlockHash}`
    ),
  };

  mineBlock(block, 3);
  blockChain.push(block);
}
createBlock("23 - 3 - 2023", "geetaaa=>seeta=>50btc");
createBlock("23 - 3 - 2023", "ram=>seeta=>50btc");
createBlock("23 - 3 - 2023", "ram=>lakshman=>150btc");
createBlock("23 - 3 - 2023", "shreya=>lakshmi=>42s");
console.log(blockChain);

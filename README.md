# Blockchain-Using-JS

let transactionsTree = [];
let hashedTransactions = transactions.map((transaction) => {
return hash(transaction);
});
console.log(hashedTransactions);
let noOfTransactions = hashedTransactions.length;
if (noOfTransactions % 2 !== 0) {
hashedTransactions[noOfTransactions] =
hashedTransactions[noOfTransactions - 1];
}
let level = hashedTransactions;
while (level.length > 1) {
const combinedTransactions = [];
for (let i = 0; i < noOfTransactions; i += 2) {
let left = level[i];
let right = level[i + 1];
let twoTempTransactions = hash(left + right);
combinedTransactions.push(twoTempTransactions);
}
transactionsTree.push(hashedTransactions);
level = combinedTransactions;
}
transactionsTree.push(level);
let root = level[0];
console.log("ct", level[0]);
return root;

ct ====a10ce4fc5f6cedefa9d78b9c2307dab09aef816da99ba8f03812d11df2d412dd

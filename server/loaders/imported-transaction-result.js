module.exports = function ImportedTransactionResult(importedTransactions, from, to) {
  this.transactions = importedTransactions;
  this.from = from;
  this.to = to;
};

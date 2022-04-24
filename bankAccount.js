const StatementPrinter = require("./statementPrinter");
const Transaction = require("./transaction");

class BankAccount {
  #transactions;
  constructor() {
    this.#transactions = [];
    this.transactionClass = Transaction;
    this.printer = StatementPrinter;
  }

  balance() {
    return this.#transactions
      .map((transaction) => transaction.amount)
      .reduce(
        (previous, current) => {
          return previous + current;
        },
        0 // Initial value
      );
  }

  deposit(amount) {
    this.#errorHandler("deposit", amount);
    this.#transactions.push(new Transaction(amount));
  }

  withdraw(amount) {
    this.#errorHandler("withdraw", amount);
    this.#transactions.push(new Transaction(amount * -1));
  }

  printStatement() {
    console.log(this.printer.statement(this.#transactions));
  }

  #errorHandler(transactionType, amount) {
    if (amount < 0) {
      throw `You cannot ${transactionType} a negative amount`;
    } else if (typeof amount !== "number") {
      throw `You cannot ${transactionType} a non-numerical amount`;
    }
  }
}

module.exports = BankAccount;

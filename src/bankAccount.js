const StatementPrinter = require("./statementPrinter");
const Transaction = require("./transaction");

class BankAccount {
  #transactions;
  #transactionClass;
  #printer;
  constructor(transaction = Transaction, printer = StatementPrinter) {
    this.#transactions = [];
    this.#transactionClass = transaction;
    this.#printer = printer;
  }

  deposit(amount) {
    this.#errorHandler("deposit", amount);
    this.#transactions.push(new this.#transactionClass(amount));
  }

  withdraw(amount) {
    this.#errorHandler("withdraw", amount);
    this.#transactions.push(new this.#transactionClass(amount * -1));
  }

  printStatement() {
    console.log(this.#printer.statement(this.#transactions));
  }

  #errorHandler(transactionType, amount) {
    if (amount < 0) {
      throw `You cannot ${transactionType} a negative amount`;
    } else if (typeof amount !== "number") {
      throw `You cannot ${transactionType} a non-numerical amount`;
    }
    if (transactionType === "withdraw" && amount > this.#balance()) {
      throw `You cannot ${transactionType} more money than your account currently has`;
    }
  }

  #balance() {
    return this.#transactions
      .map((transaction) => transaction.amount)
      .reduce(
        (previous, current) => {
          return previous + current;
        },
        0 // Initial value
      );
  }
}

module.exports = BankAccount;

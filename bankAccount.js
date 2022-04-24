const StatementPrinter = require("./statementPrinter");

class BankAccount {
  #transactions;
  constructor() {
    this.#transactions = [];
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

  deposit(amount, date = new Date()) {
    this.#errorHandler("deposit", amount);
    this.#transactions.push({
      date: date,
      amount: amount,
    });
  }

  withdraw(amount, date = new Date()) {
    this.#errorHandler("withdraw", amount);
    this.#transactions.push({
      date: date,
      amount: amount * -1,
    });
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

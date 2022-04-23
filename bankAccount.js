const StatementPrinter = require("./statementPrinter");

class BankAccount {
  constructor() {
    this.transactions = [];
    this.printer = StatementPrinter;
  }

  balance() {
    const amounts = this.transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce(
      (previous, current) => {
        return previous + current;
      },
      0 //Initial value
    );
    return total;
  }

  deposit(amount, date = new Date()) {
    this.errorHandler("deposit", amount);
    this.transactions.push({
      date: date,
      amount: amount,
      type: "credit",
    });
  }

  withdraw(amount, date = new Date()) {
    this.errorHandler("withdraw", amount);
    this.transactions.push({
      date: date,
      amount: amount * -1,
      type: "debit",
    });
  }

  printStatement() {
    console.log(this.printer.statement(this.transactions));
  }

  errorHandler(transactionType, amount) {
    if (amount < 0) {
      throw `You cannot ${transactionType} a negative amount`;
    } else if (typeof amount !== "number") {
      let pastTenseTransaction =
        transactionType === "deposit" ? "deposited" : "withdrawn";
      throw `Only numerical values can be ${pastTenseTransaction}`;
    }
  }
}

module.exports = BankAccount;

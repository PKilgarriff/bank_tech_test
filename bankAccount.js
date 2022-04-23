class BankAccount {
  constructor() {
    this.transactions = [];
  }

  balance() {
    if (this.transactions.length === 0) {
      return 0;
    }
    let runningTotal = 0;
    this.transactions.forEach((transaction) => {
      if (transaction.type === "credit") {
        runningTotal += transaction.amount;
      } else {
        runningTotal -= transaction.amount;
      }
    });
    return runningTotal;
  }

  deposit(amount) {
    this.errorHandler("deposit", amount);
    this.transactions.push({
      date: "Today",
      amount: amount,
      type: "credit",
    });
  }

  withdraw(amount) {
    this.errorHandler("withdraw", amount);
    this.transactions.push({
      date: "Today",
      amount: amount,
      type: "debit",
    });
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

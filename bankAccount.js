class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    this.errorHandler("deposit", amount);
    this.transactions.push({
      date: "Today",
      amount: amount,
      type: "credit",
    });
    this.balance += amount;
  }

  withdraw(amount) {
    this.errorHandler("withdraw", amount);
    this.balance -= amount;
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

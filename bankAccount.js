class BankAccount {
  constructor() {
    this.transactions = [];
  }

  balance() {
    const amounts = this.transactions.map((transaction) => {
      return transaction.type === "credit"
        ? transaction.amount
        : -transaction.amount;
    });
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

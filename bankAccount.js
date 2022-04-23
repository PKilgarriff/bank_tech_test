class BankAccount {
  constructor() {
    this.balance = 0;
  }

  deposit(amount) {
    this.errorHandler(amount);
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }

  errorHandler(amount) {
    if (amount < 0) {
      throw "You cannot deposit a negative amount";
    } else if (typeof amount !== "number") {
      throw "Only numerical values can be deposited";
    }
  }
}

module.exports = BankAccount;

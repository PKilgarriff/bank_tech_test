class BankAccount {
  constructor() {
    this.balance = 0;
  }

  deposit(amount) {
    if (amount < 0) {
      throw "You cannot deposit a negative amount";
    } else if (typeof amount !== "number") {
      throw "Only numerical values can be deposited";
    } else {
      this.balance += amount;
    }
  }
}

module.exports = BankAccount;

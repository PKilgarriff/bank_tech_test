class BankAccount {
  constructor() {
    this.balance = 0;
  }

  deposit(amount) {
    if (amount < 0) {
      throw "You cannot deposit a negative amount";
    }
    this.balance += amount;
  }
}

module.exports = BankAccount;

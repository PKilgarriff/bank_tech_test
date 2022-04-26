class Transaction {
  constructor(amount, date = new Date()) {
    this.amount = amount;
    this.date = date;
    Object.freeze(this);
  }
}

module.exports = Transaction;

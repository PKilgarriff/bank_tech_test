class StatementPrinter {
  static headerString = "date || credit || debit || balance";
  static statement(transactions) {
    if (typeof transactions === "undefined" || transactions.length === 0)
      return this.headerString;

    this.#sortByDateAscending(transactions);

    let statementStrings = transactions.map((transaction) => {
      let balance = this.#balanceUpToThisTransaction(
        transactions,
        transaction.date
      );
      return this.#generateTransactionString(transaction, balance);
    });

    statementStrings.reverse().unshift(this.headerString);
    return statementStrings.join("\n");
  }

  static #generateTransactionString(transaction, balance) {
    let amount = `${this.#amountToTwoDecimalPlaces(
      Math.abs(transaction.amount)
    )}`;
    amount = transaction.amount > 0 ? amount + " ||" : "|| " + amount;
    let date = `${this.#dateToDDMMYYYY(transaction.date)}`;
    balance = `${this.#amountToTwoDecimalPlaces(balance)}`;
    return `${date} || ${amount} || ${balance}`;
  }

  static #sortByDateAscending(transactions) {
    transactions.sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  static #dateToDDMMYYYY(date) {
    let day = `${date.getDate()}`.padStart(2, "0");
    let month = `${date.getMonth() + 1}`.padStart(2, "0");
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  static #balanceUpToThisTransaction(transactions, currentTransactionDate) {
    return transactions
      .filter((record) => {
        return record.date <= currentTransactionDate;
      })
      .map((transaction) => transaction.amount)
      .reduce((a, b) => a + b);
  }

  static #amountToTwoDecimalPlaces(amount) {
    const decimalPlaces = 2;
    return Number(
      Math.round(parseFloat(amount + "e" + decimalPlaces)) +
        "e-" +
        decimalPlaces
    ).toFixed(decimalPlaces);
  }
}

module.exports = StatementPrinter;

class StatementPrinter {
  static statement(transactions) {
    const headerString = "date || credit || debit || balance";
    let cumulativeBalance = 0;
    let statementStrings = [];

    if (typeof transactions === "undefined" || transactions.length === 0)
      return headerString;

    this.#sortByDateAscending(transactions);

    transactions.forEach((transaction) => {
      cumulativeBalance += transaction.amount;
      transaction.balance = cumulativeBalance;
      let transactionString = this.#generateTransactionString(transaction);
      statementStrings.push(transactionString);
    });

    statementStrings.reverse();
    statementStrings.unshift(headerString);
    return statementStrings.join("\n");
  }

  static #sortByDateAscending(transactions) {
    transactions.sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  static #dateFormatter(date) {
    return date.toLocaleString().split(",")[0];
  }

  static #currencyFormatter(amount) {
    const decimalPlaces = 2;
    return Number(
      Math.round(parseFloat(amount + "e" + decimalPlaces)) +
        "e-" +
        decimalPlaces
    ).toFixed(decimalPlaces);
  }

  static #generateTransactionString(transaction) {
    let amount = `${this.#currencyFormatter(Math.abs(transaction.amount))}`;
    amount = transaction.amount > 0 ? amount + " ||" : "|| " + amount;
    let date = `${this.#dateFormatter(transaction.date)}`;
    let balance = `${this.#currencyFormatter(transaction.balance)}`;
    return `${date} || ${amount} || ${balance}`;
  }
}

module.exports = StatementPrinter;

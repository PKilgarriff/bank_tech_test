class StatementPrinter {
  static statement(transactions) {
    const headerString = "date || credit || debit || balance";
    if (typeof transactions === "undefined" || transactions.length === 0)
      return headerString;

    let cumulativeBalance = 0;
    let statementStrings = [];
    this.#sortByDateAscending(transactions);

    transactions.forEach((transaction) => {
      cumulativeBalance += transaction.amount;
      transaction.balance = cumulativeBalance;
      statementStrings.push(this.#generateTransactionString(transaction));
    });

    statementStrings.reverse().unshift(headerString);
    return statementStrings.join("\n");
  }

  static #sortByDateAscending(transactions) {
    transactions.sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  static #dateFormatter(date) {
    let day = `${date.getDate()}`.padStart(2, "0");
    let month = `${date.getMonth() + 1}`.padStart(2, "0");
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

class StatementPrinter {
  static statement(transactions) {
    const headerString = "date || credit || debit || balance";
    if (typeof transactions === "undefined" || transactions.length === 0)
      return headerString;

    let cumulativeBalance = 0;
    let statementStrings = [];
    this.#sortByDateAscending(transactions);

    transactions.forEach((transaction) => {
      let localTransaction = {
        date: transaction.date,
        amount: transaction.amount,
      };
      cumulativeBalance += transaction.amount;
      localTransaction.balance = cumulativeBalance;
      statementStrings.push(this.#generateTransactionString(localTransaction));
    });

    statementStrings.reverse().unshift(headerString);
    return statementStrings.join("\n");
  }

  static #generateTransactionString(transaction) {
    let amount = `${this.#amountToTwoDecimalPlaces(
      Math.abs(transaction.amount)
    )}`;
    amount = transaction.amount > 0 ? amount + " ||" : "|| " + amount;
    let date = `${this.#dateToDDMMYYYY(transaction.date)}`;
    let balance = `${this.#amountToTwoDecimalPlaces(transaction.balance)}`;
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

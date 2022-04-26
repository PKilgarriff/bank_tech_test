const helper = require("./statementPrinterHelper");

class StatementPrinter {
  static statement(transactions) {
    const headerString = "date || credit || debit || balance";
    if (typeof transactions === "undefined" || transactions.length === 0)
      return headerString;

    let cumulativeBalance = 0;
    let statementStrings = [];
    helper.sortByDateAscending(transactions);

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
    let amount = `${helper.currencyFormatter(Math.abs(transaction.amount))}`;
    amount = transaction.amount > 0 ? amount + " ||" : "|| " + amount;
    let date = `${helper.dateFormatter(transaction.date)}`;
    let balance = `${helper.currencyFormatter(transaction.balance)}`;
    return `${date} || ${amount} || ${balance}`;
  }
}

module.exports = StatementPrinter;

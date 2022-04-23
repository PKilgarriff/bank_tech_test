class StatementPrinter {
  static statement(transactions) {
    let cumulativeBalance = 0;
    let statementString = "date || credit || debit || balance";
    if (typeof transactions === "undefined" || transactions.length === 0)
      return statementString;
    transactions.forEach((transaction) => {
      cumulativeBalance += transaction.amount;
      let creditDebitColumns;
      if (transaction.type === "credit") {
        creditDebitColumns = `${this.currencyFormatter(transaction.amount)} ||`;
      } else {
        creditDebitColumns = `|| ${this.currencyFormatter(transaction.amount)}`;
      }
      let transactionString = `\n${this.dateFormatter(
        transaction.date
      )} || ${creditDebitColumns} || ${this.currencyFormatter(
        cumulativeBalance
      )}`;
      statementString = statementString.concat(transactionString);
    });
    return statementString;
  }

  static dateFormatter(date) {
    return date.toLocaleString().split(",")[0];
  }

  static currencyFormatter(amount) {
    const decimalPlaces = 2;
    return Number(
      Math.round(parseFloat(amount + "e" + decimalPlaces)) +
        "e-" +
        decimalPlaces
    ).toFixed(decimalPlaces);
  }
}

module.exports = StatementPrinter;

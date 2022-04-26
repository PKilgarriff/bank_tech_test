class StatementPrinterHelper {
  static sortByDateAscending(transactions) {
    transactions.sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  static dateFormatter(date) {
    let day = `${date.getDate()}`.padStart(2, "0");
    let month = `${date.getMonth() + 1}`.padStart(2, "0");
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

module.exports = StatementPrinterHelper;

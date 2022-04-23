const StatementPrinter = require("./statementPrinter");

describe("StatementPrinter", () => {
  test("it prints headers when given no transactions", () => {
    expect(StatementPrinter.statement()).toEqual(
      "date || credit || debit || balance"
    );
  });
  test("correct statement when given an array of one credit transaction", () => {
    let transactions = [
      {
        date: new Date("2022-05-14T00:00:00.000Z"),
        amount: 15,
        type: "credit",
      },
    ];
    expect(StatementPrinter.statement(transactions)).toEqual(
      "date || credit || debit || balance\n14/05/2022 || 15.00 || || 15.00"
    );
  });
  test("correct statement when given an array of one debit transaction", () => {
    let transactions = [
      {
        date: new Date("2022-05-14T00:00:00.000Z"),
        amount: 15,
        type: "debit",
      },
    ];
    expect(StatementPrinter.statement(transactions)).toEqual(
      "date || credit || debit || balance\n14/05/2022 || || 15.00 || 15.00"
    );
  });
});

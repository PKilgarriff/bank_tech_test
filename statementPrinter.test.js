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
        amount: 15 * -1,
      },
    ];
    expect(StatementPrinter.statement(transactions)).toEqual(
      "date || credit || debit || balance\n14/05/2022 || || 15.00 || -15.00"
    );
  });
  test("correct statement when given an array of multiple transactions", () => {
    let transactions = [
      {
        date: new Date("2022-05-14T00:00:00.000Z"),
        amount: 15 * -1,
      },
      {
        date: new Date("2022-05-15T00:00:00.000Z"),
        amount: 15,
      },
    ];
    expect(StatementPrinter.statement(transactions)).toEqual(
      "date || credit || debit || balance\n15/05/2022 || 15.00 || || 0.00\n14/05/2022 || || 15.00 || -15.00"
    );
  });
  test("correct statement when given an array of incorrectly ordered transactions", () => {
    let transactions = [
      {
        date: new Date("2022-05-15T00:00:00.000Z"),
        amount: 15,
      },
      {
        date: new Date("2022-05-14T00:00:00.000Z"),
        amount: 15 * -1,
      },
    ];
    expect(StatementPrinter.statement(transactions)).toEqual(
      "date || credit || debit || balance\n15/05/2022 || 15.00 || || 0.00\n14/05/2022 || || 15.00 || -15.00"
    );
  });
});

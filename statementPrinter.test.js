const StatementPrinter = require("./statementPrinter");

describe("StatementPrinter", () => {
  test("it prints headers when given no transactions", () => {
    expect(StatementPrinter.statement()).toEqual(
      "date || credit || debit || balance"
    );
  });
});

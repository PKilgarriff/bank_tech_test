const Transaction = require("./transaction");

describe("Transaction", () => {
  let transaction;

  beforeAll(() => {
    jest
      .spyOn(global, "Date")
      .mockImplementationOnce(() => new Date("2022-01-17T11:00:00.000Z"));
    transaction = new Transaction(300, new Date());
  });

  test("stores an amount", () => {
    expect(transaction.amount).toEqual(300);
  });
  test("stores a date", () => {
    expect(transaction.date).toStrictEqual(
      new Date("2022-01-17T11:00:00.000Z")
    );
  });
  describe("once constructed, the properties are frozen", () => {
    test("for amount", () => {
      transaction.amount = 500;
      expect(transaction.amount).toEqual(300);
    });
    test("for date", () => {
      transaction.date = new Date();
      expect(transaction.date).toStrictEqual(
        new Date("2022-01-17T11:00:00.000Z")
      );
    });
  });
});
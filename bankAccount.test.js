const BankAccount = require("./bankAccount");

describe("BankAccount", () => {
  test("has an initial balance of zero", () => {
    const account = new BankAccount();
    expect(account.balance).toEqual(0);
  });
});

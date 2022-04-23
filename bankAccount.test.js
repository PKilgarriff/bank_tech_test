const BankAccount = require("./bankAccount");

describe("BankAccount", () => {
  let account;

  beforeEach(() => {
    account = new BankAccount();
  });
  test("has an initial balance of zero", () => {
    expect(account.balance).toEqual(0);
  });
});

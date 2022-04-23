const BankAccount = require("./bankAccount");

describe("BankAccount", () => {
  let account;

  beforeEach(() => {
    account = new BankAccount();
  });
  test("has an initial balance of zero", () => {
    expect(account.balance).toEqual(0);
  });
  test("after depositing 1000, the balance is 1000", () => {
    account.deposit(1000);
    expect(account.balance).toEqual(1000);
  });
});

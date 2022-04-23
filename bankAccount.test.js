const BankAccount = require("./bankAccount");

describe("BankAccount", () => {
  let account;

  beforeEach(() => {
    account = new BankAccount();
  });
  test("has an initial balance of zero", () => {
    expect(account.balance).toEqual(0);
  });
  describe("deposit", () => {
    test("after depositing 1000, the balance is 1000", () => {
      account.deposit(1000);
      expect(account.balance).toEqual(1000);
    });
    test("after depositing 350, the balance is 350", () => {
      account.deposit(350);
      expect(account.balance).toEqual(350);
    });
    test("throws an error if attempting to deposit a negative amount", () => {
      expect(() => {
        account.deposit(-350);
      }).toThrow("You cannot deposit a negative amount");
    });
    test("throws an error if attempting to deposit a non-number", () => {
      expect(() => {
        account.deposit("lots of money");
      }).toThrow("Only numerical values can be deposited");
    });
  });
  describe("withdraw", () => {
    test("after depositing 1000, then withdrawing 500, the balance is 500", () => {
      account.deposit(1000);
      account.withdraw(500);
      expect(account.balance).toEqual(500);
    });
    test("after depositing 750, then withdrawing 600, the balance is 150", () => {
      account.deposit(750);
      account.withdraw(600);
      expect(account.balance).toEqual(150);
    });
    test("throws an error if attempting to withdraw a negative amount", () => {
      expect(() => {
        account.withdraw(-350);
      }).toThrow("You cannot withdraw a negative amount");
    });
    test("throws an error if attempting to withdraw a non-number", () => {
      expect(() => {
        account.withdraw("all the money you have");
      }).toThrow("Only numerical values can be withdrawn");
    });
  });
});

const BankAccount = require("./bankAccount");
const StatementPrinter = require("./statementPrinter");
jest.mock("./statementPrinter");

describe("BankAccount", () => {
  let account;
  beforeEach(() => {
    account = new BankAccount();
  });

  test("has an initial balance of zero", () => {
    expect(account.balance()).toEqual(0);
  });
  test.skip("starts with no transaction history", () => {
    expect(account.transactions).toEqual([]);
  });
  describe("deposit", () => {
    test("after depositing 1000, the balance is 1000", () => {
      account.deposit(1000);
      expect(account.balance()).toEqual(1000);
    });
    test("after depositing 350, the balance is 350", () => {
      account.deposit(350);
      expect(account.balance()).toEqual(350);
    });
    test("throws an error if attempting to deposit a negative amount", () => {
      expect(() => {
        account.deposit(-350);
      }).toThrow("You cannot deposit a negative amount");
    });
    test("throws an error if attempting to deposit a non-number", () => {
      expect(() => {
        account.deposit("lots of money");
      }).toThrow("You cannot deposit a non-numerical amount");
    });
  });
  describe("withdraw", () => {
    test("after depositing 1000, then withdrawing 500, the balance is 500", () => {
      account.deposit(1000);
      account.withdraw(500);
      expect(account.balance()).toEqual(500);
    });
    test("after depositing 750, then withdrawing 600, the balance is 150", () => {
      account.deposit(750);
      account.withdraw(600);
      expect(account.balance()).toEqual(150);
    });
    test("throws an error if attempting to withdraw a negative amount", () => {
      expect(() => {
        account.withdraw(-350);
      }).toThrow("You cannot withdraw a negative amount");
    });
    test("throws an error if attempting to withdraw a non-number", () => {
      expect(() => {
        account.withdraw("all the money you have");
      }).toThrow("You cannot withdraw a non-numerical amount");
    });
  });
  describe("transactions", () => {
    test.skip("after a deposit, there is a record of the transaction stored", () => {
      account.deposit(92, new Date(Date.UTC(2022, 3, 22, 0)));
      expect(account.transactions).toContainEqual({
        date: new Date("2022-04-22T00:00:00.000Z"),
        amount: 92,
      });
    });
    test.skip("after a withdrawal, there is a record of the transaction stored", () => {
      account.withdraw(156, new Date(Date.UTC(2022, 4, 14, 0)));
      expect(account.transactions).toContainEqual({
        date: new Date("2022-05-14T00:00:00.000Z"),
        amount: -156,
      });
    });
  });
  describe.skip("printStatement", () => {
    test("it calls the statement method of StatementPrinter with the current transactions", () => {
      account.deposit(92, new Date(Date.UTC(2022, 3, 22, 0)));
      account.withdraw(15, new Date(Date.UTC(2022, 3, 22, 0)));
      account.printStatement();
      expect(StatementPrinter.statement).toHaveBeenCalledWith(
        account.transactions
      );
    });
  });
});

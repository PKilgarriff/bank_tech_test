const BankAccount = require("../src/bankAccount");
const StatementPrinter = require("../src/statementPrinter");
const Transaction = require("../src/transaction");
jest.mock("../src/statementPrinter");

describe("BankAccount", () => {
  let account;
  beforeEach(() => {
    account = new BankAccount();
    jest.spyOn(Transaction, "constructor").mockImplementation((amount) => {
      return {
        date: "Today",
        amount: amount,
      };
    });
  });

  test("has an initial balance of zero", () => {
    expect(account.balance()).toEqual(0);
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
    test("after depositing 175, then 804, the balance is 979", () => {
      account.deposit(175);
      account.deposit(804);
      expect(account.balance()).toEqual(979);
    });
    test("can handle floats", () => {
      account.deposit(18.65);
      expect(account.balance()).toEqual(18.65);
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
    test("you can go into negative balance while withdrawing", () => {
      account.withdraw(600);
      expect(account.balance()).toEqual(-600);
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
  describe("printStatement", () => {
    test("it calls the statement method of StatementPrinter with the current transactions", () => {
      jest.spyOn(console, "log").mockImplementation(() => {});
      account.deposit(92);
      account.withdraw(15);
      account.printStatement();
      expect(StatementPrinter.statement).toBeCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            amount: 92,
          }),
          expect.objectContaining({
            amount: -15,
          }),
        ])
      );
    });
  });
});

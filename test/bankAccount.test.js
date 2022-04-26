const BankAccount = require("../src/bankAccount");
const StatementPrinter = require("../src/statementPrinter");
const Transaction = require("../src/transaction");
jest.mock("../src/statementPrinter");

describe("BankAccount", () => {
  let account;
  let transactionSpy;
  beforeEach(() => {
    transactionSpy = jest
      .spyOn(Transaction, "constructor")
      .mockImplementation((amount) => {
        return {
          date: "Today",
          amount: amount,
        };
      });
    account = new BankAccount(transactionSpy);
  });

  describe("deposit", () => {
    test("depositing 1000 creates a transaction with 1000", () => {
      account.deposit(1000);
      expect(transactionSpy).toHaveBeenCalledWith(1000);
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
    test("withdrawing 1000 creates a transaction with -1000", () => {
      account.deposit(1000);
      account.withdraw(1000);
      expect(transactionSpy).toBeCalledWith(-1000);
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
    test("throws an error if attempting to withdraw more than the account holds", () => {
      expect(() => {
        account.withdraw(350);
      }).toThrow(
        "You cannot withdraw more money than your account currently has"
      );
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

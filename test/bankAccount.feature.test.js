const BankAccount = require("../src/bankAccount");
const dateMock = require("jest-date-mock");

describe("Feature Test for BankAccount", () => {
  let consoleSpy;
  let client1;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    client1 = new BankAccount();
  });

  afterAll(() => {
    dateMock.clear();
  });

  test("It fulfills the example acceptance criteria", () => {
    dateMock.advanceTo(new Date(2023, 0, 10, 0, 0, 0));
    client1.deposit(1000);
    dateMock.advanceTo(new Date(2023, 0, 13, 0, 0, 0));
    client1.deposit(2000);
    dateMock.advanceTo(new Date(2023, 0, 14, 0, 0, 0));
    client1.withdraw(500);
    client1.printStatement();
    expect(consoleSpy).toHaveBeenLastCalledWith(
      "date || credit || debit || balance\n" +
        "14/01/2023 || || 500.00 || 2500.00\n" +
        "13/01/2023 || 2000.00 || || 3000.00\n" +
        "10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  test("It handles transactions made out of order", () => {
    dateMock.advanceTo(new Date(2023, 0, 5, 0, 0, 0));
    client1.deposit(1800);
    dateMock.advanceTo(new Date(2023, 2, 13, 0, 0, 0));
    client1.withdraw(1600);
    dateMock.advanceTo(new Date(2023, 1, 14, 0, 0, 0));
    client1.deposit(500);
    client1.printStatement();
    expect(consoleSpy).toHaveBeenLastCalledWith(
      "date || credit || debit || balance\n" +
        "13/03/2023 || || 1600.00 || 700.00\n" +
        "14/02/2023 || 500.00 || || 2300.00\n" +
        "05/01/2023 || 1800.00 || || 1800.00"
    );
  });
});

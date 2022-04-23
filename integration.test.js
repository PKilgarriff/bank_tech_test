const BankAccount = require("./bankAccount");

describe("Integration Test for BankAccount", () => {
  let consoleSpy = jest.spyOn(console, "log");

  test("It fulfills the example acceptance criteria", () => {
    const client1 = new BankAccount();
    client1.deposit(1000, new Date(Date.UTC(2023, 0, 10, 0)));
    client1.deposit(2000, new Date(Date.UTC(2023, 0, 13, 0)));
    client1.withdraw(500, new Date(Date.UTC(2023, 0, 14, 0)));
    client1.printStatement();
    expect(consoleSpy).toHaveBeenLastCalledWith(
      "date || credit || debit || balance\n" +
        "14/01/2023 || || 500.00 || 2500.00\n" +
        "13/01/2023 || 2000.00 || || 3000.00\n" +
        "10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  test("It handles transactions made out of order", () => {
    const client1 = new BankAccount();
    client1.deposit(1800, new Date(Date.UTC(2023, 0, 5, 0)));
    client1.withdraw(1600, new Date(Date.UTC(2023, 2, 13, 0)));
    client1.deposit(500, new Date(Date.UTC(2023, 1, 14, 0)));
    client1.printStatement();
    expect(consoleSpy).toHaveBeenLastCalledWith(
      "date || credit || debit || balance\n" +
        "13/03/2023 || || 1600.00 || 700.00\n" +
        "14/02/2023 || 500.00 || || 2300.00\n" +
        "05/01/2023 || 1800.00 || || 1800.00"
    );
  });
});

const BankAccount = require("./bankAccount");

describe("Integration Test for BankAccount", () => {
  test("It fulfills the example acceptance criteria", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const client1 = new BankAccount();
    client1.deposit(1000, new Date(Date.UTC(2023, 0, 10, 0)));
    client1.deposit(2000, new Date(Date.UTC(2023, 0, 13, 0)));
    client1.withdraw(500, new Date(Date.UTC(2023, 0, 14, 0)));
    client1.printStatement();
    expect(consoleSpy).toHaveBeenCalledWith(
      "date || credit || debit || balance\n" +
        "14/01/2023 || || 500.00 || 2500.00\n" +
        "13/01/2023 || 2000.00 || || 3000.00\n" +
        "10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});

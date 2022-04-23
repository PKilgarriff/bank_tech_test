clients interact with program through CLI
simple commands like `deposit`, `withdraw`, `balance`

Each account should be an instance of a class (Bank? BankAccount? Account?)
Instance should store the balance and the dates of transactions

- should transaction be a separate class?
- if so it would have date and amount (positive or negative) or also withdrawal or deposit
- Date library needed

Possible usage:

```
const client1 = new BankAccount();
client1.deposit(1000);
client1.deposit(2000);
client1.withdraw(500);
client1.printStatement();
=>
    date || credit || debit || balance
    14/01/2023 || || 500.00 || 2500.00
    13/01/2023 || 2000.00 || || 3000.00
    10/01/2023 || 1000.00 || || 1000.00
```

printStatement() would be more descriptive than just balance()

- balance will also be a property, but only contain the current balance

Would Statement Printer also be pulled out into its own class as well?

- SRP

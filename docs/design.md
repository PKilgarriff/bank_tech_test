clients interact with program through CLI
simple commands like `deposit`, `withdraw`, `balance`

Each account should be an instance of a class (Bank? BankAccount? Account?)
Instance should store the balance and the dates of transactions

- should transaction be a separate class?
- if so it would have date and amount (positive or negative) or also withdrawal or deposit
- Date library needed
- also could be an array of objects:
  [
  {date: Date.today(), amount: 400, type: debit },
  {date: Date.yesterday(), amount: 800, type: credit },
  ]

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

There is no information given in the brief on whether the client can go into negative balance -> if this wasn't a practice tech test - I would ask the client to confirm their desired handling of this.
Possible solutions:

- account can go into negative balance <-- current operating assumption
- withdrawals that would put balance into negative are blocked
- there is a certain threshold of negative balance (like an overdraft)

If transactions are being added and stored, balance should now be a method that calculates based on them rather than a property

Moving onto Statement Printer class

- needs list of transactions from BankAccount
- needs to return headers
- needs to return a formatted string of each transaction

Saving the transactions as either credit or debit is making things untidy

- change of approach to use positive values as credits and negative values as debits
- should make calculating balance more straightforward

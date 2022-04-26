PASS test/bankAccount.test.js
BankAccount
deposit
✓ depositing 1000 creates a transaction with 1000 (3 ms)
✓ throws an error if attempting to deposit a negative amount
✓ throws an error if attempting to deposit a non-number
withdraw
✓ withdrawing 1000 creates a transaction with -1000
✓ throws an error if attempting to withdraw a negative amount
✓ throws an error if attempting to withdraw a non-number
✓ throws an error if attempting to withdraw more than the account holds (2 ms)
printStatement
✓ it calls the statement method of StatementPrinter with the current transactions (1 ms)

PASS test/statementPrinter.test.js
StatementPrinter
✓ it prints headers when given no transactions (3 ms)
✓ correct statement when given an array of one credit transaction (2 ms)
✓ correct statement when given an array of one debit transaction
✓ correct statement when given an array of multiple transactions (1 ms)
✓ correct statement when given an array of incorrectly ordered transactions (1 ms)

PASS test/bankAccount.feature.test.js
Feature Test for BankAccount
✓ It fulfills the example acceptance criteria (3 ms)
✓ It handles transactions made out of order (1 ms)

PASS test/transaction.test.js
Transaction
✓ stores an amount (1 ms)
✓ stores a date
✓ date can be overridden at construction (1 ms)
once constructed, the properties are frozen
✓ for amount
✓ for date

Test Suites: 4 passed, 4 total
Tests: 20 passed, 20 total
Snapshots: 0 total
Time: 0.832 s, estimated 1 s
Ran all test suites.

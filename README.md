# Tech Test - Bank

[![Node.js CI](https://github.com/PKilgarriff/bank_tech_test/actions/workflows/node.js.yml/badge.svg)](https://github.com/PKilgarriff/bank_tech_test/actions/workflows/node.js.yml)

## Description

The client has requested a Banking application that runs in the command-line via a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop).

The requirements are as follows:

- clients can make a deposit
- clients can make a withdrawal
- clients can print a bank statement
- data can be kept in memory (not stored in a file, or in a database)

A set of acceptance criteria have been provided, and these are demonstrated in one of the feature tests, showing the desired function of the program.

## Technologies

- JavaScript - chosen programming language
- Node.js - JS runtime environment
- Jest - testing both unit and feature tests
- ESLint - linting
- GitHub - version control
- GitHub Actions - Continuous Integration

## Set-up

### Clone Repository

Run the following commands in your terminal.

```zsh
git clone https://github.com/PKilgarriff/bank_tech_test
```

### Install Dependencies

> These steps assume you have Node.js running on your system.

```zsh
cd bank_tech_test
npm install
```

### Run Program

This program is run within node as a REPL.

```
node
.load ./bankAccount.js
const client1 = new BankAccount();
client1.deposit(480);
client1.deposit(935);
client1.withdraw(650);
client1.printStatement();
    date || credit || debit || balance
    23/04/2022 || || 650.00 || 765.00
    23/04/2022 || 935.00 || || 1415.00
    23/04/2022 || 480.00 || || 480.00
```

Explanatory errors will be thrown if either a deposit or a withdrawal is attempted with a negative number, or a non-numerical input.

```
> client1.deposit('a big sack of money');
Uncaught 'You cannot deposit a non-numerical amount'
> client1.withdraw(-100000);
Uncaught 'You cannot withdraw a negative amount'
```

### Test Program

There are npm scripts setup to test and lint the program

```bash
npm run test # Run linter then tests
npm run test:unit # Run tests by themselves
npm run test:coverage # Run tests with Jest's coverage checker
```

If you wish to see the verbose output from Jest, run `jest --verbose`, or you can see the current verbose output [here](#verbose-test-output). The test coverage table is [here](#coverage).

## Approach

### TL;DR

- Wrote a design document
- Test-drove the classes
  - Used Red-Green-Commit-Refactor-Commit loop
- When they were sufficiently functional, required StatementPrinter within BankAccount
- Mocked the dependencies in unit tests
- Wrote feature tests to demonstrate overall function
- Brought in continuous integration late in the process
- Tidied up code for review

### Full Approach

- Created a [design document](./design.md) to make notes on the brief
  - laid out initial plan for overall design
- Used Jest to test-drive the creation of a BankAccount class
- After recent external review, aimed for a Red-Green-Commit-Refactor-Commit loop in the process
- returned to design document and client brief as required to clarify and update thoughts on approach
- Made choice that balances can become negative
  - no specific instructions or demonstration in the acceptance criteria for this case
  - in a real-world test this would have been a point to return to client and clarify
  - laid out possible options in design document, in case this needs to be revisited
- Moved on to StatementPrinter class once the BankAccount class was able to store transactions, and allow withdrawing/depositing
- Decision was made early on in design document that this would be a separate class in order to adhere more closely to Single Responsibility Principle (SRP)
- Continued to use Jest to test-drive implementation of StatementPrinter class
- Once unit tests were passing and covering the responsibilities of the StatementPrinter class, this was integrated into the BankAccount class
  - mocked using Jest mocks in the unit tests
  - not mocked for the feature tests
- this exposed further requirements to meet the criteria
  - statement printed dates from most recent to least recent
  - the calculation of balance needed to be adjusted as a result
- Linting was brought in to catch any syntax errors and bad practices
- Continued refactoring the code to remove unnecessary variables
  - selected variables left in to aid the readability of the code
  - methods extracted to continue with SRP
  - methods that could be made private, made private
    - unsure whether the transactions property of BankAccount should be private
      - pro: stops it being accessed outside
      - con: unavailable to unit testing BankAccount, alternatives could give false positives
- Further feature tests added
  - exposed blind spot in Jest mocking
    - console.log spy was passing subsequent tests due to using .toHaveBeenCalled() instead of .toHaveBeenLAstCalled()
- The existence of Continuous Integration remembered by me at this point
  - config files for Travis and GitHub Actions added
  - Travis CI currently blocked, so focused on GitHub actions
  - CI exposed issue with toLocaleString() used by StatementPrinter
    - flips months and days
    - local tests run with en-gb -> remote tests using en-us
- dateFormatter updated to no longer use toLocaleString()

# Appendix

## Verbose Test Output

```
PASS  ./integration.test.js
  Integration Test for BankAccount
    ✓ It fulfills the example acceptance criteria (23 ms)
    ✓ It handles transactions made out of order (2 ms)

PASS  ./bankAccount.test.js
  BankAccount
    ✓ has an initial balance of zero (2 ms)
    ✓ starts with no transaction history (1 ms)
    deposit
      ✓ after depositing 1000, the balance is 1000
      ✓ after depositing 350, the balance is 350
      ✓ throws an error if attempting to deposit a negative amount (1 ms)
      ✓ throws an error if attempting to deposit a non-number (1 ms)
    withdraw
      ✓ after depositing 1000, then withdrawing 500, the balance is 500 (1 ms)
      ✓ after depositing 750, then withdrawing 600, the balance is 150
      ✓ throws an error if attempting to withdraw a negative amount (1 ms)
      ✓ throws an error if attempting to withdraw a non-number
    transactions
      ✓ after a deposit, there is a record of the transaction stored
      ✓ after a withdrawal, there is a record of the transaction stored (1 ms)
    printStatement
      ✓ it calls the statement method of StatementPrinter with the current transactions (5 ms)

 PASS  ./statementPrinter.test.js
  StatementPrinter
    ✓ it prints headers when given no transactions (1 ms)
    ✓ correct statement when given an array of one credit transaction (1 ms)
    ✓ correct statement when given an array of one debit transaction
    ✓ correct statement when given an array of multiple transactions
    ✓ correct statement when given an array of incorrectly ordered transactions (1 ms)

-------------------
Test Suites: 3 passed, 3 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        0.828 s, estimated 1 s
Ran all test suites.
```

### Coverage

| File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files           | 100     | 100      | 100     | 100     |
| bankAccount.js      | 100     | 100      | 100     | 100     |
| statementPrinter.js | 100     | 100      | 100     | 100     |

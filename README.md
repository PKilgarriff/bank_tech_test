# Tech Test - Bank

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

<!-- Section on cloning repository -->
<!-- Section on setting up program -->
<!-- Section on running program -->
<!-- Section on testing program -->

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
- Further feature tests added
  - exposed blind spot in Jest mocking
    - console.log spy was passing subsequent tests due to using .toHaveBeenCalled() instead of .toHaveBeenLAstCalled()
- The existence of Continuous Integration remembered by me at this point
  - config files for Travis and GitHub Actions added

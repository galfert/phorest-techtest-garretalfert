# Phorest Vouchers

This Ember application is my submission for the Phorest tech test
assignment.

The app allows to search for a client by their email address or phone
number and once found create a voucher for them.

## Installation

* `git clone git@github.com:galfert/phorest-techtest-garretalfert.git`
* `cd phorest-techtest-garretalfert`
* `npm install`
* `cp .env.example .env`
* Edit `.env` and add the environment variables required to access the API backend

## Running / Development

To run the app using the ember-cli-mirage mock backend:

```
ember serve
```

* Visit the app at [http://localhost:4200](http://localhost:4200).
* Visit the tests at [http://localhost:4200/tests](http://localhost:4200/tests).

To have the app make requests to the actual API, run it with

```
ember serve --proxy
```

## Notes

When using the actual API, none of the client's photo URLs would load
for me. The UI just shows broken images. But when using the Mirage mocks
it looks nice, so I kept it in there. The mock images sometimes take
quite some time to load though.

Example phone numbers and email addresses for the Mirage mocks:

* customer1@example.com (single result)
* customer3@example.com (multiple results)
* 555551 (single result)
* 555555 (multiple results)

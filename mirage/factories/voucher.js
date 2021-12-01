import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  voucherId(i) {
    return i + 1;
  },

  clientId: 1,

  creatingBranchId() {
    return `SE-${faker.random.alphaNumeric(14)}`;
  },

  issueDate() {
    return faker.date.past().toISOString();
  },

  expiryDate() {
    return faker.date.future().toISOString();
  },

  originalBalance() {
    return faker.finance.amount(10, 200, 2);
  },

  remainingBalance() {
    return this.originalBalance;
  },

  serialNumber() {
    return faker.datatype.number(1000, 100000).toString();
  },
});

import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  clientId(i) {
    return i + 1;
  },

  firstName() {
    return faker.name.firstName();
  },

  lastName() {
    return faker.name.lastName();
  },

  mobile() {
    return faker.phone.phoneNumber();
  },

  email() {
    return faker.internet.email();
  },

  notes() {
    return faker.lorem.words();
  },

  birthDate() {
    return faker.date
      .between('1950-01-01', '2001-12-31')
      .toISOString()
      .split('T')[0];
  },

  photoUrl() {
    return faker.image.avatar();
  },

  archived() {
    return faker.datatype.boolean();
  },

  banned() {
    return faker.datatype.boolean();
  },

  deleted() {
    return faker.datatype.boolean();
  },
});

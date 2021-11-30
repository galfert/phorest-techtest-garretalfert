import Model, { attr } from '@ember-data/model';
import { isEmpty } from '@ember/utils';

export default class ClientModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') email;
  @attr('string') mobile;
  @attr('boolean') deleted;
  @attr('boolean') banned;
  @attr('string') photoUrl;
  @attr('string') notes;
  @attr('date') birthDate;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get formattedBirthDate() {
    if (isEmpty(this.birthDate)) return '';

    return this.birthDate.toLocaleDateString();
  }
}

import Model, { attr } from '@ember-data/model';

export default class VoucherModel extends Model {
  @attr('string') voucherId;
  @attr('string') clientId;
  @attr('string') creatingBranchId;
  @attr('number') originalBalance;
  @attr('number') remainingBalance;
  @attr('string') serialNumber;
  @attr('date') issueDate;
  @attr('date') expiryDate;
}

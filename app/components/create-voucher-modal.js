import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import config from 'phorest-coupons/config/environment';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class CreateVoucherModalComponent extends Component {
  @service store;

  @tracked amount;

  get submissionDisabled() {
    return isEmpty(this.amount);
  }

  @action
  createVoucher(event) {
    event.preventDefault();

    // TODO make expiryDate configurable
    const currentYear = new Date().getFullYear();

    const voucher = this.store.createRecord('voucher', {
      clientId: this.args.data.client.id,
      creatingBranchId: config.APP.branchId,
      originalBalance: this.amount,
      issueDate: new Date(),
      expiryDate: new Date(`${currentYear + 1}-12-31`), // end of next year
    });

    voucher
      .save()
      .then(() => {
        this.args.close();
        this.args.data.onSuccess(voucher, this.args.data.client);
      })
      .catch((error) => {
        // TODO improve error handling, inform user
        console.error('Could not create voucher', error);
      });
  }
}

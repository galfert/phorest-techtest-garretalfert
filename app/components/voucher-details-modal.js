import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class VoucherDetailsModalComponent extends Component {
  @service router;

  get formattedIssueDate() {
    return this.args.data.voucher.issueDate.toLocaleDateString();
  }

  get formattedExpiryDate() {
    return this.args.data.voucher.expiryDate.toLocaleDateString();
  }

  get balanceProgress() {
    return 100; // TODO calculate actual remaining balance percentage
  }

  get voucherUrl() {
    const voucherId = this.args.data.voucher.voucherId;
    return `${location.origin}${this.router.urlFor(
      'vouchers.show',
      voucherId
    )}`;
  }

  @action
  copyUrl() {
    navigator.clipboard.writeText(this.voucherUrl).then(
      function () {
        console.log('copy that');
      },
      function () {
        console.error('could not copy to clipboard');
      }
    );
  }
}

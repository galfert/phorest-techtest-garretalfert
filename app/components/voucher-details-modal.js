import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class VoucherDetailsModalComponent extends Component {
  @service router;

  get voucher() {
    return this.args.data.voucher;
  }

  get client() {
    return this.args.data.client;
  }

  get formattedIssueDate() {
    return this.voucher.issueDate.toLocaleDateString();
  }

  get formattedExpiryDate() {
    return this.voucher.expiryDate.toLocaleDateString();
  }

  get balanceProgress() {
    const percentage =
      (this.voucher.remainingBalance / this.voucher.originalBalance) * 100;

    return Math.round(percentage);
  }

  get voucherUrl() {
    const voucherId = this.voucher.voucherId;
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

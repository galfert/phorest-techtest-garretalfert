import Component from '@glimmer/component';

export default class VoucherDetailsModalComponent extends Component {
  get formattedIssueDate() {
    return this.args.data.voucher.issueDate.toLocaleDateString();
  }

  get formattedExpiryDate() {
    return this.args.data.voucher.expiryDate.toLocaleDateString();
  }

  get balanceProgress() {
    return 100; // TODO calculate actual remaining balance percentage
  }
}

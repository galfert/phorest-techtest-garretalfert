import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service modals;

  @tracked clients;

  @action
  updateClients(clients) {
    this.clients = clients;
  }

  @action
  showVoucherModal(client) {
    return this.modals.open('create-voucher-modal', {
      client,
      onSuccess: this.showVoucherDetails,
    });
  }

  action;
  showVoucherDetails(voucher) {
    console.log('show voucher details', voucher);
  }
}

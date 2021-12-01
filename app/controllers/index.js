import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked clients;

  @action
  updateClients(clients) {
    this.clients = clients;
  }

  @action
  showVoucherModal(client) {
    console.log('about to create a voucher for', client.fullName);
  }
}

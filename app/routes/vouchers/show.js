import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class VouchersShowRoute extends Route {
  @service store;

  async model(params) {
    const voucher = await this.store.findRecord('voucher', params.id);
    const client = await this.store.findRecord('client', voucher.clientId);

    return { voucher, client };
  }
}

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class ClientSearchComponent extends Component {
  @tracked searchTerm = '';
  @tracked loading = false;
  @tracked loadingFailed = false;

  @service store;

  get submissionDisabled() {
    return isEmpty(this.searchTerm) || this.loading;
  }

  get searchType() {
    if (/@/.test(this.searchTerm)) return 'email';

    return 'phone';
  }

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
    this.loadingFailed = false;
  }

  @action
  async search(event) {
    event.preventDefault();

    this.loading = true;
    this.loadingFailed = false;

    let clients;
    try {
      clients = await this.store.query('client', {
        [this.searchType]: this.searchTerm,
      });
    } catch (error) {
      console.error('error fetching clients', error);
    }

    this.loading = false;

    if (isEmpty(clients)) {
      this.loadingFailed = true;
      return;
    }

    this.searchTerm = '';

    this.args.onSuccess(clients);
  }
}

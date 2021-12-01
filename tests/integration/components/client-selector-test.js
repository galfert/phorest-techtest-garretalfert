import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | client-selector', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it does not show anything without clients', async function (assert) {
    this.set('clients', null);

    await render(hbs`<ClientSelector @clients={{this.clients}} />`);

    assert.dom('table').doesNotExist();
  });

  test('it shows a list of clients', async function (assert) {
    this.server.create('client', { mobile: '555 1337' });
    this.server.create('client', { email: 'foo@example.com' });

    const store = this.owner.lookup('service:store');
    const clients = await store.findAll('client');
    this.set('clients', clients);

    this.set('selectHandler', function () {});

    await render(
      hbs`<ClientSelector @clients={{this.clients}} @onSelect={{this.selectHandler}} />`
    );

    assert.dom('tbody tr').exists({ count: 2 });
  });

  test('it passes the selected client to the onSelect action', async function (assert) {
    assert.expect(1);

    this.server.create('client', { mobile: '555 1337' });
    this.server.create('client', { email: 'foo@example.com' });

    const store = this.owner.lookup('service:store');
    const clients = await store.findAll('client');
    this.set('clients', clients);

    this.set('selectHandler', function (client) {
      assert.equal(client.mobile, '555 1337');
    });

    await render(
      hbs`<ClientSelector @clients={{this.clients}} @onSelect={{this.selectHandler}} />`
    );

    await click('tbody tr:first-child button');
  });
});

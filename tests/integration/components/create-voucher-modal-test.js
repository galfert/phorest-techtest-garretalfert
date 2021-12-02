import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | create-voucher-modal', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it displays the name of the client', async function (assert) {
    this.server.create('client', { firstName: 'Jane', lastName: 'Doe' });

    const store = this.owner.lookup('service:store');
    const client = await store.findRecord('client', 1);

    this.set('data', { client, onSuccess: function () {} });
    this.set('close', function () {});

    await render(
      hbs`<CreateVoucherModal @data={{this.data}} @close={{this.close}} />`
    );

    assert.dom('.card-title').hasText('Voucher for Jane Doe');
  });

  test('it requires to enter an amount', async function (assert) {
    this.server.create('client');

    const store = this.owner.lookup('service:store');
    const client = await store.findRecord('client', 1);

    this.set('data', { client, onSuccess: function () {} });
    this.set('close', function () {});

    await render(
      hbs`<CreateVoucherModal @data={{this.data}} @close={{this.close}} />`
    );

    assert.dom('button[type=submit]').isDisabled();

    await fillIn('#voucher-amount', '100');

    assert.dom('button[type=submit]').isNotDisabled();
  });

  test('it passes the created voucher and client to the given onSuccess action', async function (assert) {
    assert.expect(3);

    this.server.create('client', { firstName: 'Jane', lastName: 'Doe' });

    const store = this.owner.lookup('service:store');
    const client = await store.findRecord('client', 1);

    const createHandler = function (voucher, voucherClient) {
      assert.equal(voucher.originalBalance, 100, 'amount is wrong');
      assert.equal(voucher.clientId, client.id, 'voucher clientId is wrong');
      assert.equal(voucherClient.fullName, 'Jane Doe', 'client is wrong');
    };

    this.set('data', { client, onSuccess: createHandler });
    this.set('close', function () {});

    await render(
      hbs`<CreateVoucherModal @data={{this.data}} @close={{this.close}} />`
    );

    await fillIn('#voucher-amount', '100');
    await click('button[type=submit]');
  });
});

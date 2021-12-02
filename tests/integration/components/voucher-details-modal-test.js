import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | voucher-details-modal', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it shows voucher details', async function (assert) {
    const issueDate = new Date('2021-12-01');
    const expiryDate = new Date('2022-12-31');

    this.server.create('client', { firstName: 'Jane', lastName: 'Doe' });
    this.server.create('voucher', {
      originalBalance: 80,
      remainingBalance: 44.32,
      issueDate,
      expiryDate,
    });

    const store = this.owner.lookup('service:store');
    const client = await store.findRecord('client', 1);
    const voucher = await store.findRecord('voucher', 1);

    this.set('data', { client, voucher });

    await render(hbs`<VoucherDetailsModal @data={{this.data}} />`);

    assert.dom('[data-test-client]').hasText('Jane Doe');
    assert.dom('[data-test-balance]').hasText('44.32 € of 80.00 €');
    assert.dom('[data-test-issue]').hasText(issueDate.toLocaleDateString());
    assert.dom('[data-test-expiry]').hasText(expiryDate.toLocaleDateString());
    assert.dom('[data-test-progress] progress').hasAttribute('value', '55');
  });

  test('it shows a close button and the voucher url when used in a modal', async function (assert) {
    this.server.create('client');
    this.server.create('voucher');

    const store = this.owner.lookup('service:store');
    const client = await store.findRecord('client', 1);
    const voucher = await store.findRecord('voucher', 1);

    this.set('data', { client, voucher });
    this.set('close', function () {});

    await render(
      hbs`<VoucherDetailsModal @data={{this.data}} @close={{this.close}} />`
    );

    assert.dom('[data-test-close]').exists();
    assert.dom('[data-test-url]').exists();
  });

  test('it does not show close button or voucher url when not used in a modal', async function (assert) {
    this.server.create('client');
    this.server.create('voucher');

    const store = this.owner.lookup('service:store');
    const client = await store.findRecord('client', 1);
    const voucher = await store.findRecord('voucher', 1);

    this.set('data', { client, voucher });

    await render(hbs`<VoucherDetailsModal @data={{this.data}} />`);

    assert.dom('[data-test-close]').doesNotExist();
    assert.dom('[data-test-url]').doesNotExist();
  });
});

import { module, test } from 'qunit';
import { click, currentURL, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Acceptance | voucher', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupPromiseModals(hooks);

  hooks.beforeEach(function () {
    this.server.create('client', {
      firstName: 'Siobhan',
      lastName: 'Mc Carthy',
      mobile: '555 555',
    });
  });

  test('Creating a voucher', async function (assert) {
    await visit('/');

    await fillIn('#search', '555 555');
    await click('button[type=submit]');

    assert.dom('[data-test-phone]').hasText('555 555');

    await click('button[data-test-new-voucher]');

    assert.dom('h2.card-title').hasText('Voucher for Siobhan Mc Carthy');

    await fillIn('#voucher-amount', '42');
    await click('button[data-test-create-voucher]');

    assert.dom('[data-test-client]').hasText('Siobhan Mc Carthy');
    assert.dom('[data-test-balance]').hasText('42 of 42');

    await click('button[data-test-close]');

    assert.dom('table[data-test-client-list]').doesNotExist();

    assert.equal(currentURL(), '/');
  });

  test('Voucher lookup', async function (assert) {
    this.server.create('voucher', {
      clientId: '1',
      originalBalance: '55',
      remainingBalance: '12',
    });

    await visit('/vouchers/1');

    assert.dom('[data-test-client]').hasText('Siobhan Mc Carthy');
    assert.dom('[data-test-balance]').hasText('12 of 55');
    assert.dom('button[data-test-close]').doesNotExist();
  });

  test('Lookup non-existing voucher', async function (assert) {
    await visit('/vouchers/23420815');

    assert
      .dom('.alert-error label')
      .hasText('Could not load the voucher data.');

    await click('[data-test-backlink] a');

    assert.equal(currentURL(), '/');
  });
});

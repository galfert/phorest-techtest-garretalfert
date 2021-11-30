import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | client-search', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it disables the search when the field is empty', async function (assert) {
    await render(hbs`<ClientSearch />`);

    assert.dom('button[type=submit]').isDisabled();

    await fillIn('#search', 'foo@example.com');

    assert.dom('button[type=submit]').isNotDisabled();
  });

  test('it searches for a phone number by default', async function (assert) {
    assert.expect(2);

    this.server.create('client', { mobile: '555 1337' });
    this.server.create('client', { email: 'foo@example.com' });

    this.set('handleSearchResults', function (clients) {
      assert.equal(clients.length, 1);
      assert.equal(clients.firstObject.mobile, '555 1337');
    });

    await render(hbs`<ClientSearch @onSuccess={{this.handleSearchResults}} />`);

    await fillIn('#search', '555 1337');
    await click('button[type=submit]');
  });

  test('it searches for email when it detects an email address', async function (assert) {
    assert.expect(2);

    this.server.create('client', { mobile: '555 1337' });
    this.server.create('client', { email: 'foo@example.com' });

    this.set('handleSearchResults', function (clients) {
      assert.equal(clients.length, 1);
      assert.equal(clients.firstObject.email, 'foo@example.com');
    });

    await render(hbs`<ClientSearch @onSuccess={{this.handleSearchResults}} />`);

    await fillIn('#search', 'foo@example.com');
    await click('button[type=submit]');
  });

  test('it shows a notice when no client was found', async function (assert) {
    assert.expect(2);

    this.set('handleSearchResults', function () {
      assert.ok(false, 'search result handler should not have been called');
    });

    await render(hbs`<ClientSearch @onSuccess={{this.handleSearchResults}} />`);

    await fillIn('#search', 'does not exist');
    await click('button[type=submit]');

    assert.dom('#search').hasClass('input-error');
    assert.dom('.label-text-alt').hasText('Could not find any client');
  });

  test('it clears the error notice when changing the search term', async function (assert) {
    await render(hbs`<ClientSearch />`);

    await fillIn('#search', 'does not exist');
    await click('button[type=submit]');

    assert.dom('.label-text-alt').hasText('Could not find any client');

    await fillIn('#search', 'new search');

    assert.dom('#search').doesNotHaveClass('input-error');
    assert.dom('.label-text-alt').doesNotExist();
  });

  test('it clears the input field after a successful search', async function (assert) {
    this.server.create('client', { mobile: '555 1337' });

    this.set('handleSearchResults', function () {});

    await render(hbs`<ClientSearch @onSuccess={{this.handleSearchResults}} />`);

    await fillIn('#search', '555 1337');
    await click('button[type=submit]');

    assert.dom('#search').hasValue('');
  });
});

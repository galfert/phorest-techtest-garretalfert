import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | currency', function (hooks) {
  setupRenderingTest(hooks);

  test('it shows two decimals and a Euro symbol', async function (assert) {
    this.set('inputValue', 1234);

    await render(hbs`{{currency this.inputValue}}`);

    assert.dom(this.element).hasText('1234.00 €');
  });

  test('it shows 0.00 when no amount is given', async function (assert) {
    await render(hbs`{{currency this.inputValue}}`);

    assert.dom(this.element).hasText('0.00 €');
  });
});

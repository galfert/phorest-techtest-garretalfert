import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

function currency([amount]) {
  let formattedAmount;

  if (isEmpty(amount)) {
    formattedAmount = '0.00';
  } else {
    formattedAmount = parseFloat(amount).toFixed(2);
  }
  return `${formattedAmount} €`;
}

export default helper(currency);

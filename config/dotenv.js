/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function (/* env */) {
  return {
    clientAllowedKeys: [
      'API_HOST',
      'BASIC_AUTH_USERNAME',
      'BASIC_AUTH_PASSWORD',
      'BUSINESS_ID',
      'BRANCH_ID',
    ],
    fastbootAllowedKeys: [],
    failOnMissingKey: true,
    path: path.join(path.dirname(__dirname), '.env'),
  };
};

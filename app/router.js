import EmberRouter from '@ember/routing/router';
import config from 'phorest-coupons/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('vouchers', function () {
    this.route('show', { path: '/:id' });
  });
});

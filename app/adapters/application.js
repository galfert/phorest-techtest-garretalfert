import RESTAdapter from '@ember-data/adapter/rest';
import config from 'phorest-coupons/config/environment';

const authString = `${config.APP.basicAuthUsername}:${config.APP.basicAuthPassword}`;

export default class ApplicationAdapter extends RESTAdapter {
  host = config.APP.apiHost;
  namespace = config.APP.businessId;

  headers = {
    Authorization: `Basic ${btoa(authString)}`,
  };

  pathForType(type) {
    return type;
  }
}

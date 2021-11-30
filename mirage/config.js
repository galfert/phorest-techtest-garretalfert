import config from 'phorest-coupons/config/environment';

export default function () {
  this.urlPrefix = config.APP.apiHost;
  this.namespace = config.APP.businessId;

  this.get('/client', (schema, request) => {
    if (request.queryParams) {
      if (request.queryParams.phone) {
        return schema.clients.where({ mobile: request.queryParams.phone });
      } else {
        return schema.clients.where(request.queryParams);
      }
    }

    return schema.clients.all();
  });

  this.get('/client/:id', (schema, request) => {
    const id = request.params.id;

    return schema.clients.find(id);
  });
}

import config from 'phorest-vouchers/config/environment';
import faker from 'faker';

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

  this.get('/voucher/:id', (schema, request) => {
    const id = request.params.id;

    return schema.vouchers.find(id);
  });

  this.post('/voucher', async (schema, request) => {
    const vouchers = await schema.vouchers.all();
    const voucher = schema.vouchers.new(JSON.parse(request.requestBody));
    voucher.remainingBalance = voucher.originalBalance;
    voucher.serialNumber = faker.datatype.number(1000, 100000).toString();
    voucher.voucherId = vouchers.length + 1;

    return voucher.save();
  });
}

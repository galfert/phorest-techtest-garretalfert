import RESTSerializer from '@ember-data/serializer/rest';
import { assign } from '@ember/polyfills';

export default class ApplicationSerializer extends RESTSerializer {
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    return super.normalizeArrayResponse(
      store,
      primaryModelClass,
      payload['_embedded'] || { [primaryModelClass.modelName]: [] },
      id,
      requestType
    );
  }

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    return super.normalizeSingleResponse(
      store,
      primaryModelClass,
      { [primaryModelClass.modelName]: payload },
      id,
      requestType
    );
  }

  serializeIntoHash(data, type, record, options) {
    assign(data, this.serialize(record, options));
  }
}

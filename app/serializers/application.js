import RESTSerializer from '@ember-data/serializer/rest';

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
}

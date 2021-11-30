import { RestSerializer } from 'ember-cli-mirage';
import { pluralize } from 'ember-inflector';

export default RestSerializer.extend({
  root: false,
  embed: true,

  serialize(object) {
    const json = RestSerializer.prototype.serialize.apply(this, arguments);

    if (object.attrs) return json; // single object response

    // collection response
    const serialized = {
      _embedded: {
        [pluralize(object.modelName)]: json,
      },
      page: {
        number: 0,
        size: 1,
        totalElements: 1,
        totalPages: 1,
      },
    };

    return serialized;
  },
});

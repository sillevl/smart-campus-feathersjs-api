
import validateMeasurementRequest from '../../hooks/validate-measurement-request';
export default {
  before: {
    all: [],
    find: [],
    get: [validateMeasurementRequest()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

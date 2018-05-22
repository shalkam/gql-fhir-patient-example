import model from './model';

export default {
  PatientMutation: {
    delete(...args) {
      return model.delete(...args);
    },
    create(...args) {
      return model.create(...args);
    },
    update(...args) {
      return model.update(...args);
    },
  },
  PatientQuery: {
    connection(...args) {
      return model.find(...args);
    },
    list(...args) {
      return model.find(...args);
    },
    read(...args) {
      return model.findOne(...args);
    },
  },
};

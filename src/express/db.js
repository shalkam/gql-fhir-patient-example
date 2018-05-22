import mongoose from 'mongoose';
import config from '../../config.js';
export default () => {
  mongoose.connect(config.DB_URL + '/' + config.DB_NAME);
  mongoose.Promise = Promise;
  return mongoose;
};

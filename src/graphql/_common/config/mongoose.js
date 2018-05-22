import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  key: {},
  value: {}
});
export default mongoose.model('config', schema);

import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

var user = new mongoose.Schema({
  _id: String,
  email: String
});
user.plugin(
  passportLocalMongoose,
  {
    // selectFields: '+_id +username +email'
  }
);
export default mongoose.model('user', user);

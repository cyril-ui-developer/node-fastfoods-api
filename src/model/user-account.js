import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

let userAccount = new Schema({
  email: String,
  password:String,
  firstName:String,
  lastName:String
});

userAccount.plugin(passportLocalMongoose);
module.exports = mongoose.model('UserAccount', userAccount);

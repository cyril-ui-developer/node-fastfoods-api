import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let FastFoodSchema = new Schema({
  name: String
});

module.exports = mongoose.model('FastFood', FastFoodSchema);

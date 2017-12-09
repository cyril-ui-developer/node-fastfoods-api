import mongoose from 'mongoose';
import FoodFast from './fastfood';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: { 
      type:String,
      required:true
  },
  content: String,
  foodfast: {type: Schema.Types.ObjectId, ref: 'FoodFast'}
});

module.exports = mongoose.model('Review', ReviewSchema);

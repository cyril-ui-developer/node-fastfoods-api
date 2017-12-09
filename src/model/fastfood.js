import mongoose from 'mongoose';
import Review from './review';
let Schema = mongoose.Schema;

let FastFoodSchema = new Schema({
  foodName: {
    type:String,
    required:true
  },
  foodType: {
    type:String,
    required:true
  },
  foodCost:{
    type:Number,
    required:true
  },
  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model('FastFood', FastFoodSchema);

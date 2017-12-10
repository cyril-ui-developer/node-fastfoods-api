import mongoose from 'mongoose';
import { Router } from 'express';
import FastFood from '../model/fastfood';
import bodyParser from 'body-parser';
import Review from '../model/review';
import { authenticate } from '../middleware/auth';

export default({ config, db }) => {
  let api = Router();
    // endpoint to save fastfood - '/api/fastfoods/'
  api.post('/', (req, res) => {
    let fastFood = new FastFood();
    fastFood.foodName = req.body.foodName;
    fastFood.foodType = req.body.foodType;
    fastFood.foodCost = req.body.foodCost;
    fastFood.geometry.coordinates = req.body.geometry.coordinates;

    fastFood.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Record saved successfully' });
    });
  });
  
  // endpoint to get fastfoods - '/api/fastfoods/'
  // to test using postman when authentication is enabled, set the header - 'Authorisation: Bearer token'
  api.get('/', authenticate,(req, res) => {
    FastFood.find({}, (err, fastfoods) => {
      if (err) {
        res.send(err);
      }
      res.json(fastfoods);
    });
  });
  
  // endpoint to get one fastfood - '/api/fastfoods/:id'
  api.get('/:id', (req, res) => {
      FastFood.findById(req.params.id, (err, fastfood) => {
        if (err) {
          res.send(err);
        }
        res.json(fastfood);
      });
    });

  // endpoint to update fastfood - '/api/fastfoods/:id'
  api.put('/:id', (req, res) => {
    FastFood.findById(req.params.id, (err, fastFood) => {
      if (err) {
        res.send(err);
      }

      fastFood.foodName = req.body.foodName;
      fastFood.foodType = req.body.foodType;
      fastFood.foodCost = req.body.foodCost;
      fastFood.geometry.coordinates = req.body.geometry.coordinates;

      fastFood.save(err =>{
        if(err){
          res.send(err)
        }
        res.json({message:"Record was updated successfully"})
      })
    });
  });

   // endpoint to delete fastfood - '/api/fastfoods/:id'
   api.delete('/:id', (req, res) => {
    FastFood.remove({
      _id: req.params.id
    }, (err) => {
      if (err) {
        res.send(err);
      }
      Review.remove({
        foodfast: req.params.id
      }, (err) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Deleted Food Fast and Reviews Successfully"});
      });
    });
  });

  // endpoint to add review to fastfood by id - '/api/fastfoods/review/:id'
  api.post('/reviews/:id', (req, res) => {
    FastFood.findById(req.params.id, (err, foodfast) => {
      if (err) {
        res.send(err);
      }
      let review = new Review();

      review.title = req.body.title;
      review.content = req.body.content;
      review.foodfast = foodfast._id;
      review.save((err) => {
        if (err) {
          res.send(err);
        }
        foodfast.reviews.push(review);
        foodfast.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Food Fast review saved' });
        });
      });
    });
  });

   // endpoint to get review by fastfood id - '/api/fastfoods/review/:id'
  api.get('/reviews/:id', (req, res) => {
    Review.find({foodfast: req.params.id}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });
  return api;
}

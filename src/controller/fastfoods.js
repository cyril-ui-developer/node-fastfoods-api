import mongoose from 'mongoose';
import { Router } from 'express';
import FastFood from '../model/fastfoods';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  // endpoint to save fastfood - '/api/fastfoods/'
  api.post('/', (req, res) => {
    let fastFood = new FastFood();
    fastFood.name = req.body.name;

    fastFood.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'FastFood saved successfully' });
    });
  });
  
  // endpoint to get fastfoods - '/api/fastfoods/'
  api.get('/', (req, res) => {
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
    FastFood.findById(req.params.id, (err, fastfood) => {
      if (err) {
        res.send(err);
      }
      fastfood.name = req.body.name;
      fastfood.save(err =>{
        if(err){
          res.send(err)
        }
        res.json("Record was updated successfully")
      })
    });
  });
  return api;
}

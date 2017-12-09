import mongoose from 'mongoose';
import { Router } from 'express';
import FastFood from '../model/fastfoods';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  // '/v1/fastfoods/add'
  api.post('/add', (req, res) => {
    let fastFood = new FastFood();
    fastFood.name = req.body.name;

    fastFood.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'FastFood saved successfully' });
    });
  });
  return api;
}

import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import fastfoods from '../controller/fastfoods';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));
  
    // api routes for fastfoods
    router.use('/fastfoods', fastfoods({ config, db }));
});

export default router;

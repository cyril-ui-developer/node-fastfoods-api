import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import fastfoods from '../controller/fastfoods';
import UserAccount from '../controller/user-account';

let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));
  
    // api routes
    router.use('/fastfoods', fastfoods({ config, db }));
    router.use('/useraccount', UserAccount({ config, db }));
});

export default router;

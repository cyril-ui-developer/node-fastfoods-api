import  mongoose from 'mongoose';
import { Router } from 'express';
import userAccount from '../model/user-account';
import passport from 'passport';
import {generateAccessToken, response, authenticate} from '../middleware/auth';

export default () => {
  let api = Router();

  // endpoint to get user account - 'useraccount'
  //   api.get('/', (req, res) => {
  //     res.status(200).send({ user: req.user });
  //   });

  // endpoint to register user - 'useraccount/register'
  api.post('/register', (req, res) => {
    userAccount.register(new userAccount({ username: req.body.email, firstName: req.body.firstName,lastName: req.body.lastName}), req.body.password, function(err) {
      if (err) {
        return res.status(500).send('An error occurred: ' + err);
      }

      passport.authenticate(
        'local', {
          session: false
      })(req, res, () => {
        res.status(200).send('Successfully created new account');
      });
    });
  });

  // endpoint to login 'useraccount/login'
  api.post('/login', passport.authenticate(
    'local', {
      session: false,
      scope: []
    }), generateAccessToken, response);

  // endpoint to logout 'useraccount/logout'
  api.get('/logout', authenticate, (req, res) => {
    req.logout();
    res.status(200).send('Successfully logged out');
  });
  
  // endpoint to get user profile 'useraccount'
  api.get('/profile', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });
    
  return api;
}
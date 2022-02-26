import express from 'express'
require('express-async-errors');
import {json} from 'body-parser'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import {currentUserRouter} from './routes/current-user'
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import {errorHandler} from './middleware/error-handler'
import {NotFoundError} from './errors/not-found-error'

const app = express();
// traffic is being proximate to our app through ingress-nginx, so this is to make Express trust proxy
app.set('trust proxy', true)
app.use(json());
app.use(
  cookieSession({
    // to disable encryption on this cookie
    signed: false,
    // to require that cookie will only be used if a user is visiting our app over an HTTP connection
    secure: true
  })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// put this before errorHandler
app.all('*', async(req, res) => { // "all" includes all methods (get, post....)
  throw new NotFoundError() ;
});

app.use(errorHandler);

const start = async() => {
  if (!process.env.JWT_KEY) { // we putting the check here is to know the error immediately when we start to deploy code
    throw new Error('JWT_KEY must be defined!')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to MongoDb')
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, ()=> {
    console.log('Listenning to port 3000!!')
  })
}

start();




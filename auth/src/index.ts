import mongoose from 'mongoose';

import {app} from './app';

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




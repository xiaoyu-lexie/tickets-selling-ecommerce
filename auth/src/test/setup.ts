import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;

// to hook up MongoMemoryServer
beforeAll(async () => {
  process.env.JWT_KEY = 'whatever string';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

// everytime we run test, we clean up old data
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// after all tests, we want to close the connection
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
})
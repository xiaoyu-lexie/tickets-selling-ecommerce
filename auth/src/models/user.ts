import mongoose from 'mongoose';
import {Password} from '../services/password';

// An interface that describes the properties that are required to create a new User - what takes to create a user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has - what the extire collection of users looks like, or at least methods associated with the user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}


//An interface that describes the properties that a User Document has - what properties a single user has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;


    }
  }
});

//async function is executed when we want to save a document to database
userSchema.pre('save', async function (done){ //use 'function" instead of arrow function here, to deal with key word 'this'
  //even if we create a new user, the password modified still return true
  if (this.isModified('password')) { //'this' is the actual user that we are trying to process to the database;if use arrow function, 'this' will be the context of entire file
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed)
  }
  done();
})

//Add build method to User Model, and User Model is from useSchema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User}

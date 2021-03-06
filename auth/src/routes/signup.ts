import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { validateRequest } from '../middleware/validate-request';
import {User} from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();
// app.use(json());

router.post(
  '/api/users/signup',
  [
  body('email') // in incoming requesr, looking for the email property
    .isEmail()
    .withMessage('Email must be valid'), // append an error message if there is something wrong with email property
  body('password')
    .trim() // to make sure there are no leading or trailing spaces on the password
    .isLength({ min:4, max:20})
    .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response)=>{

    const {email, password} = req.body;

    const existingUser = await User.findOne({ email});

    if (existingUser) {
      throw new BadRequestError('Error in use')
    }

    const user = User.build({ email, password});
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY!
    )

    //Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);

  })

export { router as signupRouter}
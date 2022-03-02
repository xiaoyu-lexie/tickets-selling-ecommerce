import express, {Request, Response} from 'express';
import {body} from 'express-validator';

import {User} from '../models/user';
import { validateRequest } from '../middleware/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();
// app.use(json());

router.post('/api/users/signin',
[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],
validateRequest,
async (req: Request, res: Response)=>{
  const {email, password} = req.body;

  const existingUser = await User.findOne({email});
  if (!existingUser) {
    throw new BadRequestError('Invalid Email or password')
  }
});

export { router as signinRouter}
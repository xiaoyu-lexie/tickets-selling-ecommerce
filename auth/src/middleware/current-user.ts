import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KWY!) as UserPayload
    req.currentUser = payload;
  } catch (err) {
  }

  // means whether or not we decode that token successfully, we always want to continue on to the next middleware
  next();
}
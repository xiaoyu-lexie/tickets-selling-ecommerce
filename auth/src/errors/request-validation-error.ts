import {ValidationError} from 'express-validator'; //ValidationError is an error type
import {CustomError} from './custom-error'

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    //This ONLY has to be done when we are writing TypeScript and trying to extend a built in class (Error)
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return {message: err.msg, field: err.param}
    });
  }
}
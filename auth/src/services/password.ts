import {scrypt, randomBytes} from 'crypto'; // scrypt is the hashing funciton we will use, but downside to it is it's callback based
import {promisify} from 'util'; // that's why we import promisify here

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string){
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
import * as crypto from 'crypto';

export class Authentication {
  static generateSalt(): string {
    return crypto.randomBytes(49).toString('hex');
  }

  static generatePasswordHash(value: string, salt: string): string {
    return crypto.createHmac('sha256', salt).update(value).digest('hex');
  }

  static comparePassword(
    plainPassword: string,
    hash: string,
    salt: string,
  ): boolean {
    const newHash = this.generatePasswordHash(plainPassword, salt);
    return newHash === hash ? true : false;
  }
}

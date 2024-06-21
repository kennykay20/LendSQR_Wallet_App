import { injectable } from "tsyringe";

import jwt from "jsonwebtoken";
import { config } from "config";
import { Request, Response } from "express";
import { UserService } from "../users/user.service";
import { Authentication } from "../utils/auth";

@injectable()
export class AuthService {
  private userSvc: UserService;
  constructor (userService: UserService) {
    this.userSvc = userService;
  }

  userLogin = async (req: Request, res: Response) => {
    try {
      let token = null;
      let flag: boolean = false;
      const { email, password } = req.body;
      const isUser = await this.userSvc.getUserByEmail(email);
      if (!isUser) {
        return res.status(400).send('User not found');
      }
      if (password) {
        const salt = isUser.password.split('.')[0];
        const hashPassword = isUser.password.split('.')[1];
        flag = Authentication.comparePassword(password, hashPassword, salt);
      }
      if (!flag) {
        return res.status(400).send('Invalid Password');
      }

      if (!isUser.is_deleted && isUser.is_active) {
        token = await this.generateAuthToken(email, isUser.id);
      } else {
        return res.status(400).send(
          'Please activate your account'
        );
      }
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  generateToken = (): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  generateAuthToken = async (
    email: string,
    userId: string,
  ): Promise<{ access_token: string }> => {
    const payloadToken = { email, userId };
    const secretToken = config.secret;
    return {
      access_token: jwt.sign(payloadToken, secretToken, {
        algorithm: "HS256",
        noTimestamp: true
      }),
    };
  };

  generateOtp() {
    return Math.floor(Math.random() * (999999 - 111111) + 111111).toString();
  }

  verifyToken = async (token: string, secret: string) => {
    return jwt.verify(token, secret);
  };
}
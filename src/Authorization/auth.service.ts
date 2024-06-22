import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { UserService } from "../users/user.service";
import { Authentication } from "../utils/auth";
import { generateAuthToken } from "../utils";

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
        const salt = isUser.password_hash.split('.')[0];
        const hashPassword = isUser.password_hash.split('.')[1];
        flag = Authentication.comparePassword(password, hashPassword, salt);
      }
      if (!flag) {
        return res.status(400).send('Invalid Password');
      }

      if (!isUser.is_deleted && isUser.is_active) {
        token = await generateAuthToken(email, isUser.id);
      } else {
        return res.status(400).send(
          'Please activate your account'
        );
      }
      console.log('token ', token);
      return res.status(200).json(token);
    } catch (error) {
      console.log(error);
    }
  };
}
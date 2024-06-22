import { autoInjectable } from "tsyringe";
import { UserService } from "../users/user.service";
import { AuthService } from "../Authorization/auth.service";
import express, { NextFunction } from "express";
import { config } from "../config";
import { error, verifyToken } from "../utils";

@autoInjectable()
export class AuthenticationMiddleware {
  private userSvc: UserService;
  private authSvc: AuthService;
  constructor(userService: UserService, authService: AuthService) {
    this.userSvc = userService;
    this.authSvc = authService;
  }

  isOwnerUser = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const secret = config.secret;
    let token = '';
    const headers = req.headers;
    if (headers['authorization'] === undefined) {
      return error(
        res,
        401,
        'no authorization header',
        'authorization header is required for this route',
      );
    }

    token = headers['authorization'].split(' ')[1];
    if (token === undefined) {
      return error(
        res,
        401,
        'no authorization token',
        'authorization token is required, token for this route in the format: <Bearer token>',
      );
    }

    try {
      const decoded = await verifyToken(token, secret);
      let userId = decoded !== null ? decoded?.userId : null;
      if(!userId) {
        return res.status(400).send(`Token expired or user not found`);
      }
      let user = await this.userSvc.getUser(userId);
      user = typeof user === 'string' ? JSON.parse(user) : user;

      if (user && user.is_active === false) {
        return res.status(400).send('Please activate your account');
      }

      req.headers['user'] = JSON.stringify({
        id: user?.id,
        email: user?.email,
      });
    } catch (err: any) {
      console.log(err);
      if (req.originalUrl === '/api/v1/auth/login') {
        if (req.headers && req.headers.authorization)
          delete req.headers.authorization;
        return res.redirect(302, '/api/v1/auth/login');
      }
      return error(res, 401, err?.name, err?.message);
    }
    next();
  }
}
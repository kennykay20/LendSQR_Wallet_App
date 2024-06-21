import { autoInjectable } from "tsyringe";
import express from "express";
import { AuthService } from "./auth.service";

@autoInjectable()
export class AuthController {
  private authSvc: AuthService;
  constructor(authService: AuthService) {
    this.authSvc = authService;
  }

  UserLogin = async (req: express.Request, res: express.Response) => {
    return this.authSvc.userLogin(req, res);
  };

  AuthenticateUser = async (req: express.Request, res: express.Response) => {

  };
}
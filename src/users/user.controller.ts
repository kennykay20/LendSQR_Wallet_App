import { autoInjectable } from "tsyringe";
import express from "express";
import { UserService } from "./user.service";

@autoInjectable()
export class UserController {
  private userSvc: UserService;
  constructor (userService: UserService) {
    this.userSvc = userService;
  }

  CreateUser = async (req: express.Request, res: express.Response) => {
    return await this.userSvc.createUser(req, res);
  };

  GetAllUsers = async (req: express.Request, res: express.Response) => {
    return await this.userSvc.getAllUsers(req, res);
  };

  GetUser = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    return await this.userSvc.getUserById(id, res);
  };

  UpdateUser = async (req: express.Request, res: express.Response) => {
    return await this.userSvc.updateUser(req, res);
  };

  UpdateUserActive = async (req: express.Request, res: express.Response) => {
    return await this.userSvc.updateUserByActive(req, res);
  };

  DeleteUser = async (req: express.Request, res: express.Response) => {
    return await this.userSvc.deleteUser(req, res);
  };
}
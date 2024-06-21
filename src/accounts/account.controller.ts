import { autoInjectable } from "tsyringe";
import express from "express";
import { AccountService } from "./account.service";

@autoInjectable()
export class AccountController {
  private acctSvc: AccountService;
  constructor(acctService: AccountService) {
    this.acctSvc = acctService;
  }

  CreateAccount = async (req: express.Request, res: express.Response) => {
    return this.acctSvc.createAccount(req, res);
  };

  FundAccount = async (req: express.Request, res: express.Response) => {
    return this.acctSvc.fundAccount(req, res);
  };

  TransferFunds = async (req: express.Request, res: express.Response) => {
    return this.acctSvc.transferFunds(req, res);
  };

  WithdrawFunds = async (req: express.Request, res: express.Response) => {
    return this.acctSvc.withdrawFunds(req, res);
  };

  AccountBalance = async (req: express.Request, res: express.Response) => {
    return this.acctSvc.accountBalance(req, res);
  }

}
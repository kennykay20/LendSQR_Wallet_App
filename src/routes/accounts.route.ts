import express from "express";
import { container } from "tsyringe";
import { AccountController } from "../Accounts/account.controller";
import { AuthenticationMiddleware } from "../middlewares/auth.middleware";

const acctCtl = container.resolve(AccountController);
const authCheck = container.resolve(AuthenticationMiddleware);

export default (router: express.Router) => {
  console.log("inside the account route");
  router.post("/api/v1/accounts/create", authCheck.isOwnerUser, acctCtl.CreateAccount);
  router.post("/api/v1/accounts/fund", authCheck.isOwnerUser, acctCtl.FundAccount);
  router.post("/api/v1/accounts/transfer", authCheck.isOwnerUser, acctCtl.TransferFunds);
  router.post("/api/v1/accounts/withdraw", authCheck.isOwnerUser, acctCtl.WithdrawFunds);
  router.get("/api/v1/accounts/balance/:account_id", authCheck.isOwnerUser, acctCtl.AccountBalance);
  return router;
};

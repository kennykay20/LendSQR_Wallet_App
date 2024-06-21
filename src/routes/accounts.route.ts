import express from "express";
import { container } from "tsyringe";
import { AccountController } from "../accounts/account.controller";

const acctCtl = container.resolve(AccountController);
export default (router: express.Router) => {
  console.log("inside the user route");
  router.post("/api/v1/accounts/create", acctCtl.CreateAccount);
  router.post("/api/v1/accounts/fund", acctCtl.FundAccount);
  router.post("/api/v1/accounts/transfer", acctCtl.TransferFunds);
  router.post("/api/v1/accounts/withdraw", acctCtl.WithdrawFunds);
  router.get("/api/v1/accounts/checkbalance", acctCtl.AccountBalance);
  return router;
};
